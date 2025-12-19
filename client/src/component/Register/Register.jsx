import React, { useState } from 'react'

const Register = () => {

  const [isLogin,setisLogin]=useState(false)
  

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
        <div className='flex flex-col justify-start items-center h-[500px] w-[400px] rounded-[20px] border border-cyan-500 p-5 gap-4' style={{
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
           rounded-xl'/></> : <></>
           }        
           <div className='text-white text-[16px] flex w-full justify-start'>
            Email
           </div>
           <input type="text" placeholder='Enter your email' className='w-full p-4 bg-black text-cyan-200 h-10
           rounded-xl'/>
           <div className='text-white text-[16px] flex w-full justify-between'>
            <p>Password</p>
            <p>Forgot your Password?</p>
           </div>
           <input type="text" placeholder='Enter your password' className='w-full p-4 bg-black text-cyan-200 h-10
           rounded-xl'/>
           {
             isLogin ? <button className='h-10 w-[120px] bg-black text-cyan-400 mt-3 rounded-[10px]'>Login</button> : <button className='h-10 w-[120px] bg-black text-cyan-400 mt-3 rounded-[10px]'>Sign Up</button>
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
