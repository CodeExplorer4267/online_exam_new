import axios from 'axios';
import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import {motion} from 'framer-motion'
const EachAnswer = () => {
    const { examId, studentId } = useParams();
    const [answers, setAnswers] = useState([]);
    const [total,setTotal]=useState(0)
    const [evaluated,setevaluated]=useState({})

    const handleinputChange=(index,value,marks)=>{
       if(value < 0 || value > marks){
        alert("Please enter valid marks within the range")
        return
       }
       else{
          setevaluated((prev)=>({
            ...prev,
            [index]:Number(value)
          }))
       }
    }

    const handleGiveMarks=()=>{
         setTotal(Object.values(evaluated).reduce((acc,sum)=>acc+sum,0))
    }
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
    },[examId,studentId])

  return (
    <div className="min-h-screen bg-[#020617] px-3 py-10 w-full">
      {/* Page Title */}
      <h1 className="text-center text-3xl font-bold text-cyan-400 mb-10">
         Student Answer Sheet
      </h1>
      <div className='flex flex-col justify-start items-center gap-4'>
           {
       answers.map((ans,index)=>{
           return (
             <div className='flex flex-col gap-1 p-5 rounded-xl bg-[#0b1220] border border-cyan-500/20 shadow-xl w-[90%]' key={index}>
               <div className='flex flex-row items-center gap-2'>
                <p className='text-cyan-500 font-bold'>Q.{index+1}</p>
                <p className='text-white'>{ans.question_text}</p>
               </div>
               <p className='text-gray-500'>Student Answer</p>
               <div className='w-full p-2 text-cyan-500 bg-black rounded-md '>
                 {ans.answer}
               </div>
               <div className='flex flex-row justify-between items-center mt-2'>
                  <span className='rounded-2xl text-green-500 px-2 py-1  text-[14px] font-bold' style={{
                    backgroundColor:'rgba(48, 192, 64, 0.23)'
                  }}>Original Marks : {ans.marks}</span>
                  <div className='flex flex-row gap-2 items-center'>
                    <p className='text-gray-500'>Evaluate Marks:</p>
                    <input type="Number" className="border border-cyan-500/20 rounded-md bg-[#0b1220] text-white px-2 py-1 w-[100px]" onChange={(e)=>handleinputChange(index,e.target.value,ans.marks)}/>
                    <motion.button whileHover={{
                        scale:1.06
                    }} whileTap={{
                        scale:0.95,
                        transition:{type:'spring',stiffness:300}
                    }} className='bg-cyan-500 px-2 py-1 rounded-md' onClick={handleGiveMarks}>Give marks</motion.button>
                  </div>
                  
               </div>
             </div>
           )
       })
    }
      </div>
      <div className='mt-4 text-center'>
        <p className='text-white text-3xl'>Total Marks: {total}</p>
      </div>

    </div>
  )
}

export default EachAnswer
