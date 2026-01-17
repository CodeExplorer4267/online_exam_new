import React from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { io } from "socket.io-client";
import { useEffect } from 'react';

const socket = io("http://localhost:5000", {
  withCredentials: true
});

const Chatwindow = () => {
  const {teacherId,studentId}=useParams()
  const [messages,setmessages]=useState([])
  const [userMessage,setuserMessage]=useState("")

  useEffect(()=>{
     socket.emit("register",studentId)
  },[studentId])

 const handleSubmit = () => {
  if (!userMessage.trim()) return;

  const messageData = {
    senderId: studentId,
    receiverId: teacherId,
    message: userMessage
  };

  socket.emit("send_message", messageData);

  // show message instantly in UI
  setuserMessage("");
};


useEffect(() => {
  socket.on("receive_message", (msg) => {
    setmessages((prev) => [...prev, msg]);
  });

  return () => {
    socket.off("receive_message");
  };
}, []);


useEffect(()=>{
    const fetchMessages=async()=>{
       try {
          const res=await axios.get('http://localhost:5000/online-exam/get-all-messages/'+teacherId+'/'+studentId)
          if(res.data.success){
             setmessages(res.data.messages)
          }
          else{
              console.log("Failed to fetch messages")
          }
       } catch (error) {
          console.log("Error while fetching messages:",error)
       }
    }
    fetchMessages()
},[teacherId,studentId])

  return (
    <div className='w-[100%] flex flex-col justify-center items-center'>
       <h1 className='text-white text-3xl text-center mb-3'>Chat With Teacher</h1>
       <hr className='text-white w-[100%]'/>
       <div className='p-5 overflow-y-scroll h-[80vh] scrollbar-thin scrollbar-thumb-white/10 flex flex-col w-[90%] mt-3 mb-3'>
         {
            messages.length===0 ? (
              <p className='text-white text-center mt-5'>No messages yet. Start the conversation!</p>
            ):(
               messages.map((msg)=>{
                  const isMe=msg.sender_id.toString()===studentId.toString()
                  return (
        <div
          key={msg.id}
          className={`w-full flex mb-2 ${
            isMe ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[60%] px-4 py-2 rounded-2xl text-white ${
              isMe
                ? "bg-blue-500 rounded-br-none"
                : "bg-gray-700 rounded-bl-none"
            }`}
          >
            {msg.message}
          </div>
        </div>
      );
               })
            )
         }
       </div>
       <div className='w-[80%] flex justify-center items-center gap-4'>
           <input name="" id="" placeholder='Enter your message' className='text-white border-2 border-white/10 w-[80%] h-[45px] rounded-2xl px-4' value={userMessage} onChange={(e)=>{
              setuserMessage(e.target.value)
           }} autoFocus></input>
           <button className='bg-blue-500 w-[130px] h-[40px] rounded-2xl' onClick={handleSubmit}>Send Message</button>
       </div>
       
    </div>
  )
}

export default Chatwindow
