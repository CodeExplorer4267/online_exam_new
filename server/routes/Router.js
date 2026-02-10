import express from 'express';
import { getUniqueId, login, register } from '../controller/userController.js';
import { createExam, generateQuestion, getAllAnswers, getAllMessages, getAllStudents, getAttemptedStudents, getEachStudentAnswer, getMarksStatusByExam, getMarksSubmitOrNot, getStudentMarks, getStudentsByYear, sendMail, submitMarks } from '../controller/teacherController.js';
import { askQuestion, deleteExam, downloadFile, getAllExams, getAllMaterials, getAllQuestions, getAllTeachers, submitExam, updateStudentProfile, getExamResults, getStudentAllMarks } from '../controller/studentController.js';
import { upload } from '../multer-config.js';
import pool from '../db/db.js'
import { verifyToken } from '../auth/auth.js';

const router=express.Router();

//user routes
router.post('/register',register) //done
router.post('/login',login)  //done

router.get('/exams',getAllExams)  //done
router.get('/get-teachers',getAllTeachers)

//student routes
router.get('/get-all-materials',getAllMaterials)
router.get('/download/:filename',downloadFile)
router.post('/askme',askQuestion)
router.put('/student/update-profile',updateStudentProfile)
router.get('/get-student-results/:examId/:studentId',getExamResults)
router.get('/student-all-marks/:studentId',getStudentAllMarks)

//teacher routes
router.get('/get-students',getAllStudents)
router.get('/getStudents/:year',getStudentsByYear)  //done
router.post('/createExam',createExam)  //done
router.get('/answers/attempted/:examId',getAttemptedStudents) //done
router.get('/answers/:examId/:studentId',getEachStudentAnswer) //done
router.post('/update-marks',submitMarks)
router.post('/generate',generateQuestion)
router.get('/get-all-messages/:uniqueTeacherId/:studentId',getAllMessages)
router.post('/sendmail',sendMail)

router.get('/marks-status/:examId',getMarksStatusByExam)

router.get('/get-unique-id/:userId',getUniqueId)

router.post('/upload-material', upload.single('file'), async (req, res) => {
    try {
      const { title, teacher_name } = req.body;
      const file=req.file
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }
  
    await pool.query(
      'INSERT INTO materials (title, file_name, teacher_name) VALUES (?, ?, ?)',
      [title, file.filename, teacher_name]
    );
  
    res.status(201).json({ success:true,message: 'Material uploaded successfully.' });
    } catch (error) {
      console.log(error)
      res.status(400).json({success:false, message: error.message });
    }
  });


router.delete('/exam/:id',deleteExam)  //done
router.get('/exam/:examId',getAllQuestions) //done
router.post('/submit-answers',submitExam)
// router.get('/answers/:examId',getAllAnswers)




router.get('/marks-submit-or-not/:examId/:studentId',getMarksSubmitOrNot)
router.get('/get-student-marks/:examId/:studentId',getStudentMarks) 

export default router;