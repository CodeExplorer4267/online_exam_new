import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import io from "socket.io-client";
import axios from "axios";
import { useParams } from "react-router-dom";
const socket = io.connect("http://localhost:5000");
const Chat = () => {
  const { studentId, teacherId } = useParams();
  const [messages, setmessages] = useState([]);
  const userId=teacherId;
  const [msg, setmsg] = useState("");
  const messageRef = useRef(null);
  useEffect(() => {
    socket.emit("register", userId); //register the user with the socket id
    socket.on("receive_message", (data) => {
      setmessages((prev) => [...prev, data]);
    });

    //fetch previous messages
    axios.get(`http://localhost:5000/online-exam/get-all-messages/${teacherId}/${studentId}`)
    .then((res)=>{
      console.log("Previous messages",res.data?.messages)
      setmessages(Array.isArray(res.data?.messages) ? res.data.messages : []);
    })
    .catch((err)=>{
      console.log("Error while fetching messages",err)
    })
    // return socket.disconnect(); //cleanup function to disconnect the socket when the component unmounts
  }, [studentId,teacherId]);
  
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (msg.trim() === "") {
      return;
    }
    const messageData = {
      senderId: teacherId,
      receiverId:studentId,
      message: msg,
    };
    socket.emit("send_message", messageData); //emit the message to the server
    setmessages((prev = []) => [...prev, { ...messageData, timestamp: new Date() }]);
    setmsg("");
  };
  return (
    <div className="chat-container">
      <h3 className="chat-heading">Chat with user ID : {studentId}</h3>
      <div
        ref={messageRef}
        style={{
          height: "500px",
          width: "700px",
          overflowY: "scroll",
          border: "1px solid gray",
          borderRadius: "20px",
          margin: "10px auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px",
          backgroundColor: "#f0f2f5"
        }}
      >
        {messages?.map((m, i) => {
          const isSender = (m.senderId?.toString() === teacherId?.toString()) || (m.sender_id?.toString() === teacherId?.toString());

          return (
            <div
              key={i}
              style={{
                alignSelf: isSender ? "flex-end" : "flex-start",
                backgroundColor: isSender ? "#dcf8c6" : "#ffffff",
                padding: "10px 15px",
                borderRadius: "15px",
                maxWidth: "70%",
                boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                wordWrap: "break-word",
                position: "relative"
              }}
            >
              {m.message}
            </div>
          );
        })}
      </div>
      <div className="send-message" style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <input
          value={msg}
          onChange={(e) => setmsg(e.target.value)}
          className="chat-input"
          style={{
            padding: "10px",
            width: "60%",
            borderRadius: "20px",
            border: "1px solid #ccc",
            marginRight: "10px"
          }}
        />
        <button
          onClick={sendMessage}
          className="chat-send-btn"
          style={{
            padding: "10px 20px",
            borderRadius: "20px",
            backgroundColor: "#0b93f6",
            color: "#fff",
            border: "none",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
  
};

export default Chat;
