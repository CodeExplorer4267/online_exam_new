import React from "react";
import Chat_sidebar from "./Chat_sidebar";
import { Route, Router, Routes } from "react-router-dom";
import Chat from "./Chat";

const Chat_container = () => {
  return (
    <>
        <Chat_sidebar />
        <div style={{
          width:"61%"
        }}>
          <Routes>
            <Route path="/:studentId/:teacherId" element={<Chat />} />
          </Routes>
        </div>
    </>
  );
};

export default Chat_container;
