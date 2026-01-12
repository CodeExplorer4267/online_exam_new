import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { PiStudentFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const ChatSidebar = () => {

    const [students,setStudents]=useState([])
    const [activeStudent, setActiveStudent] = useState(null);
    const navigate=useNavigate()
    const teacherId=localStorage.getItem("userId")
    const [uniqueTeacherId,setUniqueTeacherId]=useState(null)

    const getUniqueId=async(id)=>{
      try {
        const res=await axios.get(`http://localhost:5000/online-exam/get-unique-id/${id}`)
        return res.data.uniqueId
      } catch (error) {
        console.log("Error while getting unique id:",error)
      }
    }

    useEffect(()=>{
      const fetchStudents=async()=>{
         try {
            const res=await axios.get("http://localhost:5000/online-exam/get-students")
            if(res.data.success){
                setStudents(res.data.students)
            }
            else{
                console.log(res.data.message)
            }
         } catch (error) {
            console.log("Error while fetching students:",error)
         }
      }
      fetchStudents()
    },[])

    useEffect(() => {
      const fetchTeacherUniqueId = async () => {
        try {
          const res = await axios.get(
            `http://localhost:5000/online-exam/get-unique-id/${teacherId}`
          );
          setUniqueTeacherId(res.data.uniqueId);
        } catch (error) {
          console.log("Error fetching teacher unique ID", error);
        }
      };
    
      fetchTeacherUniqueId();
    }, [teacherId]);

  return (
    <div className='w-[30%] h-screen bg-[#0f172a] border-r border-white/10 flex flex-col items-center'>
      <div className='flex w-full justify-center items-center'>
        <PiStudentFill size={40} className="text-[#62c4ff]"/>
        <h2 className='text-white text-2xl font-semibold m-4'>Students</h2>     
      </div>
      <hr className='text-[#62c4ff] w-[90%] '/>
      <div className='flex flex-col p-3 gap-3 w-full justify-center items-center overflow-y-scroll scrollbar-thin scrollbar-thumb-white/10 mt-2 text-white'>
        {
            students.length===0 ? (
                <p className='text-white text-center mt-5'>No students found</p>
            ):(
               students.map((stu)=>{
                 return <div key={stu.id} className={`w-[90%] border-white border h-[60px] flex justify-start items-center rounded-lg cursor-pointer hover:bg-white/10 pl-[30px] ${
                activeStudent?.id === stu.id
                  ? "bg-blue-600/20 border-2 border-blue-500"
                  : "hover:bg-white/5"
              }`} onClick={async()=>{
                    setActiveStudent(stu)
                    const id=await getUniqueId(stu.id)
                    navigate(`/teacher/chat/${id}/${uniqueTeacherId}`)
                 }}>
                  <FaUser size={20} className="text-[#62c4ff] mr-4"/>
                  <p>{stu.name}</p>
                 </div>
               })
            )
        }
      </div>
    </div>
  )
}

export default ChatSidebar
