import express from 'express';
import { getStudentList, login, register } from '../controller/userController.js';
import { createExam, getAllAnswers, getAttemptedStudents, getEachStudentAnswer, getMarksSubmitOrNot, getStudentMarks, submitMarks } from '../controller/teacherController.js';
import { deleteExam, getAllExams, getAllQuestions, submitExam } from '../controller/studentController.js';

const router=express.Router();

//user routes
router.post('/register',register) //done
router.post('/login',login)  //done

router.get('/get-students',getStudentList)  //done
router.post('/createExam',createExam)  //done

router.get('/exams',getAllExams)  //done
router.delete('/exam/:id',deleteExam)  //done
router.get('/exam/:examId',getAllQuestions) //done
router.post('/submit-answers',submitExam)
// router.get('/answers/:examId',getAllAnswers)
router.get('/answers/attempted/:examId',getAttemptedStudents) //done
router.get('/answers/:examId/:studentId',getEachStudentAnswer) //done
router.post('/update-marks',submitMarks)

router.get('/marks-submit-or-not/:examId/:studentId',getMarksSubmitOrNot)
router.get('/get-student-marks/:examId/:studentId',getStudentMarks) 

export default router;