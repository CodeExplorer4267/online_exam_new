import axios from "axios";
import React, { useEffect,useState } from "react";
import { useParams,useLocation} from "react-router-dom";

const StudentResultDetails = () => {
  const location=useLocation()
  const exam=location.state?.exam
  const { id } = useParams();
  const studentId = localStorage.getItem("userId")
  const [questions,setQuestions]=useState([])
  const [answers,setAnswers]=useState([])
  const [marks,setMarks]=useState(0)
  useEffect(()=>{
    //fetch detailed result using id and studentId
    const fetchResultsDetails=async()=>{
       try {
         const res=await axios.get('http://localhost:5000/online-exam/get-student-results/'+id+'/'+studentId)
         if(res.data.success){
            setQuestions(res.data.questions)
            setAnswers(res.data.answers)
            setMarks(res.data.marks)
         }
       } catch (error) {
         console.log("Error while fetching result details:",error)
       }
    }
    fetchResultsDetails()
  },[id,studentId])
  
  return (
    <div className="min-h-screen w-[83%] bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <button className="mb-4 text-sm text-indigo-400 hover:underline">
        ← Back to Results
      </button>

      <div className="max-w-4xl mx-auto bg-gray-800/80 backdrop-blur border border-gray-700 rounded-2xl p-6">
        <h1 className="text-2xl font-bold">{exam.title}</h1>
        <p className="text-gray-400">{exam.subject}</p>

        <div className="mt-6 grid sm:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-900 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Total Marks</p>
            <p className="text-xl font-semibold">{exam.totalMarks}</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Obtained</p>
            <p className="text-xl font-semibold text-green-400">
              {exam.obtainedMarks}
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Percentage</p>
            <p className="text-xl font-semibold text-indigo-400">
              {((exam.obtainedMarks / exam.totalMarks) * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        <h2 className="mt-8 mb-4 text-xl font-semibold">Detailed Evaluation</h2>

      </div>
    </div>
  );
};

export default StudentResultDetails;
