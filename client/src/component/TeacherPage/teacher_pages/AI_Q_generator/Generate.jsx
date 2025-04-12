import React from "react";
import { useState } from "react";
import axios from "axios";
const Generate = () => {
  const [topic, setTopic] = useState("");
  const [totalmarks, setTotalMarks] = useState(0);
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionPaper, setQuestionPaper] = useState("");

  const handleGenerate = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/online-exam/generate",
        {
          topic: topic,
          totalmarks: totalmarks,
          difficulty: difficulty,
        }, // This is the request body
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Configuration goes here
        }
      );
      setQuestionPaper(res.data.questionPaper);
    } catch (error) {
      console.log("Error while generating question paper:", error.message);
    }
  };
  return (
    <>
      <div
        className="question_generate_container"
        style={{
          width: "81%",
        }}
      >
        <h2 style={{
          fontSize: "30px",
          fontWeight: "bold",
          textAlign:"center"
        }}>AI Question Generator</h2>
        <div className="question" style={{
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center",
          gap:"20px",
          width:"50%",
          margin:"10px auto"
        }}>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic"
            style={{
              width:"60%"
            }}
          />
          <input
            type="number"
            value={totalmarks}
            onChange={(e) => setTotalMarks(Number(e.target.value))}
            style={{
              width:"60%"
            }}
          />
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={{
              width: "102px",
              backgroundColor: "#00203F",
              color: "#ADEFD1",
              height: "40px",
              padding:"11px",
              borderRadius:"16px",
              fontWeight: "bold"
            }}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
          <button onClick={handleGenerate} style={{
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
          }}>Generate</button>
          <div
            className="response"
            style={{
              width: "100%",
              maxWidth: "700px",
              padding: "1rem",
              backgroundColor: "#00203F",
              color: "#ADEFD1",
              borderRadius: "8px",
              overflowX: "auto",
              whiteSpace: "pre-wrap", // important!
              wordWrap: "break-word", // optional but helpful
              marginTop: "20px",
            }}
          >
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                margin: 0,
              }}
            >
              {questionPaper}
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default Generate;
