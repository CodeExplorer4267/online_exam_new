import React from "react";
import { useNavigate } from "react-router-dom";
import { PiStudentFill } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";
import "./AdStu.css";
const StudentAdminPage = () => {
  const navigate = useNavigate();

  return (
    <div className="adstu_container">
      <h1 className="heading1">Welcome to exam portal</h1>
      <p
        style={{
          fontSize: "1.5rem",
          color: "black",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Who are you ?
      </p>
      <div className="student_admin">
        <div className="student" onClick={()=>{
           navigate('/register')
        }}>
          <PiStudentFill style={{
            fontSize:"4rem"
          }}/>
          <p
            style={{
              fontSize: "1.3rem",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Student
          </p>
        </div>
        <div className="teacher" onClick={()=>{
           navigate('/register')
        }}>
          <FaChalkboardTeacher style={{
             fontSize:"4rem"
          }}/>
          <p
            style={{
              fontSize: "1.3rem",
              color: "black",
              fontWeight: "bold",
            }}
          >
            Teacher
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default StudentAdminPage;
