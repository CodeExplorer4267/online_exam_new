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
import DashBoard from './StudentPages/dashboard/dashboard'
import StudentMaterials from './StudentPages/StudentMaterial'
import StudentChat from './StudentPages/chat_with_teacher/StudentChat'
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
            <Route path='material' element={<StudentMaterials/>}/>
            <Route path='/chat/*' element={<StudentChat/>}/>
             {/* <Route path='stu-result' element={<StudentResult/>}/>
             
             <Route path='stu-result/:examId/:studentId' element={<StudentResultDetails/>}/>
             
             <Route path='/ask' element={<ChatAsk/>}/> */}
          </Routes>
      </div>
    </div>
  )
}

export default StudentPage
