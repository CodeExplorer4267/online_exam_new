import React from 'react'
import LandingPage from './component/LandingPage/LandingPage'
import StudentAdminPage from './component/AdStu/AdStu'
import { Route, Router, Routes } from 'react-router-dom'
import StudentPage from './component/StudentPage/Student'
import TeacherPage from './component/TeacherPage/Teacher'
import Register from './component/Register/Register'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (
    <div>
       <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/stuadmin' element={<StudentAdminPage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/student/*' element={<StudentPage/>}/>
          <Route path='/teacher/*' element={<TeacherPage/>}/>
       </Routes>
       <ToastContainer/>
    </div>
  )
}

export default App
