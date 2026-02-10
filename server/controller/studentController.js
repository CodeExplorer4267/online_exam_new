import pool from '../db/db.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//get all exams
export const getAllExams = async (req, res) => {
    try {
        const [exams] = await pool.query("SELECT * FROM exams")
        if(exams.length===0){
            return res.status(404).json({success:false,message:"No exams found"})
        }
        res.status(201).json({exams})
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
//get questions related to a particular exam
export const getAllQuestions=async(req,res)=>{
    try {
         const {examId}=req.params;
         const [questions]=await pool.query("SELECT * FROM questions WHERE exam_id = ?",[examId])
         if(questions.length===0){
            return res.status(404).json({success:false,message:"No questions found"})
         }
         res.status(201).json({questions})
    } catch (error) {
        res.status(404).json({success:false,message:error.message})
    }
}
//submit answers
export const submitExam=async(req,res)=>{
    try {
        const { studentId, examId, answers } = req.body;
        const values = answers.map((ans) => [
            studentId,
            examId,
            ans.questionText,
            ans.answer,
            ans.marks,
            ans.questionId
          ]);
          const query =
    "INSERT INTO answers(student_id, exam_id, question_text, answer, marks, question_id) VALUES ?"
    const [ansResult]=await pool.query(query,[values])
    const answerId=ansResult.insertId
    res.status(201).json({success:true,message:"answers submitted successfully",answerId})
    } catch (error) {
        res.status(404).json({success:false,message:error.message})
    }
}

//delete a single exam
export const deleteExam=async(req,res)=>{
    const {id}=req.params;
    if(!id){
        return res.status(400).json({success:false,message:"Exam id is required"})
    }
    try {
        //delete questions associated with the exam
        await pool.query("DELETE FROM questions WHERE exam_id=?",[id])
        // Delete the exam itself
        const [result] = await pool.query("DELETE FROM exams WHERE id = ?", [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ success: false, message: "Exam not found" });
        }
        res.status(200).json({success:true,message:"Exam Deleted successfully"})
    } catch (error) {
        console.log("Error while deleting exam:",error)
        res.status(500).json({success:false,message:error.message})
    }
}
//get all available teachers
export const getAllTeachers=async(req,res)=>{
    try {
        const [teachers]=await pool.query("SELECT * FROM teachers")
        if(teachers.length===0){
            return res.status(404).json({success:false,message:"No teachers found"})
        }
        res.status(200).json({success:true,teachers})
    } catch (error) {
        res.status(400).json({success:false,message:error.message})
    }
}
//get all materials uploaded by teachers
export const getAllMaterials=async(req,res)=>{
    try {
        const [files]=await pool.query("SELECT * FROM materials ORDER BY created_at DESC")
        if(files.length===0){
            return res.status(404).json({success:false,message:"No materials found"})
        }
        res.status(201).json({files})
      } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
      }
}
export const downloadFile = async (req, res) => {
  try {
    const { filename } = req.params;

    // Prevent directory traversal attack
    if (filename.includes("..")) {
      return res.status(400).json({
        success: false,
        message: "Invalid file name"
      });
    }

    const filePath = path.join(__dirname, "..", "uploads", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: "File not found"
      });
    }

    res.download(filePath, filename, (err) => {
      if (err) {
        console.error("Download error:", err);
        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            message: "Error downloading file"
          });
        }
      }
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};

//fs.existsSync(filepath)
// // This line checks whether the file is physically present on your server.

// fs.existsSync(filePath) uses Node.js fs module (File System).

// It returns true if the file is there; otherwise false.

// Here filePath is usually something like C:/project/uploads/abc123.pdf.

// If the file exists, this line starts the download process.
// ------------------------------------------------------------------------
// res.download() is an Express response method that:

// Tells the browser: "Hey, download this file."

// It automatically sets headers like Content-Disposition: attachment for download prompt.

// filePath is the absolute location of the file on your server.

// filename is the name the file will have when downloaded (can be different from filePath last segment).

// ➔ The third argument is a callback function which will run after the download attempt — success or error.
export const askQuestion=async(req,res)=>{
    try {
    const { question } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-4o-mini", // you can change to other models like "mistralai/mistral-7b-instruct"
        messages: [
          {
            role: "system",
            content:
              "You are an AI assistant for an online examination system. Help students with academic/exam queries clearly and concisely.",
          },
          { role: "user", content: question },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_KEY}`,
          "HTTP-Referer": "http://localhost:5173", // your frontend URL
          "X-Title": "Online Exam Assistant",
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ answer: response.data.choices[0].message.content });
  } catch (error) {
    console.error(error?.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
}

export const updateStudentProfile=async(req,res)=>{
   try {
    const {year,phone,id}=req.body
    if(!id){
       return res.status(401).json({sucess:false,message:"Student Id not found"})
    }
    if(!year || !phone){
        return res.status(400).json({success:false,message:"Year and Phone number are required"})
    }
    const [result]=await pool.query("UPDATE students SET year=?, phone=? WHERE id=?",[year,phone,id])
    return res.status(200).json({success:true,message:"Profile updated successfully"})
   } catch (error) {
      return res.status(500).json({success:false,message:"Failed to update profile:",error:error.message})
   }
}

export const getExamResults=async(req,res)=>{
  try {
    const {examId,studentId}=req.params;
     if(!examId || !studentId){
        return res.status(400).json({success:false,message:"Exam Id and Student Id are required"})
     }
     //fetch the exam details
        const [examRows]=await pool.query("SELECT id, name, total_marks, duration FROM exams WHERE id=?",[examId])
     if(examRows.length===0){
        return res.status(404).json({success:false,message:"Exam not found"})
     }
     const exam=examRows[0]
     const [evaluation]=await pool.query(`
         SELECT 
           q.id as question_id,
           q.question_text,
           q.marks as max_marks,
           a.answer as student_answer,
           a.evaluated_marks,
           a.id as answer_id
         FROM questions q
         LEFT JOIN answers a ON q.id = a.question_id AND a.exam_id = ? AND a.student_id = ?
         WHERE q.exam_id = ?
         ORDER BY q.id ASC
     `,[examId, studentId, examId])

     const [marksRows]=await pool.query("SELECT marks as obtained_marks, total_marks, isSubmitted FROM marks WHERE exam_id=? AND student_id=?",[examId,studentId])
     
     const isEvaluated=marksRows.length > 0 && marksRows[0].isSubmitted
     const obtainedMarks=marksRows.length > 0 ? marksRows[0].obtained_marks : null
     res.status(200).json({
        success:true,
        exam: {
           id: exam.id,
           name: exam.name,
           total_marks: exam.total_marks,
           duration: exam.duration
        },
        evaluation,
        obtainedMarks,
        isEvaluated
     })
  } catch (error) {
    return res.status(500).json({success:false,message:"Failed to fetch ecxam results: Server Error",error:error.message })
  }
}

// Get all marks for a student across all exams
export const getStudentAllMarks=async(req,res)=>{
   try {
     const {studentId}=req.params;
     if(!studentId){
        return res.status(400).json({success:false,message:"Student Id is required"})
     }
     const [marks]=await pool.query("SELECT exam_id, marks as obtained_marks, total_marks, isSubmitted FROM marks WHERE student_id=?",[studentId])
     res.status(200).json({success:true, marks})
   } catch (error) {
     return res.status(500).json({success:false,message:"Failed to fetch student marks",error:error.message})
   }
}