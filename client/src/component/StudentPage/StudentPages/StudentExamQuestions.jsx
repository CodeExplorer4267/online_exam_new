import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./StudentExamQuestions.css";

const StudentExamQuestions = () => {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const navigate=useNavigate()
  const [answers,setanswers]=useState([])
  const studentId=localStorage.getItem("studentId")
  const location=useLocation()
  const {exam_duration}=location.state || {}
  const [timer,settimer]=useState(exam_duration*60)
  useEffect(() => {
    axios
      .get(`http://localhost:5000/online-exam/exam/${examId}`)
      .then((res) => setQuestions(res.data.questions))
      .catch((err) => console.error("Error fetching questions:", err));
  }, [examId]);
  
  const handleAnswerChange = (questionId, questionText, marks, event) => {
    setanswers({
      ...answers,
      [questionId]: { questionText, answer: event.target.value, marks },
    });
  };

  //countdown timer
  useEffect(()=>{
    if(timer==0){
      handleSubmit()
    }
    const interval = setInterval(() => {
      settimer((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);  //The clearInterval function in JavaScript is used to stop a timer that was previously established by setInterval. In your code, it ensures that the interval timer is cleaned up when the component is unmounted or when the effect is re-run.
  },[timer])

  const handleSubmit = () => {
    const formattedAnswers = Object.keys(answers).map((questionId) => ({
      studentId,
      examId,
      questionText: answers[questionId].questionText,
      answer: answers[questionId].answer,
      marks: answers[questionId].marks,
      questionId
    }));

    axios
      .post("http://localhost:5000/online-exam/submit-answers", {
        studentId,
        examId,
        answers: formattedAnswers,
      })
      .then(() => {
        alert("Exam submitted successfully!");
        navigate(-1);
      })
      .catch((err) => console.error("Error submitting exam:", err));
  };

  // Format timer into MM:SS
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
// The formatTime function is used to convert a given time in seconds into a human-readable format of MM:SS (minutes and seconds). Here's a breakdown of how it works:

// The function takes a single parameter, seconds, which represents the total time in seconds.
// Calculate Minutes:

// Math.floor(seconds / 60):
// Divides the total seconds by 60 to get the number of full minutes.
// Math.floor ensures that any fractional part (e.g., 1.5 minutes) is rounded down to the nearest whole number.
// Calculate Remaining Seconds:

// seconds % 60:
// Uses the modulo operator to get the remainder when seconds is divided by 60.
// This gives the number of seconds left after accounting for the full minutes.
// Format as MM:SS:

// minutes.toString().padStart(2, "0"):
// Converts the minutes value to a string.
// Ensures that the string is at least 2 characters long by padding it with a leading 0 if necessary (e.g., 5 becomes 05).
// secs.toString().padStart(2, "0"):
// Does the same for the secs value, ensuring it is also formatted as 2 digits.
// Return the Result:

// Combines the formatted minutes and secs with a colon (:) in between to produce the final MM:SS string.

  return (
    <div className="exam-container">
      <h2 className="exam-title">Exam {examId} Questions</h2>

     {/* Timer Display */}
     <div className="timer-box">
        <h3>Time Left: {formatTime(timer)}</h3>
      </div>

      <div className="question-box">
        {questions.length > 0 ? (
          questions.map((q, index) => (
            <div key={q.id} className="question-card">
              <p className="question-text">
                <span className="question-number">{index + 1}.</span>{" "}
                {q.question_text}<span style={{
                  position:"absolute",
                  left:"80%"
                }}>Marks:{q.marks}</span>
              </p>
              <textarea type="text" className="answer-input" placeholder="Type your answer..." rows={2}  onChange={(e) => handleAnswerChange(q.id, q.question_text, q.marks, e)}/>
            </div>
          ))
        ) : (
          <p className="loading-text">Loading questions...</p>
        )}
      </div>
      <button style={{
        width:"100px",
        height:"35px",
        backgroundColor:"#00203FFF",
        color:"#ADEFD1FF",
        margin:"10px 0px",
        borderRadius:"10px",
        cursor:"pointer"
      }} onClick={()=>{
         handleSubmit()
      }} >Submit Exam</button>
    </div>
  );
};

export default StudentExamQuestions;
