import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MdSpaceDashboard } from "react-icons/md"
import { PiExamFill } from "react-icons/pi";
import { FaChartBar,FaBook } from 'react-icons/fa';
import { IoChatbubbleSharp } from "react-icons/io5";

const SidebarStudent = () => {
  const navigate = useNavigate()
  const [activeoption, setactiveoption] = useState('dashboard')

  const handleNavigation = (option) => {
    setactiveoption(option)
    navigate(`/student/${option}`)
  }

  const itemStyle = (option) =>
    `relative flex gap-3 rounded-[15px] p-3 items-center cursor-pointer
     transition-all duration-300 ease-in-out
     ${activeoption === option
        ? 'bg-[#1c2b3a] border-2 border-[#4ea2ff] shadow-[0_0_15px_rgba(78,162,255,0.6)] '
        : 'border-2 border-[#2a2a2a] hover:bg-[#1a1a1a]'
     }`

  return (
    <div className='bg-[#141414] w-[17%] min-h-screen p-3 flex flex-col gap-4'>

      {/* <div
        className={itemStyle('dashboard')}
        onClick={() => handleNavigation('dashboard')}
      >
    
        {activeoption === 'dashboard' && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[4px] bg-[#4ea2ff] rounded-full" />
        )}

        <MdSpaceDashboard size={28} color="#4ea2ff" />
        <span className='text-[white] font-medium'>Dashboard</span>
      </div> */}

      {/* EXAM */}
      <div
        className={itemStyle('exam')}
        onClick={() => handleNavigation('exam')}
      >
        {activeoption === 'exam' && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[4px] bg-[#4ea2ff] rounded-full" />
        )}
        <PiExamFill size={28} color="#4ea2ff" />
        <span className='text-white font-medium'>Exam</span>
      </div>

      {/* RESULT */}
      <div
        className={itemStyle('result')}
        onClick={() => handleNavigation('result')}
      >
        {activeoption === 'result' && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[4px] bg-[#4ea2ff] rounded-full" />
        )}
        <FaChartBar size={28} color="#4ea2ff" />
        <span className='text-white font-medium'>Result</span>
      </div>

      {/* MATERIAL */}
      <div
        className={itemStyle('material')}
        onClick={() => handleNavigation('material')}
      >
        {activeoption === 'material' && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[4px] bg-[#4ea2ff] rounded-full" />
        )}
        <FaBook size={28} color="#4ea2ff" />
        <span className='text-white font-medium'>Material</span>
      </div>

      {/* CHAT */}
      <div
        className={itemStyle('chat')}
        onClick={() => handleNavigation('chat')}
      >
        {activeoption === 'chat' && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[60%] w-[4px] bg-[#4ea2ff] rounded-full" />
        )}
        <IoChatbubbleSharp size={28} color="#4ea2ff" />
        <span className='text-white font-medium'>Chat</span>
      </div>

    </div>
  )
}

export default SidebarStudent
