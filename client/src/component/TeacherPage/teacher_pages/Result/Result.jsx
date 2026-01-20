import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import {motion} from "framer-motion";
import { useNavigate } from "react-router-dom";
const Result = () => {
  const [exams, setExams] = useState([]);

  const navigate=useNavigate()

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const res = await axios.get("http://localhost:5000/online-exam/exams");
        setExams(res.data?.exams || []);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);


  return (
    <div className="w-full bg-black p-5 min-h-screen flex flex-col gap-5">
      <h1 className="text-[#00e7ff] text-center font-bold text-3xl">
        Result Page
      </h1>
      <div className="overflow-auto-x">
        <table className="w-[60%] mx-auto text-white border border-gray-400 rounded-[20px] p-5">
          <thead className="bg-cyan-900/30 text-cyan-200 uppercase text-xs tracking-wider">
            <tr>
            <th className="px-2 py-2.5">Exam_Id</th>
            <th className="px-2 py-2.5">Exam_Name</th>
            <th className="px-2 py-2.5">Duration</th>
            <th className="px-2 py-2.5">Total_Marks</th>
            <th className="px-2 py-2.5">View</th>
            </tr>
          </thead>
          <tbody>
            {
               exams.length > 0 ? exams.map((exam,index)=>{
                   return (
                         <tr className={index % 2===0 ? "bg-[#03484f]" : "bg-[#020617]"}>
                            <td className="text-center px-2 py-2.5">{exam.id}</td>
                            <td className="text-center px-2 py-2.5">{exam.name}</td>
                            <td className="text-center px-2 py-2.5">{exam.duration}</td>
                            <td className="text-center px-2 py-2.5">{exam.total_marks}</td>
                            <td className="text-center px-2 py-2.5">
                              <motion.button whileHover={{
                                scale:1.08,
                                transition:{type:'spring', stiffness:300}
                              }} whileTap={{
                                 scale:0.95
                              }} className="bg-[#00e7ff] hover:bg-cyan-600 text-black px-4 py-1 rounded-md" onClick={()=>{
                                  navigate(`/teacher/result/${exam.id}`)
                              }}>
                                View
                              </motion.button>
                            </td>
                         </tr>                 
                   )
               }) : <tr><td colSpan="5" className="text-center py-4">No Exams Available</td></tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Result;
