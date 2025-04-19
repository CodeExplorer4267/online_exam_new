import React from 'react'
import Stuchat_sidebar from './Stuchat_sidebar'
import Stuchat from './Stuchat'
// import Chat from '../../../TeacherPage/teacher_pages/chat_with_stu/Chat'
import { Routes,Route } from 'react-router-dom'
const Stuchat_container = () => {
  return (
    <>
     <Stuchat_sidebar/>
     <div style={{
        width:"61%",
     }}>
        <Routes>
            <Route path="/:studentId/:teacherId" element={<Stuchat/>}/>
        </Routes>
     </div>
    </>
  )
}

export default Stuchat_container
