import React, { useState } from 'react'
import "./SidebarStudent.css"
import {useNavigate} from 'react-router-dom'

const SidebarStudent = () => {
  const navigate=useNavigate()
  const [activeoption,setactiveoption]=useState('exam')
  const handleNavigation=(option)=>{
      setactiveoption(option)
      navigate(`/student/${option}`)
  }

  return (
    <div className='sidebar-teacher'>
        <div className="options">
            <div className={`option ${activeoption==='exam' ? 'active':''}`} onClick={()=>{
               handleNavigation('exam')
            }}>Exam</div>
            <div className={`option ${activeoption==='stu-result' ? 'active':''}`} onClick={()=>{
               handleNavigation('stu-result')
            }}>Result</div>
            <div className={`option ${activeoption==='chat' ? 'active':''}`} onClick={()=>{
               handleNavigation('chat')
            }}>Chat</div>
        </div>
    </div>
  )
}

export default SidebarStudent
