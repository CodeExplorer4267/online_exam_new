import React, { useEffect, useState } from 'react'
import "./StudentResultDetails.css"
import axios from 'axios'
import { useLocation, useParams } from 'react-router-dom'
import MarksCircle from '../../LandingPage/MarksCircle'
const StudentResultDetails = () => {
    const [answers,setanswers]=useState([])
    const {examId,studentId}=useParams()
    const [studentMarks,setStudentMarks]=useState(0)
    // const [examTotalMarks,setExamTotalMarks]=useState(0)
    const location=useLocation()
    const {exam_total_marks}=location.state?location.state:{}
    useEffect(()=>{
        axios.get(`http://localhost:5000/online-exam/answers/${examId}/${studentId}`)
        .then((res)=>{
            if(res.data.answers !== undefined){
                setanswers(res.data.answers)
            }
            else{
                
            }
        })
        .catch((err)=>{
            console.log("Error while fetching each student answer",err)
        })
        // const updatedAnswers=[...answers]
        // const total=updatedAnswers.reduce((sum,ans)=>sum+ans.marks,0)
        // setExamTotalMarks(total) // Update the state for total marks of the exam
    },[])

    useEffect(()=>{
        axios.get(`http://localhost:5000/online-exam/get-student-marks/${examId}/${studentId}`)
        .then((res)=>{
            setStudentMarks(res.data.marks[0].exam_marks)
        })
        .catch((err)=>{
            console.log("Error while fetching student marks",err)
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
        <div className="marks_status" onFocus={true}>
            <h2 style={{
                textAlign:"center",
                color:"#00203FFF",
                fontSize:"25px",
            }}>Total Marks in this exam : {studentMarks} out of {exam_total_marks}</h2>
            <MarksCircle percentage={(studentMarks/exam_total_marks)*100} />
        </div>
    </div>
    </>
  )
}

export default StudentResultDetails
