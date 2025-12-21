import React, { useContext } from 'react'
import NavbarStudent from './NavbarStu/NavbarStudent'
import { Routes,Route, Router, useLocation } from 'react-router-dom'
import SidebarStudent from './SidebarStu/SidebarStudent'
import StudentExam from './StudentPages/exams/StudentExam'
import StudentExamQuestions from './StudentPages/exams/StudentExamQuestions'
import StudentResult from './StudentPages/StudentResult'
import StudentMarks from './StudentPages/StudentMarks'
import "./Student.css"
import StudentResultDetails from './StudentPages/StudentResultDetails'
import Stuchat_container from './StudentPages/chat_with_teacher/Stuchat_container'
import StudentMaterial from './StudentPages/StudentMaterial'
import DashBoard from './StudentPages/dashboard/dashboard'
// import ChatAsk from './askQuestion/chatAsk'

const StudentPage = () => {
 


  return (
    <div>
      <NavbarStudent/>
      <div className="student-container">
          <SidebarStudent/>
          <Routes>
            <Route path='dashboard' element={<DashBoard/>}/>
            <Route path='exam' element={<StudentExam/>}/>
            <Route path='exam/:examId' element={<StudentExamQuestions/>}/>
             {/* <Route path='stu-result' element={<StudentResult/>}/>
             <Route path='/chat/*' element={<Stuchat_container/>}/>
             
             <Route path='stu-result/:examId/:studentId' element={<StudentResultDetails/>}/>
             <Route path='student-material' element={<StudentMaterial/>}/>
             <Route path='/ask' element={<ChatAsk/>}/> */}
          </Routes>
      </div>
    </div>
  )
}

export default StudentPage
