import React, { useContext } from 'react'
import NavbarStudent from './NavbarStu/NavbarStudent'
import { Routes,Route, Router, useLocation } from 'react-router-dom'
import SidebarStudent from './SidebarStu/SidebarStudent'
import StudentExam from './StudentPages/StudentExam'
import StudentResult from './StudentPages/StudentResult'
import StudentMarks from './StudentPages/StudentMarks'
import "./Student.css"
import StudentExamQuestions from './StudentPages/StudentExamQuestions'
import StudentResultDetails from './StudentPages/StudentResultDetails'
const StudentPage = () => {
  
  return (
    <div>
      <NavbarStudent/>
      <div className="student-container">
          <SidebarStudent/>
          <Routes>
             <Route path='exam' element={<StudentExam/>}/>
             <Route path='stu-result' element={<StudentResult/>}/>
             <Route path='stu-marks' element={<StudentMarks/>}/>
             <Route path='exam/:examId' element={<StudentExamQuestions/>}/>
             <Route path='stu-result/:examId/:studentId' element={<StudentResultDetails/>}/>
          </Routes>
      </div>
    </div>
  )
}

export default StudentPage
