import React from 'react'
import { useState,useEffect } from 'react';
import axios from 'axios';
import "./StudentExam.css"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const StudentExam = () => {
  const [exams, setExams] = useState([]);
   const navigate=useNavigate()
    useEffect(() => {
        axios.get("http://localhost:5000/online-exam/exams")
            .then(response => setExams(response.data.exams))
            .catch(error => console.error("Error fetching exams:", error));
    }, []);
    //delete the particular exam
    const handleDeleteExam=async(id)=>{
       try {
          await axios.delete(`http://localhost:5000/online-exam/exam/${id}`)
          toast.success("Exam deleted successfully")
          setExams(prevexams=>prevexams.filter(exam=>exam.id!==id))
       } catch (error) {
         toast.error("Error while deleting exam")
       }
    }
    

    return (
        <div className='stu-exam-container'>
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
                        <th>Remove</th>
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
                            }} onClick={()=>{
                                navigate(`${exam.id}`,{
                                    state:{exam_duration:exam.duration}
                                })
                            }}>Open</button></td>
                            <td><button style={{
                              height:"35px",
                              width:"80px",
                              backgroundColor:"#00203FFF",
                              color:"#ADEFD1FF",
                              borderRadius:"10px",
                              cursor:"pointer",
                            }} onClick={() =>handleDeleteExam(exam.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default StudentExam
