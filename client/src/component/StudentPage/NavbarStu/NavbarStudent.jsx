import React from 'react'
import { PiStudentFill } from "react-icons/pi";
import { Avatar } from '@mui/material';
import { FaChalkboardUser } from "react-icons/fa6";
import {motion} from 'framer-motion'
const NavbarStudent = () => {
  return (
    <>
    <motion.div initial={{opacity:0,y:-30}} animate={{opacity:1,y:0}} transition={{duration:0.5}} className='w-full h-[100px] bg-[#141414] text-[#7dbbff] flex justify-between items-center px-20 py-10'>
       <motion.div whileHover={{scale:1.05}} transition={{type:"spring",stiffness:200}}  className='flex justify-center items-center gap-5'>
         <FaChalkboardUser style={{
           color:'#7dbbff'
         }}
         size={50}
         />
         <span className='text-white font-bold text-[30px]'>Student Dashboard</span>
       </motion.div>
      <motion.div className='rounded-full w-10 h-auto flex justify-center' whileHover={{
        scale:1.05,
      }}
      transition={{type:"spring",stiffness:200}}>
         <Avatar className='border-2 border-[#7dbbff]' style={{
          height:'50px',
          width:'50px'
         }}/>
      </motion.div> 
    </motion.div>
    </>
  )
}

export default NavbarStudent

