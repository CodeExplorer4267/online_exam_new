import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentAnswers.css";

const StudentAnswers = () => {
  const { examId } = useParams();
  const studentId=localStorage.getItem("studentId")
  const navigate = useNavigate();
  const [answers,setAnswers]=useState([{}])
  const [marks, setMarks] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/online-exam/answers/${examId}`)
      .then((response) => {
        setAnswers(response.data.answers);
      })
      .catch((error) => console.error("Error fetching answers:", error));
  }, [examId, studentId]);

  const handleSubmitMarks = () => {
    axios
      .post("http://localhost:5000/online-exam/update-marks", {
        studentId,
        examId,
        marks,
      })
      .then(() => {
        alert("Marks submitted successfully!");
        navigate(-1);
      })
      .catch((error) => console.error("Error submitting marks:", error));
  };

  return (
    <div className="student-answers-container">
      <h2>Student Answers</h2>
      <p>Exam ID: {examId} | Student ID: {studentId}</p>

      <table className="answers-table">
        <thead>
          <tr>
            <th>Question</th>
            <th>Answer</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {answers.map((answer) => (
            <tr key={answer.id}>
              <td>{answer.question_text}</td>
              <td>{answer.answer}</td>
              <td>
                <input
                  type="text"
                  className="marks-input"
                  value={answer.marks}
                />
              </td>
            </tr>
            
          ))}
        </tbody>
      </table>
      <div className="total-marks">
        <p>Total Marks <input type="text" style={{
          width:"45px"
        }} onChange={(e)=>{
           setMarks(e.target.value)
        }}/></p>
      </div>
      <button className="submit-marks-btn" onClick={handleSubmitMarks}>
        Submit Marks
      </button>
    </div>
  );
};

export default StudentAnswers;
