import React, { useState } from "react";
import "./StudentList.css";
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify'
import { MdOutgoingMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

const StudentList = () => {
  const [selectedYear, setSelectedYear] = useState("1st");
  const [students, setStudents] = useState([]);
  const yearButtons = ["1st", "2nd", "3rd", "4th"];
  return (
    <>
    <div className="student-list-wrapper">

      {/* YEAR SELECTOR */}
      <div className="year-selector">
        {yearButtons.map((year) => (
          <div
            key={year}
            className={`year-btn ${selectedYear === year ? "active" : ""}`}
            onClick={async()=>{
              setSelectedYear(year)
              let y=0;
              if(year==="1st") y=1
              else if(year==="2nd") y=2
              else if(year==="3rd") y=3
              else if(year==="4th") y=4
              const res=await axios.get(`http://localhost:5000/online-exam/getStudents/${y}`)
              if(res.status !==200){
                toast.error("Failed to fetch students");
              }
              setStudents(res.data.students)
            }}
          >
            {year} Year
          </div>
        ))}
      </div>

      {/* STUDENT LIST */}'
      <div className="w-[70%] flex flex-col gap-[12px] h-auto overflow-y-scroll mx-auto">
        {students.length===0 ? <div className="text-center mt-10 text-gray-500">No students found for {selectedYear} year</div> : students.map((student, index) => (
          <div
            key={index}
            className="flex justify-evenly items-center p-4 bg-[#141414] rounded-[10px] shadow-md text-[#7dbbff]"
            style={{
              fontSize:'14px'
            }}
          >
              <h3 className="font-bold">{student.name}</h3>
              <p className="font-bold flex items-center"><MdOutgoingMail style={{
                marginRight:'4px'
              }}/> {student.email}</p>
              <p className="font-bold flex items-center"><FaPhone style={{
                marginRight:'4px'
              }}/> {student.phone_no}</p>
              <button className="h-[40px] w-[100px] p-3 bg-[#46eaea] text-black rounded-[10px] text-[14px]" style={{
                fontWeight:'bold'
              }}>Send mail</button>
          </div>
        ))}
      </div>

    </div>
    <ToastContainer /> 
    </>
  );
};

export default StudentList;
