import React, { useEffect, useState } from "react";
import "./Stuchat_sidebar.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Stuchat_sidebar = () => {
  const [teachers, setTeachers] = useState([]);
  const navigate=useNavigate()
  useEffect(() => {
    axios
      .get("http://localhost:5000/online-exam/get-teachers")
      .then((res) => {
        setTeachers(res.data.teachers);
      })
      .then((err) => {
        console.log("Error while fetching teachers list", err);
      });
  }, []);

  const handleChatWithTeacher = (id) => {
    const teacherId = id;
    const studentId = localStorage.getItem("studentId");
    navigate(`/student/chat/${studentId}/${teacherId}`);
  }

  return (
    <>
      <div className="stuchat-sidebar-container">
        <h3 className="stuchat-heading">Chats</h3>
        <div className="available-teacher-chats">
          {teachers.map((t, index) => (
            <>
            <div className="available-teacher" key={index} onClick={()=>handleChatWithTeacher(t.id)}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                alt=""
              />
              <h4
                style={{
                  fontSize: "17px",
                }}
              >
                {t.username}
              </h4>
            </div>
            <hr />
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default Stuchat_sidebar;
