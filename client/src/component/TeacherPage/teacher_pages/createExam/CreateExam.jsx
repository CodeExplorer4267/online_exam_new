import React, { useRef, useState,useEffect } from 'react'
import "./CreateExam.css"
import axios from 'axios'


const CreateExam = () => {
  const [Name,setname]=useState(()=>localStorage.getItem('Name')|| "");
  const [duration,setduration]=useState(()=>localStorage.getItem('duration')|| "");
  const [questions, setquestions] = useState(() => {
    const savedQuestions = localStorage.getItem("questions");
    return savedQuestions ? JSON.parse(savedQuestions) : [{ question_text: "", answer: "", marks: 0 }];
  });
  // Load saved totalMarks or set default value
  const [totalMarks, setTotalMarks] = useState(() => {
    return Number(localStorage.getItem("totalMarks")) || 0;
  });
  const textarearef=useRef(null);
  
  useEffect(() => {
    if (textarearef.current) {
      textarearef.current.style.height = "auto"; // Reset height
      textarearef.current.style.height = `${textarearef.current.scrollHeight}px`; // Adjust to content
    }
  }, [questions.question_text]); // Runs when text changes
  
  useEffect(()=>{
    localStorage.setItem('Name',Name)
  },[Name])
  useEffect(()=>{
    localStorage.setItem('duration',duration)
  },[duration])

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  // Update localStorage whenever totalMarks changes
  useEffect(() => {
    localStorage.setItem("totalMarks", totalMarks);
  }, [totalMarks]);

  const handleQuestionChange = (index, field, value) => {
   const updatedQuestions = [...questions];
   updatedQuestions[index][field] = field === "marks" ? parseInt(value, 10) || 0 : value;
   setquestions(updatedQuestions);

   // Recalculate total marks
   const total = updatedQuestions.reduce((sum, q) => sum + q.marks, 0);
   setTotalMarks(total);
 };
 const addQuestions=()=>{
   setquestions([...questions,{question_text:"",answer:"",marks:0}])
 }

 const deleteQuestion=(index)=>{
  const updatedQuestions = questions.filter((_,i) => i !== index);
  setquestions(updatedQuestions);

  // Recalculate total marks after deleting
  const newTotalMarks = updatedQuestions.reduce((sum, q) => sum + Number(q.marks), 0);
  setTotalMarks(newTotalMarks);
 }

 
 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!Name || !duration || questions.length === 0) {
      alert("Please fill all fields and add at least one question!");
      return;
  }

  try {
      const res = await axios.post("http://localhost:5000/online-exam/createExam", {
          Name,
          duration,
          total_Marks: totalMarks,
          questions
      });

      console.log("Exam Response:", res.data);

      if (res.data.success) {
          alert(res.data.message);
          resetForm(); // ✅ Reset form fields
      } else {
          alert("Exam creation failed.");
      }
  } catch (error) {
      console.error("Error creating exam:", error.response?.data || error.message);
  }
};

//  Reset form after submission
const resetForm = () => {
  setname("");
  setduration("");
  setquestions([{ question_text: "", answer: "", marks: 0 }]);
  setTotalMarks(0);
  localStorage.clear();
};


  return ( 
    <div className='create_exam_container'>
       <h2 id='teacher_create_exam'>
          Create Exam
       </h2>
       <form onSubmit={handleSubmit}>
          <div className="exam_name_dur">
             <input type="text" value={Name} placeholder='Enter Exam Name' onChange={(e)=>setname(e.target.value)} required/>
             <input type="Number" value={duration} placeholder='Enter Exam Duration(minutes)' onChange={(e)=>setduration(e.target.value)} required/>
          </div>
        
          <h3 style={{
            textAlign: "center",
            fontSize:"1.7rem",
            color: "00203fff"
          }}>Questions</h3>
          {questions.map((q, index) => (
          <div key={index} className='question_container'>
            <textarea type="text" ref={textarearef} placeholder="Question" value={q.question_text} rows={2}
            style={{ resize: "none", width: "100%",borderRadius:"5px",padding:"3px"}}
            onChange={(e) => handleQuestionChange(index, "question_text", e.target.value)} required />
            <input type="text" placeholder="Answer" value={q.answer} onChange={(e) => handleQuestionChange(index, "answer", e.target.value)} required />
            <input
              type="number"
              placeholder="Enter Marks"
              value={q.marks}
              onChange={(e) => handleQuestionChange(index, "marks", e.target.value)}
              required
            />
            <button style={{
               height:"30px",
                width:"50px",
                backgroundColor:"#00203FFF",
                color:"#ADEFD1FF",
                borderRadius:"10px"
            }} onClick={()=>deleteQuestion(index)}>Delete</button>
          </div>
        ))}
        <h3 style={{
            textAlign: "center",
            fontSize:"1.4rem",
            color: "00203fff"
          }}>Total Marks: {totalMarks}</h3>
          <div className="btns">
          <button className='create_exam_btn' type='button' onClick={()=>{addQuestions()}}>Add Questions</button>
          <button className='create_exam_btn' type='submit'>Create Exam</button>
          </div>           
       </form>
    </div>
  )
}

export default CreateExam
