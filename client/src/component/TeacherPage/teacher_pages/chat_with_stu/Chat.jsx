import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");
const Chat = ({ userId, receiverId }) => {
  const [messages, setmessages] = useState([]);
  const [msg, setmsg] = useState("");
  const messageRef = useRef(null);

  useEffect(() => {
    socket.emit("register", userId); //register the user with the socket id
    socket.on("receive_message", (data) => {
      setmessages((prev) => [...prev, data]);
    });
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
      senderId: userId,
      receiverId,
      message: msg,
    };
    socket.emit("send_message", messageData); //emit the message to the server
    setmessages((prev) => [...prev, { ...messageData, timestamp: new Date() }]);
    setmsg("");
  };

  return (
    <div className="chat-container">
      <h3 className="chat-heading">Chat with user ID : {receiverId}</h3>
      <div
        ref={messageRef}
        style={{
          height: "500px",
          width: "500px",
          overflowY: "scroll",
          border: "1px solid gray",
          borderRadius: "20px",
          margin: "10px auto",
        }}
      >
        {messages.map((m, i) => (
          <p
            key={i}
            style={{ textAlign: m.senderId === userId ? "right" : "left" }}
          >
            {m.message}
          </p>
        ))}
      </div>
      <div className="send-message">
        <input
          value={msg}
          onChange={(e) => setmsg(e.target.value)}
          className="chat-input"
        />
        <button onClick={sendMessage} className="chat-send-btn">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
