import pool from '../db/db.js';

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
