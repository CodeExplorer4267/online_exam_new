// import React, { useState,useEffect } from "react";
// import "./StudentList.css";
// import axios from 'axios'
// import {ToastContainer,toast} from 'react-toastify'
// import { MdOutgoingMail } from "react-icons/md";
// import { FaPhone } from "react-icons/fa6";
// import { FaRegWindowClose } from "react-icons/fa";


// const StudentList = () => {
//   const [selectedYear, setSelectedYear] = useState("1st");
//   const [students, setStudents] = useState([]);
//   const yearButtons = ["1st", "2nd", "3rd", "4th"];
//   const [mailFormVisible, setMailFormVisible] = useState(false);
  
//   const [senderEmail, setSenderEmail] = useState("");
//   const [recieverEmail, setRecieverEmail] = useState("");
//   const [emailSubject, setEmailSubject] = useState("");
//   const [emailBody, setEmailBody] = useState("");

//   const openMailForm=(studentEmail)=>{
//       setRecieverEmail(studentEmail);
//       setMailFormVisible(true);
//   }

//   const handleMailSubmit=async(e)=>{
//     e.preventDefault()
//       try {
        
//         const res=await axios.post('http://localhost:5000/online-exam/sendmail',{
//            senderEmail,
//            recieverEmail,
//            emailSubject,
//            emailBody
//         })
//         if(res.status===200){
//            toast.success(res.data.message)
//            setMailFormVisible(false);
//            setEmailSubject("");
//            setEmailBody("");
//         }
//         else{
//            toast.error(res.data.message)
//         }
//       } catch (error) {
//          toast.error("Error while submitting the form")
//       }
//   }
  
//   const fetchEnrollmentsByYear = async (year) => {
//   try {
//     const res = await axios.get(
//       `http://localhost:5000/online-exam/getStudents/${year}`
//     );
//     return res;
//   } catch (error) {
//     toast.error("Failed to fetch students");
//     return null;
//   }
// };

//   return (
//     <>
//     <div className="student-list-wrapper">

//       {/* YEAR SELECTOR */}
//       <div className="year-selector">
//         {yearButtons.map((year) => (
//           <div
//             key={year}
//             className={`year-btn ${selectedYear === year ? "active" : ""}`}
//             onClick={async()=>{
//               setSelectedYear(year)
//               let y=0;
//               if(year==="1st") y=1
//               else if(year==="2nd") y=2
//               else if(year==="3rd") y=3
//               else if(year==="4th") y=4
//               // const res=await axios.get(`http://localhost:5000/online-exam/getStudents/${y}`)
//               const res=fetchEnrollmentsByYear(y)
//               if(res.status !==200){
//                 toast.error("Failed to fetch students");
//               }
//               setStudents(res.data.students)
//             }}
//           >
//             {year} Year
//           </div>
//         ))}
//       </div>

//       {/* STUDENT LIST */}'
//       <div className="w-[70%] flex flex-col gap-3 h-auto overflow-y-scroll mx-auto">
//         {students.length===0 ? <div className="text-center mt-10 text-gray-500">No students found for {selectedYear} year</div> : students.map((student, index) => (
//           <div
//             key={index}
//             className="flex justify-evenly items-center p-4 bg-[#141414] rounded-[10px] shadow-md text-[#7dbbff] h-[50px]"
//             style={{
//               fontSize:'14px'
//             }}
//           >
//               <h3 className="font-bold">{student.name}</h3>
//               <p className="font-bold flex items-center"><MdOutgoingMail style={{
//                 marginRight:'4px'
//               }}/> {student.email}</p>
//               <p className="font-bold flex items-center"><FaPhone style={{
//                 marginRight:'4px'
//               }}/> {student.phone_no}</p>
//               <button className="h-8 w-[100px] p-1 bg-[#46eaea] text-black rounded-[10px] text-[14px]" style={{
//                 fontWeight:'bold'
//               }} onClick={()=>openMailForm(student.email)}>Send mail</button>
//           </div>
//         ))}
//       </div>
//     </div>

//     {
//   mailFormVisible && (
//     <div className="
//       fixed inset-0 flex items-center justify-center 
//       bg-black/60 backdrop-blur-sm z-50
//     ">
//       <div className="
//         w-[420px] p-6 rounded-2xl shadow-2xl 
//         bg-[#0d0d0d]/80 border border-[#3ce0e0]/40 
//         animate-scaleIn
//       ">
//         <h2 className="text-3xl font-semibold mb-4 text-[#96e0e4] tracking-wide">
//           Send Email
//         </h2>
//         <span className="text-white absolute top-30 left-[920px] cursor-pointer" onClick={()=>setMailFormVisible(false)}>X</span>
//         <form className="flex flex-col gap-3">

//           {/* Sender Email */}
//           <label className="text-[#96e0e4] text-sm font-medium">
//             Your Email
//           </label>
//           <input
//             id="senderEmail"
//             type="email"
//             placeholder="Enter sender email"
//             value={senderEmail}
//             onChange={(e) => setSenderEmail(e.target.value)}
//             className="
//                rounded-lg bg-[white] text-gray-900 
//               border border-[#3ce0e0]/30 focus:border-[#3ce0e0] 
//               outline-none transition"
//               style={{
//                  height:'40px',
//                  padding:'16px'
//               }}
//           />

//           {/* Receiver Email */}
//           <label className="text-[#96e0e4] text-sm font-medium">
//             Recipient's Email
//           </label>
//           <input
//             id="recieverEmail"
//             type="email"
//             placeholder="Enter receiver email"
//             value={recieverEmail}
//             onChange={(e) => setRecieverEmail(e.target.value)}
//             className="
//               p-2.5 rounded-lg bg-white text-gray-900 
//               border border-[#3ce0e0]/30 focus:border-[#3ce0e0] 
//               outline-none transition
//             "
//             style={{
//                  height:'40px',
//                  padding:'16px'
//               }}
//           />

//           {/* Subject */}
//           <label className="text-[#96e0e4] text-sm font-medium">
//             Subject
//           </label>
//           <input
//             id="subject"
//             type="text"
//             placeholder="Enter subject"
//             value={emailSubject}
//             onChange={(e) => setEmailSubject(e.target.value)}
//             className="
//               p-2.5 rounded-lg bg-white text-gray-900 
//               border border-[#3ce0e0]/30 focus:border-[#3ce0e0] 
//               outline-none transition
//             "
//             style={{
//                  height:'40px',
//                  padding:'16px'
//               }}
//           />

//           {/* Message */}
//           <label className="text-[#96e0e4] text-sm font-medium">
//             Message
//           </label>
//           <textarea
//             id="message"
//             placeholder="Type your message..."
//             rows="4"
//             value={emailBody}
//             onChange={(e) => setEmailBody(e.target.value)}
//             className="
//               p-3 rounded-lg bg-white text-gray-900
//               border border-[#3ce0e0]/30 focus:border-[#3ce0e0] 
//               outline-none transition resize-none
//             "
//           />

//           {/* Send Button */}
//           <button
//             className="
//               mt-4 px-5 py-2.5 rounded-xl
//               bg-[#46eaea] text-black font-semibold
//               hover:bg-[#32dcdc]
//               shadow-[0_0_15px_#46eaea80]
//               hover:shadow-[0_0_25px_#46eaea]
//               transition-all duration-300
//               w-fit self-center
//             "
//             onClick={handleMailSubmit}
//           >
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }


//     <ToastContainer /> 
//     </>
//   );
// };

// export default StudentList;


import React, { useEffect, useState } from "react";
import "./StudentList.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MdOutgoingMail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";

const StudentList = () => {
  const [selectedYear, setSelectedYear] = useState("1st");
  const [students, setStudents] = useState([]);

  const yearButtons = ["1st", "2nd", "3rd", "4th"];

  const [mailFormVisible, setMailFormVisible] = useState(false);
  const [senderEmail, setSenderEmail] = useState("");
  const [recieverEmail, setRecieverEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  // 🔹 YEAR MAPPING
  const yearMap = {
    "1st": 1,
    "2nd": 2,
    "3rd": 3,
    "4th": 4,
  };

  // 🔹 FETCH STUDENTS BY YEAR
  const fetchEnrollmentsByYear = async (year) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/online-exam/getStudents/${year}`
      );
      return res;
    } catch (error) {
      toast.error("Failed to fetch students");
      return null;
    }
  };

  //This is polling -> I use it to refresh the student list every 5 seconds
  useEffect(() => {
    let intervalId;

    const loadStudents = async () => {
      const year = yearMap[selectedYear];
      const res = await fetchEnrollmentsByYear(year);
      if (res?.status === 200) {
        setStudents(res.data.students);
      }
    };

    loadStudents(); 

    intervalId = setInterval(() => {
      loadStudents(); 
    }, 5000);

    return () => clearInterval(intervalId);
  }, [selectedYear]);

  const openMailForm = (studentEmail) => {
    setRecieverEmail(studentEmail);
    setMailFormVisible(true);
  };

  // 🔹 SEND MAIL
  const handleMailSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/online-exam/sendmail",
        {
          senderEmail,
          recieverEmail,
          emailSubject,
          emailBody,
        }
      );

      if (res.status === 200) {
        toast.success(res.data.message);
        setMailFormVisible(false);
        setEmailSubject("");
        setEmailBody("");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Error while sending mail");
    }
  };

  return (
    <>
      <div className="student-list-wrapper">

        {/* 🔹 YEAR SELECTOR */}
        <div className="year-selector">
          {yearButtons.map((year) => (
            <div
              key={year}
              className={`year-btn ${
                selectedYear === year ? "active" : ""
              }`}
              onClick={() => setSelectedYear(year)}
            >
              {year} Year
            </div>
          ))}
        </div>

        {/* 🔹 STUDENT LIST */}
        <div className="w-[70%] flex flex-col gap-3 h-auto overflow-y-scroll mx-auto">
          {students.length === 0 ? (
            <div className="text-center mt-10 text-gray-500">
              No students found for {selectedYear} year
            </div>
          ) : (
            students.map((student, index) => (
              <div
                key={index}
                className="flex justify-evenly items-center p-4 bg-[#141414] rounded-[10px] shadow-md text-[#7dbbff] h-[50px]"
                style={{ fontSize: "14px" }}
              >
                <h3 className="font-bold">{student.name}</h3>

                <p className="font-bold flex items-center">
                  <MdOutgoingMail className="mr-1" />
                  {student.email}
                </p>

                <p className="font-bold flex items-center">
                  <FaPhone className="mr-1" />
                  {student.phone_no}
                </p>

                <button
                  className="h-8 w-[100px] p-1 bg-[#46eaea] text-black rounded-[10px] text-[14px] font-bold"
                  onClick={() => openMailForm(student.email)}
                >
                  Send mail
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🔹 MAIL MODAL */}
      {mailFormVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
          <div className="w-[420px] p-6 rounded-2xl shadow-2xl bg-[#0d0d0d]/80 border border-[#3ce0e0]/40">
            <h2 className="text-3xl font-semibold mb-4 text-[#96e0e4]">
              Send Email
            </h2>

            <span
              className="text-white absolute top-5 right-5 cursor-pointer"
              onClick={() => setMailFormVisible(false)}
            >
              ✕
            </span>

            <form className="flex flex-col gap-3" onSubmit={handleMailSubmit}>
              <input
                type="email"
                placeholder="Your Email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                className="p-2 rounded-lg bg-white text-black"
                required
              />

              <input
                type="email"
                placeholder="Recipient Email"
                value={recieverEmail}
                readOnly
                className="p-2 rounded-lg bg-gray-200 text-black"
              />

              <input
                type="text"
                placeholder="Subject"
                value={emailSubject}
                onChange={(e) => setEmailSubject(e.target.value)}
                className="p-2 rounded-lg bg-white text-black"
                required
              />

              <textarea
                placeholder="Message"
                rows="4"
                value={emailBody}
                onChange={(e) => setEmailBody(e.target.value)}
                className="p-2 rounded-lg bg-white text-black resize-none"
                required
              />

              <button
                type="submit"
                className="mt-3 px-5 py-2 rounded-xl bg-[#46eaea] text-black font-bold self-center"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default StudentList;
