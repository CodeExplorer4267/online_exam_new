import React from 'react'
import { FaChalkboardTeacher } from "react-icons/fa";
import { Avatar } from '@mui/material';
import "./NavbarTeacher.css"
const NavbarTeacher = () => {
  return (
    <>
    <div className='container'>
       <FaChalkboardTeacher style={{
        fontSize:"4rem"
       }}/>
       <p style={{
          fontSize:"2rem",
          fontWeight:"bold",
          fontFamily:"serif"
       }}>Welcome to Teacher Page</p>
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

export default NavbarTeacher

