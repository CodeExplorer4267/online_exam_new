import React from 'react'
import ChatSidebar from './ChatSidebar'
import { Routes,Route } from 'react-router-dom'
import Chatwindow from './Chatwindow'

const TeacherChat = () => {
  return (
      <div className='flex w-[83%]'>
         <ChatSidebar/>
         <Routes>
            <Route path=':studentId/:teacherId' element={<Chatwindow/>}/>
         </Routes>
      </div>
  )
}

export default TeacherChat
