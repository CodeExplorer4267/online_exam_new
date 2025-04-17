import React from "react";
import NavbarTeacher from "./NavbarTea/NavbarTeacher";
import SidebarTeacher from "./SidebarTea/SidebarTeacher";
import { Route, Routes } from "react-router-dom";
import StudentList from "./teacher_pages/studentList/StudentList"
import CreateExam from "./teacher_pages/createExam/CreateExam"

import "./Teacher.css"
import Result from "./teacher_pages/Result/Result";
import StudentAnswers from "./teacher_pages/answers/StudentAnswers";
import Answers_indi from "./teacher_pages/answers/answers_indivitual/Answers_indi";
import EachStudentAnswer from "./teacher_pages/answers/answer_stu_indi/EachStudentAnswer";
import Generate from "./teacher_pages/AI_Q_generator/Generate";
import Chat_container from "./teacher_pages/chat_with_stu/Chat_container";


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
                 {/* <Route path="result/:examId" element={<StudentAnswers/>}/> */}
                 <Route path="result/attempted/:examId" element={<Answers_indi/>}/>
                 <Route path="result/attempted/:examId/answer/:studentId" element={<EachStudentAnswer/>}/>
                 <Route path="question-generator" element={<Generate/>}/>
                 <Route path="chat/*" element={<Chat_container/>}/>
              </Routes>
        </div>
    </div>
  );
};

export default TeacherPage;
