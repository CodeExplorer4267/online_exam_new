import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import "./Result.css"
import { useNavigate } from 'react-router-dom';
const Result = () => {
  const [exams, setExams] = useState([]);
   const navigate=useNavigate()
    useEffect(() => {
        axios.get("http://localhost:5000/online-exam/exams")
            .then(response => setExams(response.data.exams))
            .catch(error => console.error("Error fetching exams:", error));
    }, []);

    return (
        <div className='stu-exam-container' style={{
            width:"81%",
        }}>
            <h2 style={{
              textAlign:"center",
              fontSize:"1.7rem"
            }}>Available Exams</h2>
            <table border="1" className='exam-table'>
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
                    {exams.map(exam => (
                        <tr key={exam.id}>
                            <td>{exam.id}</td>
                            <td>{exam.name}</td>
                            <td>{exam.duration}</td>
                            <td>{exam.total_Marks}</td>
                            <td><button style={{
                              height:"35px",
                              width:"80px",
                              backgroundColor:"#00203FFF",
                              color:"#ADEFD1FF",
                              borderRadius:"10px",
                              cursor:"pointer",
                            }} onClick={() => navigate(`/teacher/result/attempted/${exam.id}`)}>Open</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Result
