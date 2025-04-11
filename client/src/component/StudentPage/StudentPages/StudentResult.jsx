import React, { useEffect, useState } from "react";
import "./StudentResult.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const StudentResult = () => {
  const currentStudentId = localStorage.getItem("studentId");
  const [Exams, setExams] = useState([]);
  const navigate=useNavigate()

  useEffect(() => {
    axios.get("http://localhost:5000/online-exam/exams").then((res) => {
      setExams(res.data.exams);
    });
  }, []);

  return (
    <>
      <div className="student_result_container">
        <h1
          style={{
            textAlign: "center",
            fontSize: "35px",
            fontWeight: "bold",
            color: "#00203FFF",
          }}
        >
          Available Result for student ID :{currentStudentId}
        </h1>
        <table className="res_exam_table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Duration (mins)</th>
              <th>Total Marks</th>
              <th>state</th>
            </tr>
          </thead>
          <tbody>
            {Exams.map((exam, index) => {
              return (
                <tr key={index}>
                  <td>{exam.id}</td>
                  <td>{exam.name}</td>
                  <td>{exam.duration}</td>
                  <td>{exam.total_Marks}</td>
                  <td>
                    <button
                      style={{
                        height: "35px",
                        width: "80px",
                        backgroundColor: "#00203FFF",
                        color: "#ADEFD1FF",
                        borderRadius: "10px",
                        cursor: "pointer",
                      }} onClick={()=>{
                         navigate('/student/stu-result/'+exam.id+'/'+currentStudentId,{
                          state:{
                            exam_total_marks:exam.total_Marks
                          }
                         })
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default StudentResult;
