import { Stack,Typography,Button, useMediaQuery } from '@mui/material'
import React, { useContext, useState } from 'react'
import "./Register.css"
import axios from 'axios'
import {useNavigate} from "react-router-dom"

const Register = () => {
  const navigate=useNavigate()
  const [login,setlogin]=useState(false)
  const [username,setusername]=useState('')
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const [role,setrole]=useState('')

  const _500=useMediaQuery("(max-width:500px)")
  const data={ 
     username,
     email,
     password,
     role
  }
 
  const changeLogin=()=>{
    // age jevalue t a chilo seta toggle hye jabe
    setlogin((prev)=>!prev)
  }
  const handleSubmit=async()=>{
     if(!login){
        const res=await axios.post('http://localhost:5000/online-exam/register',data);
        if(res.data.role==='student'){
         navigate('/student')
      }
      else{
         navigate('/teacher')
      }
     }
     else{
      const res=await axios.post('http://localhost:5000/online-exam/login',data);
      localStorage.setItem("studentId", res.data.studentId);
         if(res.data.role==='student'){
            navigate('/student')
         }
         else{
            navigate('/teacher')
         }
     }
  }
  
  return (
    <Stack flexDirection={'row'}
    justifyContent={'center'}
    alignItems={'center'}
    height={'100vh'}
    m={0}
    p={0}
    >
     <Stack width={_500?"100%":"50%"} 
     height={'100vh'}
     sx={{
        backgroundImage:'url("register_background.jpg")',
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover'
     }}
     flexDirection={'column'}
     justifyContent={'center'}
     alignItems={'center'}
     >
         <Stack flexDirection={'column'}
          width={_500?"65%":"50%"}
          gap={_500?3:2}
          bgcolor={'white'}
          height={'55vh'}
          border={'2px solid black'}
          borderRadius={'30px'}
          p={'20px'}
         >
           <Typography variant='h5' 
           alignSelf={'center'}
           p={'20px'}
           fontWeight={'bold'}
           color='#5d12a3'
           >
              {login?"Login with Email":"Register with Email"}
           </Typography>
           {!login? <><input type="text" placeholder='Enter your name' onChange={(e)=>{
              setusername(e.target.value)
           }}/>
           </>
           :<></>
           }
           <input type="text" placeholder='Enter your role:Teacher/Student' onChange={(e)=>{
            setrole(e.target.value)
         }}/>
           <input type="email" placeholder='Enter your email' onChange={(e)=>{
              setemail(e.target.value)
           }}/>
           <input type="password" placeholder='Enter password' onChange={(e)=>{
              setpassword(e.target.value)
           }}/>
           {login?<button id='register_btn' onClick={()=>{
              handleSubmit()
           }}>Login</button>:<button id='register_btn' onClick={()=>{
             handleSubmit()
           }}>Sign Up</button>}
           {login? <p className='register_login'>Create a new account?<span className='login' onClick={()=>{
            changeLogin()
           }}>Register Here</span></p>:<p className='register_login'>Already have an account?<span className='login' onClick={()=>{
            changeLogin()
           }}>Login Here</span></p>}
         </Stack>
     </Stack>
     <Stack width={_500?"0%":"50%"} 
     height={'100vh'}
      sx={
        {
            backgroundImage:'url("register_side.png")',
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover'
        }
      }
     >
        
     </Stack>
    </Stack>
  )
}

export default Register
