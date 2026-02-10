import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const StudentResult = () => {
  const [exams,setExams]=useState([])
  const navigate=useNavigate()
  useEffect(()=>{
      const fetchExams=async()=>{
         try {
           const res=await axios.get('http://localhost:5000/online-exam/exams')
           setExams(res.data.exams)
         } catch (error) {
           console.log("Error fetching exams:",error)
         }
      }
      fetchExams()
  },[])

  return (
    <div className="min-h-screen w-[83%] bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Your Exam Results
      </h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {exams?.map((exam) => (
          <div
            key={exam?.id}
            className="bg-gray-800/70 backdrop-blur border border-gray-700 rounded-2xl p-5 hover:scale-[1.02] transition"
          >
            <h2 className="text-xl font-semibold">{exam?.name}</h2>
            {/* <p className="text-sm text-gray-400 mt-1">{exam.subject}</p> */}

            <div className="mt-4 space-y-1 text-[15px]">
              <p>
                {/* <span className="text-gray-400">Marks:</span>{" "}
                <span className="text-green-400 font-semibold">
                  {exam.obtainedMarks}
                </span>{" "}
                / {exam.totalMarks} */}
                Exam Total Marks:{"  "}
                <span className="text-green-500">{exam?.total_marks}</span>
              </p>
              <p className="text-gray-400">
                Exam Created On: {exam?.created_at.slice(0,10)}
              </p>
            </div>

            <button
              onClick={() => navigate(`/student/result/${exam?.id}`,{
                 state:{exam}
              })}
              className="mt-5 w-full py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-600 hover:opacity-90 transition font-medium"
              
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentResult;
