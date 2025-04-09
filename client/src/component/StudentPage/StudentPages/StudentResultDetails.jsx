import React, { useEffect, useState } from 'react'
import "./StudentResultDetails.css"
import axios from 'axios'
import { useParams } from 'react-router-dom'
const StudentResultDetails = () => {
    const [answers,setanswers]=useState([])
    const {examId,studentId}=useParams()
    const [studentMarks,setStudentMarks]=useState(0)
    useEffect(()=>{
        axios.get(`http://localhost:5000/online-exam/answers/${examId}/${studentId}`)
        .then((res)=>{
            setanswers(res.data.answers)
        })
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:5000/online-exam/get-student-marks/${examId}/${studentId}`)
        .then((res)=>{
            setStudentMarks(res.data.marks[0].exam_marks)
        })
    })

  return (
    <>
    <div className="student_result_details_container">
        <table className="student_result_details_table">
            <thead>
                <tr>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Total Marks</th>
                </tr>
            </thead>
            <tbody>
                {answers.map((a,index)=>{
                    return(
                        <tr key={index}>
                          <td>{a.question_text}</td>
                          <td>{a.answer}</td>
                          <td>{a.marks}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>

    </div>
    </>
  )
}

export default StudentResultDetails
