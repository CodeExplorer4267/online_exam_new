import pool from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/db.js'; 
import e from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
//to create exam
export const createExam = async (req, res) => {
    try {
        const { Name, duration, total_Marks, questions } = req.body;

        if (!Name || !duration || !total_Marks || !Array.isArray(questions) || questions.length === 0) {
            return res.status(400).json({ success: false, message: "All fields are required, including questions" });
        }

        // Insert exam and get the generated ID
        const examQuery = "INSERT INTO exams (name, duration, total_marks) VALUES (?, ?, ?)";
        const [examResult] = await pool.query(examQuery, [Name, duration, total_Marks]);
        const examId = examResult.insertId; // ✅ Get exam ID

        // Insert questions linked to this examId
        const questionQuery = "INSERT INTO questions (exam_id, question_text, answer, marks) VALUES ?";
        const questionData = questions.map(q => [examId, q.question_text, q.answer, q.marks]);

        await pool.query(questionQuery, [questionData]); // ✅ Batch insert questions

        res.status(201).json({ success: true, message: "Exam and Questions Created Successfully!", examId });

    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error", error: error.message });
    }
};

//get all answers
export const getAllAnswers=async(req,res)=>{
    const {examId}=req.params;
   try {
     const [answers]=await pool.query('SELECT question_text,answer,marks FROM answers WHERE exam_id=?',[examId])
     if(answers.length===0){
        return res.status(200).json({message:'No answer found'})
     }
     res.status(200).json({answers})
   } catch (error) {
      res.status(400).json({success:false,error:error.message})
   }
}
//update or submit marks
export const submitMarks=async(req,res)=>{
    try {
        const {studentId,examId,marks}=req.body;
        if (!studentId || !examId || !marks) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }
        const MarksQuery="INSERT INTO marks(student_id,exam_id,exam_marks) VALUES (?,?,?)"
        const SubmitQuery="INSERT INTO marks_submit(student_id,exam_id,isSubmitted) VALUES (?,?,?)"
        const [marksResult]=await pool.query(MarksQuery,[studentId,examId,marks])
        const [submitResult]=await pool.query(SubmitQuery,[studentId,examId,true])
        res.status(201).json({success:true,message:"Marks uploaded successfully",marksId:marksResult.insertId,submitId:submitResult.insertId})
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}
//get all students who attempted the exam
export const getAttemptedStudents=async(req,res)=>{
    const {examId}=req.params;
    try {
        const query = `
            SELECT DISTINCT answers.student_id,users.username
            FROM answers 
            INNER JOIN users
            ON answers.student_id = users.id
            WHERE answers.exam_id = ?
        `;
        const [students] = await pool.query(query, [examId]);

        if (students.length === 0) {
            return res.status(200).json({ message: 'No students have attempted this exam' });
        }

        res.status(200).json({ success: true, students });
    } catch (error) {
        res.status(400).json({success:false,error:error.message})   
    }
}

export const getEachStudentAnswer=async(req,res)=>{
    const {examId,studentId}=req.params;
    if(!examId || !studentId){
        return res.status(400).json({success:false,message:"examId and studentId are required"})
    }
    try {
        const query=`
            SELECT question_text,answer,marks,isSubmitted
            FROM answers
            WHERE exam_id=? AND student_id=?
            `
        const [answers]=await pool.query(query,[examId,studentId])
        if(answers.length==0){
            return res.status(200).json({message:'No answer found'})
        }
        res.status(200).json({success:true,answers})
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

export const getMarksSubmitOrNot=async(req,res)=>{
    try {
        const {examId,studentId}=req.params;
        if(!examId || !studentId){
            return res.status(400).json({success:false,message:"examId and studentId are required"})
        }
        const query=`
            SELECT isSubmitted
            FROM marks_submit
            WHERE exam_id=? AND student_id=?
        `
        const [marksSubmit]=await pool.query(query,[examId,studentId])
        if(marksSubmit.length==0){
            return res.status(200).json({message:'No answer found'})
        }
        res.status(200).json({success:true,marksSubmit})
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}

//get a particular student marks
export const getStudentMarks=async(req,res)=>{
    try {
        const {studentId,examId}=req.params;
        if(!studentId){
            return res.status(400).json({success:false,message:"studentId is required"})
        }
        const query=`
        SELECT exam_marks
        FROM marks
        WHERE student_id=? AND exam_id=?
        `
        const [marks]=await pool.query(query,[studentId,examId])
        if(marks.length==0){
            return res.status(200).json({message:'No marks found'})
        }
        res.status(200).json({success:true,marks})
    } catch (error) {
        res.status(400).json({success:false,error:error.message})
    }
}
//ai question generation
export const generateQuestion=async(req,res)=>{
    const {topic,totalmarks,difficulty}=req.body;
    const marks=parseInt(totalmarks)
    if(!topic || isNaN(marks) || !difficulty){
        return res.status(400).json({success:false,message:"topic, totalmarks and difficulty are required"})
    }
    const prompt = `
Generate an exam paper on "${topic}" for ${totalmarks} marks.
Difficulty level: ${difficulty}.
Question only contains short answer questions.
Make sure to include the marks for each question.
Ensure the total adds up to ${totalmarks}.
Make sure to include the answer for each question.
`;
   try {
    const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "mistralai/mistral-7b-instruct",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        },
        {
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
                "HTTP-Referer": "http://localhost:5000", // change based on your app domain
                "Content-Type": "application/json"
              },
        }
      );
  
      res.json({ questionPaper: response.data.choices[0].message.content });
   } catch (error) {
    console.error("Error from OpenAI API:", error.response?.data || error.message);
    res.status(400).json({ success: false, error: error.message });
   }
}

export const getAllMessages=async(req,res)=>{
    const {teacherId,studentId}=req.params;
    if(!teacherId || !studentId){
        return res.status(400).json({success:false,message:"teacherId and studentId are required"})
    }
    try {
        const query=`
       SELECT * FROM messages 
     WHERE (sender_id = ? AND receiver_id = ?) 
     OR (sender_id = ? AND receiver_id = ?)
     ORDER BY timestamp ASC
        `
        const [messages]=await pool.query(query,[teacherId,studentId,studentId,teacherId])
        if(messages.length==0){
            return res.status(200).json({message:'No messages found'})
        }
        res.status(201).json({success:true,messages})
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}