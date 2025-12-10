import React from 'react'
import { PiStudentFill } from "react-icons/pi";
import { Avatar } from '@mui/material';
import { FaChalkboardUser } from "react-icons/fa6";

const NavbarStudent = () => {
  return (
    <>
    <div className='w-full h-[100px] bg-[#141414] text-[#7dbbff] flex justify-evenly items-center p-5'>
       <div className='flex justify-center items-center gap-5'>
         <FaChalkboardUser style={{
           color:'#7dbbff'
         }}
         size={50}
         />
         <span className='text-white font-bold text-[30px]'>Student Dashboard</span>
       </div>
      <div className='rounded-full w-10 h-auto flex justify-center'>
         <Avatar className='border 2 border-[#7dbbff]'/>
      </div> 
    </div>
    </>
  )
}

export default NavbarStudent

