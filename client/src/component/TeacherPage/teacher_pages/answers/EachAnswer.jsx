import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

const EachAnswer = () => {
    const { examId, studentId } = useParams();
    const [answers, setAnswers] = useState([]);
    useEffect(()=>{
        const fetchAnswers=async()=>{
            try {
                const res=await axios.get(`http://localhost:5000/online-exam/answers/${examId}/${studentId}`)
                setAnswers(res.data?.answers || [])
            } catch (error) {
                console.error("Error while fetching answers:",error)
            }
        }
        fetchAnswers()
    })
  return (
    <div className='bg-[#020617] w-full min-h-screen'>
        <div className='overflow-x-auto flex flex-col gap-4 justify-start items-center p-5'>
            {
                answers.map((ans,index)=>{
                    return (
                       <div key={index} className='p-4 flex-col justify-start bg-[#0b1220] shadow-md w-[80%]'>
                            <h2 className='text-cyan-400 font-semibold mb-2'>Q{index+1}: {ans.question_text}</h2>
                       </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default EachAnswer
