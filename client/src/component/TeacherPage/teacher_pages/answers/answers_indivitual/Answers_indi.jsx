import React, { useEffect, useState } from 'react'
import "./Answer_indi.css"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
const Answers_indi = () => {
    const [attempted,setattempted]=useState([])
    const {examId}=useParams()
    const navigate=useNavigate()
    useEffect(()=>{
        axios.get(`http://localhost:5000/online-exam/answers/attempted/${examId}`)
        .then((res)=>{
            console.log(res.data.students)
            setattempted(res.data.students)
        })
        .catch((err)=>{
            console.log("Error while fetching attempted students",err)
        })
    },[])
    
  return (
    <>
     <div className="ans_indi_container">
        <h1 className='ans_indi'>Students who attempted the Exam</h1>
        <table className="ans_indi_student_table">
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Username</th>
                    <th>State</th>
                </tr>
            </thead>
            <tbody>
                {
                    attempted?.map((s)=>( 
                        <tr key={s.student_id}>
                           <td>{s.student_id}</td>
                           <td>{s.username}</td>
                           <td><button style={{
                             backgroundColor:'#00203FFF',
                             color:'#ADEFD1FF',
                             width:'110px',
                             height:'30px',
                             padding:'5px',
                             borderRadius:'12px'
                           }} onClick={()=>navigate(`answer/${s.student_id}`,{
                             state:{
                                student_name:s.username
                             }
                           })}>Open Answers</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
     </div>
    </>
  )
}

export default Answers_indi
 