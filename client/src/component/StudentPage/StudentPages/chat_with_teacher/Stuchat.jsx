import React from 'react'
import { useParams } from 'react-router-dom'

const Stuchat = () => {
  const {studentId,teacherId}=useParams()
  return (
    <>
    <div className="student-chat-container">
      <h3 className="chat-heading">
        Chat with Teacher ID : {teacherId}
      </h3>
    </div>
    </>
  )
}

export default Stuchat
