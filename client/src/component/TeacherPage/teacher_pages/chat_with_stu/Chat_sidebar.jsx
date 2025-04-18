import React, { useEffect, useState } from "react";
import "./Chat_sidebar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Chat_sidebar = () => {
  const [student, setStudent] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/online-exam/get-students")
      .then((res) => {
        setStudent(res.data.students);
      })
      .catch((err) => {
        console.log("Error while fetching students list");
      });
  }, []);

  const handleChat = (id) => {
    const studentId = id;
    const teacherId = localStorage.getItem("studentId");
    navigate(`/teacher/chat/${studentId}/${teacherId}`);
  };

  return (
    <>
      <div className="available-student-chat-container">
        <h3
          style={{
            textAlign: "center",
            color: "#00203FFF",
            fontSize: "25px",
          }}
        >
          Chats
        </h3>
        <div className="available-stu-list">
          {student.map((s, index) => {
            return (
              <>
                <div
                  className="available-stu"
                  onClick={() => handleChat(s.id)}
                  key={index}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt=""
                  />
                  <h4
                    style={{
                      fontSize: "17px",
                    }}
                  >
                    {s.username}
                  </h4>
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
