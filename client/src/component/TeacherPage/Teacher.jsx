import React from "react";
import NavbarTeacher from "./NavbarTea/NavbarTeacher";
import SidebarTeacher from "./SidebarTea/SidebarTeacher";
import { Route, Router, Routes } from "react-router-dom";
import StudentList from "./teacher_pages/studentList/StudentList"
import CreateExam from "./teacher_pages/createExam/CreateExam"

import "./Teacher.css"
import Result from "./teacher_pages/Result/Result";
import Generate from "./teacher_pages/AI_Q_generator/Generate";
import Material from "./teacher_pages/materials/Material";
import TeacherChat from "./teacher_pages/chat_with_stu/TeacherChat";
import AttemptedStudents from "./teacher_pages/answers/AttemptedStudents";
import EachAnswer from "./teacher_pages/answers/EachAnswer";



const TeacherPage = () => {
  return (
    <div>
        <NavbarTeacher/>
        <div className="teacher-container">
           <SidebarTeacher/>
              <Routes>
                 <Route path="student-list" element={<StudentList/>}/>
                 <Route path="create-exam" element={<CreateExam/>}/>
                 <Route path="result" element={<Result/>}/>
                 <Route path="result/:examId" element={<AttemptedStudents/>}/>
                 <Route path="result/:examId/:studentId" element={<EachAnswer/>}/>
                 <Route path="question-generator" element={<Generate/>}/>
                 <Route path="chat/*" element={<TeacherChat/>}/>
                 <Route path="material" element={<Material/>}/>
              </Routes>
        </div>
    </div>
  );
};

export default TeacherPage;