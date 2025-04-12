import React, { useState } from 'react'
import "./SidebarTeacher.css"
import {useNavigate} from 'react-router-dom'

const SidebarTeacher = () => {
  const navigate=useNavigate()
  const [activeoption,setactiveoption]=useState('student-list')
  const handleNavigation=(option)=>{
      setactiveoption(option)
      navigate(`/teacher/${option}`)
  }

  return (
    <div className='sidebar-teacher'>
        <div className="options">
            <div className={`option ${activeoption==='student-list' ? 'active':''}`} onClick={()=>{
               handleNavigation('student-list')
            }}>Student List</div>
            <div className={`option ${activeoption==='create-exam' ? 'active':''}`} onClick={()=>{
               handleNavigation('create-exam')
            }}>Create Exam</div>
            <div className={`option ${activeoption==='result' ? 'active':''}`} onClick={()=>{
               handleNavigation('result')
            }}>Result</div>
            <div className={`option ${activeoption==='question-generator' ? 'active':''}`} onClick={()=>{
               handleNavigation('question-generator')
            }}>AI Question Generator</div>
        </div>
    </div>
  )
}

export default SidebarTeacher
