import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const StudentResult = () => {
  const [exams,setExams]=useState([])
  const [marksMap,setMarksMap]=useState({})
  const navigate=useNavigate()
  const studentId = localStorage.getItem("userId")

  useEffect(()=>{
      const fetchExams=async()=>{
         try {
           const res=await axios.get('http://localhost:5000/online-exam/exams')
           setExams(res.data.exams)
         } catch (error) {
           console.log("Error fetching exams:",error)
         }
      }
      const fetchAllMarks=async()=>{
         try {
           const res=await axios.get(`http://localhost:5000/online-exam/student-all-marks/${studentId}`)
           if(res.data.success){
              const map={}
              res.data.marks.forEach(m=>{
                 map[m.exam_id]= m
              })
              setMarksMap(map)
           }
         } catch (error) {
           console.log("Error fetching marks:",error)
         }
      }
      fetchExams()
      if(studentId) fetchAllMarks()
  },[studentId])

  const getStatus=(examId)=>{
     const m=marksMap[examId]
     if(!m) return { label:"Not Attempted", color:"text-gray-500" }
     if(m.isSubmitted) return { label:"Evaluated", color:"text-green-400" }
     return { label:"Pending Evaluation", color:"text-yellow-400" }
  }

  return (
    <div className="min-h-screen w-[83%] bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Your Exam Results
      </h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {exams?.map((exam) => {
          const marks=marksMap[exam?.id]
          const status=getStatus(exam?.id)
          const percentage = marks ? ((marks.obtained_marks / marks.total_marks) * 100).toFixed(1) : null

          return (
          <div
            key={exam?.id}
            className="bg-gray-800/70 backdrop-blur border border-gray-700 rounded-2xl p-5 hover:scale-[1.02] transition"
          >
            <h2 className="text-xl font-semibold">{exam?.name}</h2>
            <span className={`text-xs font-medium mt-1 inline-block ${status.color}`}>
              {status.label}
            </span>

            <div className="mt-4 space-y-2 text-[15px]">
              <p>
                Total Marks:{" "}
                <span className="text-cyan-400 font-semibold">{exam?.total_marks}</span>
              </p>
              {marks && marks.isSubmitted && (
                <>
                  <p>
                    Obtained:{" "}
                    <span className="text-green-400 font-semibold">{marks.obtained_marks}</span>
                    <span className="text-gray-400"> / {marks.total_marks}</span>
                  </p>
                  <p>
                    Percentage:{" "}
                    <span className={`font-semibold ${parseFloat(percentage) >= 50 ? 'text-green-400' : 'text-red-400'}`}>
                      {percentage}%
                    </span>
                  </p>
                </>
              )}
              <p className="text-gray-500 text-sm">
                Created: {exam?.created_at?.slice(0,10)}
              </p>
            </div>

            <button
              onClick={() => navigate(`/student/result/${exam?.id}`)}
              className="mt-5 w-full py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-600 hover:opacity-90 transition font-medium"
            >
              View Details
            </button>
          </div>
          )
        })}
      </div>
    </div>
  );
};

export default StudentResult;
