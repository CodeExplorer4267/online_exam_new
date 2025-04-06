import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './StudentList.css'
const StudentList = () => {

  const [students, setStudents] = useState([]);
  useEffect(()=>{
    axios.get('http://localhost:5000/online-exam/get-students')
    .then(response=>setStudents(response.data.students))
    .catch(error=>console.log(error))
  },[])
  return (
    <div className="student-list-container">
    <h1 className="teacher_student_list">Student List</h1>

    <table className="student-table">
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
          <th>Issue</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student, index) => (
          <tr key={index}>
            <td>{student.username}</td>
            <td>{student.email}</td>
            <td><button id='student_report'>Report</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}

export default StudentList
