import React, { useEffect, useState } from "react";
import "./Chat_sidebar.css";
import axios from "axios";
const Chat_sidebar = () => {
  const [student, setStudent] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/online-exam/get-students")
      .then((res) => {
        setStudent(res.data.students);
      })
      .catch((err) => {
        console.log("Error while fetching students list");
      });
  });

  return (
    <>
      <div className="available-student-chat-container">
        <h3>Chats</h3>
        <div className="available-stu-list">
          {student.map((s, index) => {
            return (
              <>
                <div className="available-stu">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt=""
                  />
                  <h4>{s.username}</h4>
                </div>
                <hr />
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Chat_sidebar;
