import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const SidebarStudent = () => {
  const navigate=useNavigate()
  const [activeoption,setactiveoption]=useState('exam')
  const handleNavigation=(option)=>{
      setactiveoption(option)
      navigate(`/student/${option}`)
  }
  
  return (
    <div className='bg-[#141414] w-[300px]'>

    </div>
  )
}

export default SidebarStudent
