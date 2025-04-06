import React, { useEffect, useState } from "react";
import "./EachStudentAnswer.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EachStudentAnswer = () => {
  const location = useLocation();
  const { student_name } = location.state;
  const [answers, setanswers] = useState([]);
  const { examId, studentId } = useParams();
  const [totalMarks, setTotalMarks] = useState(0);
  const [examTotalMarks, setExamTotalMarks] = useState(0);
  const navigate = useNavigate();
  const [IsSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/online-exam/marks-submit-or-not/${examId}/${studentId}`
      )
      .then((res) => {
        console.log("API Response:", res.data);
        if (res.data.marksSubmit[0].isSubmitted === 1) {
          setIsSubmitted(true);
          console.log("Marks already submitted for this student.");
        }
      })
      .catch((err) => {
        console.log("Error while fetching submission status", err);
      });
  }, [examId, studentId]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/online-exam/answers/${examId}/${studentId}`)
      .then((res) => {
        const updatedAnswers = res.data.answers.map((a) => ({
          ...a,
          marksGiven: 0,
        }));
        setanswers(updatedAnswers);

        // Calculate the total marks for the exam
        const total = updatedAnswers.reduce((sum, ans) => sum + ans.marks, 0);
        setExamTotalMarks(total); // Update the state for total marks of the exam
      })
      .catch((err) => {
        console.log("Error while fetching each student answer", err);
      });
  }, [examId, studentId]);

  const handleMarksForStudent = (e, index, totalMarks_for_each) => {
    const marks = parseInt(e.target.value);

    if (marks > totalMarks_for_each || marks < 0) {
      alert("You can't give more marks than the total marks or negative marks");
      return;
    }
    const updatedAnswers = [...answers];
    updatedAnswers[index].marksGiven = marks;
    setanswers(updatedAnswers);

    // Calculate total marks
    const total = updatedAnswers.reduce(
      (sum, ans) => sum + (ans.marksGiven || 0),
      0
    );
    setTotalMarks(total);
  };

  const handleSubmitMarks = () => {
    axios
      .post(`http://localhost:5000/online-exam/update-marks`, {
        studentId,
        examId,
        marks: totalMarks,
      })
      .then((res) => {
        alert(res.data.message);
        navigate(-1);
      })
      .catch((err) => {
        console.log("Error while submitting the marks", err);
      });
  };

  return (
    <>
      <div className="each_stu_ans_container">
        <h2 className="each_stu_ans_container_heading">
          Answers of student : {student_name}
        </h2>
        <table className="each_stu_ans_table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>TotalMarks</th>
              <th>Marks</th>
              <th>Submit Status</th>
            </tr>
          </thead>
          <tbody>
            {answers.map((a, index) => {
              return (
                <tr key={index}>
                  <td>{a.question_text}</td>
                  <td>{a.answer}</td>
                  <td>{a.marks}</td>
                  <td>
                    <input
                      type="text"
                      onChange={(e) => handleMarksForStudent(e, index, a.marks)}
                      disabled={IsSubmitted}
                    />
                  </td>
                  <td>
                    {IsSubmitted ? (
                      <button
                        style={{
                          backgroundColor: "#4CAF50",
                          color: "white",
                          border: "none",
                          padding: "10px 20px",
                          textAlign: "center",
                          textDecoration: "none",
                          display: "inline-block",
                          fontSize: "16px",
                          marginTop: "20px",
                          cursor: "pointer",
                          borderRadius: "10px",
                        }}
                      >
                        Marks Submitted
                      </button>
                    ) : (
                      <button
                        style={{
                          backgroundColor: "rgb(218, 51, 51)",
                          color: "white",
                          border: "none",
                          padding: "10px 20px",
                          textAlign: "center",
                          textDecoration: "none",
                          display: "inline-block",
                          fontSize: "16px",
                          marginTop: "20px",
                          cursor: "pointer",
                          borderRadius: "10px",
                        }}
                      >
                        Marks Not Submitted
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="marks_for_each_student">
          <p
            style={{
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Total marks for the Exam: {totalMarks} out of {examTotalMarks}
          </p>
        </div>
        <div className="submit_marks_btn">
          <button
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              padding: "10px 20px",
              textAlign: "center",
              textDecoration: "none",
              display: "inline-block",
              fontSize: "16px",
              marginTop: "20px",
              cursor: "pointer",
              borderRadius: "10px",
            }}
            onClick={handleSubmitMarks}
            disabled={IsSubmitted}
          >
            {IsSubmitted ? "Marks already submitted" : "Submit"}
          </button>
        </div>
      </div>
    </>
  );
};

export default EachStudentAnswer;
