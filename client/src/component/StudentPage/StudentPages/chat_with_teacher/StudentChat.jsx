import React, { useEffect, useState } from 'react'
import {io} from 'socket.io-client'
import ChatSidebar from './ChatSidebar';
import { Routes,Route} from 'react-router-dom';
import axios from "axios"

const socket = io("http://localhost:5000", {
  withCredentials: true,
});

const StudentChat = () => {
  const [messages,setMessages]=useState([])
  const studentId=localStorage.getItem("userId")
  const teacherId=1

  useEffect(()=>{
      const fetchMessages=async()=>{
        try {
          const res=await axios.get(`http://localhost:5000/online-exam/get-all-messages/${teacherId}/${studentId}`)
          if(res.status===200){
            setMessages(res.data.messages)
          } else{
            console.log("Failed to fetch messages from server")
          } 
        } catch (error) {
          console.log("Error while fetching messages:",error)
        }
  }
  fetchMessages()
  },[messages])

  useEffect(()=>{
     const studentId=localStorage.getItem("userId")
     socket.emit('register',studentId)
  },[])


  return (
     <>
     <div className=''>

     </div>
     </>
  )
}
  
export default StudentChat
