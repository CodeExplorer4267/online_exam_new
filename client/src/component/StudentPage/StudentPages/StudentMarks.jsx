import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentMarks.css"
const StudentMarks = () => {
  const studentId = localStorage.getItem("studentId");
  const [marksData, setMarksData] = useState([]);

  useEffect(() => {
    if (!studentId) return;

    axios
      .get(`http://localhost:5000/online-exam/student-marks/${studentId}`)
      .then((response) => {
        setMarksData(response.data.data);
      })
      .catch((error) => console.error("Error fetching student marks:", error));
  }, [studentId]);

  return (
    <div style={{
      width:'80%',
      display:"flex",
      flexDirection:"column",

    }}>
      <h2 style={{
        textAlign:"center"
      }}>My Exam Marks</h2>
      {marksData.length > 0 ? (
        <table border="1" cellPadding="10" cellSpacing="0" style={{
         width:"50%",
         margin:"10px auto"
        }}>
          <thead style={{
            backgroundColor:"#00203FFF",
            color:"#ADEFD1FF"
          }}>
            <tr>
              <th>Exam Name</th>
              <th>Marks Obtained</th>
            </tr>
          </thead>
          <tbody>
            {marksData.map((exam, index) => (
              <tr key={index}>
                <td>{exam.exam_name}</td>
                <td>{exam.total_marks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No marks available.</p>
      )}
    </div>
  );
};

export default StudentMarks;

