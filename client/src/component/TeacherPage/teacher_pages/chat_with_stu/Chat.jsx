import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import io from "socket.io-client";
import axios from "axios";
const socket = io.connect("http://localhost:5000");
const Chat = () => {
  const { studentId, teacherId } = useParams();
  const [messages, setmessages] = useState([]);
  const [msg, setmsg] = useState("");
  const messageRef = useRef(null);

  useEffect(() => {
    socket.emit("register", teacherId); //register the user with the socket id
    socket.on("receive_message", (data) => {
      setmessages((prev) => [...prev, data]);
    });

    //fetch previous messages
    axios.get(`http://localhost:5000/online-exam/get-all-messages/${teacherId}/${studentId}`)
    .then((res)=>{
      setmessages(res.data.messages)
    })
    .catch((err)=>{
      console.log("Error while fetching messages",err)
    })
    // return socket.disconnect(); //cleanup function to disconnect the socket when the component unmounts
  }, []);

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
    setmessages((prev) => [...prev, { ...messageData, timestamp: new Date() }]);
    setmsg("");
  };
  return (
    <div className="chat-container">
      <h3 className="chat-heading">Chat with user ID : {studentId}</h3>
      <div
        ref={messageRef}
        style={{
          height: "500px",
          width: "500px",
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
        {messages.map((m, i) => {
          const isSender = m.sender_id === teacherId;
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
