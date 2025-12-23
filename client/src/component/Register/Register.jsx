import React, { useState } from 'react'
import axios from 'axios'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const navigate=useNavigate()
  const [isLogin,setisLogin]=useState(false)
  const [name,setname]=useState("");
  const [email,setemail]=useState("")
  const [role,setrole]=useState("")
  const [password,setpassword]=useState("")
 
  const handleSignUp=async(e)=>{
    e.preventDefault()
    try {
      const res=await axios.post('http://localhost:5000/online-exam/register',{
        name,
        email,
        role,
        password
      })

      

      if(res.status==201){
        
        if(res.data.role==='student'){
          toast.success(res.data.message)
          navigate('/student')
      }
      else if(res.data.role==='teacher'){
        toast.success(res.data.message)
         navigate('/teacher')
      }
      }
      else{
         toast.error(res.data.message)
      }  
      setname("")
      setemail("")
      setrole("")
      setpassword("")
    } catch (error) {
       toast.error('Server Error')
       console.log("Error:",error)
    }
  }

  const handleLogin=async(e)=>{
     e.preventDefault()
     try {
      const res=await axios.post('http://localhost:5000/online-exam/login',{
        email,
        password,
        role
      })
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("role",res.data.role)
      localStorage.setItem("userId",res.data.userId)
      
      if(res.status==201){
        toast.success(res.data.message)
      }
      else{
         toast.error(res.data.message)
      }
      if(res.data.role==='student'){
          navigate('/student')
      }
      else if(res.data.role==='teacher'){
         navigate('/teacher')
      }
      setemail("")
      setrole("")
      setpassword("")
    } catch (error) {
       toast.error('Server Error')
       console.log("Error:",error)
    }
  }
  
  return (
    <div className="relative min-h-screen w-full bg-[#0b0b0f] overflow-hidden">
      
      {/* Top blur */}
      <div className="
        absolute 
        w-[500px] h-[500px] 
        rounded-full 
        bg-cyan-800 
        -top-[200px] -left-[200px] 
        blur-[200px]
      " />

      {/* Bottom blur */}
      <div className="
        absolute 
        w-[500px] h-[500px] 
        rounded-full 
        bg-cyan-800 
        -bottom-[200px] -right-[200px] 
        blur-[200px]
      " />
       
       <div className='mx-auto mt-[50px] flex flex-col justify-center items-center gap-10'>
        <div className='font-extrabold'>
            <h1 className='text-5xl text-white'>
          Welcome to <span className='text-cyan-400'>Examify</span>
         </h1>
        </div>
        <div className='flex flex-col justify-start items-center h-[500px] w-[400px] rounded-[20px] border border-cyan-500 p-5 gap-2' style={{
          backgroundColor:'rgb(28, 27, 27)'
         }}>
           {
            isLogin ? <h1 className='text-white font-bold text-[20px]'>Login in your <span className='text-cyan-400'>account</span></h1> : <h1 className='text-white font-bold text-[20px]'>Create new <span className='text-cyan-400'>account</span></h1>
           }
           {
             !isLogin ?<> <div className='text-white text-[16px] flex w-full justify-start'>
            Name
           </div>
           <input type="text" placeholder='Enter your name' className='w-full p-4 bg-black text-cyan-200 h-10
           rounded-xl' onChange={(e)=>{
             setname(e.target.value)
           }}/></> : <></>
           }        
           <div className='text-white text-[16px] flex w-full justify-start'>
            Email
           </div>
           <input type="text" placeholder='Enter your email' className='w-full p-4 bg-black text-cyan-200 h-10
           rounded-xl' onChange={(e)=>{
              setemail(e.target.value)
           }}/>
           <div className='text-white text-[16px] flex w-full justify-start'>
            Role
           </div>
           <input type="text" placeholder='Teacher / Student' className='w-full p-4 bg-black text-cyan-200 h-10
           rounded-xl' onChange={(e)=>{
             setrole(e.target.value)
           }}/>
           <div className='text-white text-[16px] flex w-full justify-between'>
            <p>Password</p>
            <p>Forgot your Password?</p>
           </div>
           <input type="text" placeholder='Enter your password' className='w-full p-4 bg-black text-cyan-200 h-10
           rounded-xl' onChange={(e)=>{
              setpassword(e.target.value)
           }}/>
           {
             isLogin ? <button className='font-bold h-10 w-[120px] bg-cyan-400 text-black mt-3 rounded-[10px] shadow-[0_0_20px_rgba(34,211,238,0.6)]
    hover:shadow-[0_0_35px_rgba(34,211,238,0.9)]
    transition-all duration-300
    hover:scale-105
    active:scale-95' onClick={handleLogin}>Login</button> : <button className='font-bold h-10 w-[120px] bg-cyan-400 text-black mt-3 rounded-[10px] shadow-[0_0_20px_rgba(34,211,238,0.6)]
    hover:shadow-[0_0_35px_rgba(34,211,238,0.9)]
    transition-all duration-300
    hover:scale-105
    active:scale-95' onClick={handleSignUp}>Sign Up</button>
           }
           {
            isLogin ? <p className='text-white'>New User? <span className='text-cyan-300 cursor-pointer' onClick={()=>{
            setisLogin(false)
           }}>Register Here</span></p> : <p className='text-white'>Already have an account? <span className='text-cyan-300 cursor-pointer' onClick={()=>{
            setisLogin(true)
           }}>Login Here</span></p>
           }
         </div>
       </div>

    </div>
  )
}

export default Register
