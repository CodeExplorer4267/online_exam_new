import React from 'react'
import ChatSidebar from './ChatSidebar'
import {Routes,Route} from 'react-router-dom'
import Chatwindow from './Chatwindow'
const StudentChat = () => {
  
  return (
    <div className='w-[83%] flex'>
      <ChatSidebar />
      <div className='w-[70%] bg-[#0d101a]'>
        <Routes>
           <Route path=':teacherId/:studentId' element={<Chatwindow/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default StudentChat
