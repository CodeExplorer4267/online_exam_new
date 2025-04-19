import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");
const Stuchat = () => {
  const { studentId, teacherId } = useParams();
  const [messages, setmessages] = useState([]);
  const userId = studentId;
  const [msg, setmsg] = useState("");
  const messageRef = useRef(null);

  useEffect(() => {
    socket.emit("register", userId); //register the user with the socket id
    socket.on("receive_message", (data) => {
      setmessages((prev) => [...prev, data]);
    });

    //fetch previous messages
    axios
      .get(
        `http://localhost:5000/online-exam/get-all-messages/${teacherId}/${studentId}`
      )
      .then((res) => {
        // console.log("Previous messages",res.data?.messages)
        setmessages(Array.isArray(res.data?.messages) ? res.data.messages : []);
      })
      .catch((err) => {
        console.log("Error while fetching messages", err);
      });
    // return socket.disconnect(); //cleanup function to disconnect the socket when the component unmounts
  }, [studentId, teacherId]);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className="student-chat-container">
        <h3 className="chat-heading">Chat with Teacher ID : {teacherId}</h3>
      </div>
    </>
  );
};

export default Stuchat;
