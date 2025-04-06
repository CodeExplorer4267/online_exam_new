import React from 'react'
import { PiStudentFill } from "react-icons/pi";
import { Avatar } from '@mui/material';
import "./NavbarStudent.css"

const NavbarStudent = () => {
  return (
    <>
    <div className='container'>
       <PiStudentFill style={{
        fontSize:"4rem"
       }}/>
       <p style={{
          fontSize:"2rem",
          fontWeight:"bold",
          fontFamily:"serif"
       }}>Welcome Student</p>
       <Avatar 
        sx={{
          height:50,
          width:50
        }}
       />
    </div>
    <hr />
    </>
  )
}

export default NavbarStudent

