import React from 'react'
import "./Chat.css"
import { io } from 'socket.io-client';
const socket = io("http://localhost:5000");
const Chat = () => {
  return (
    <div>
       This is for chatting
    </div>
  )
}

export default Chat
