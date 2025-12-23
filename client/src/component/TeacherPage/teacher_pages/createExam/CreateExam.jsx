import React, { useRef, useState, useEffect } from "react";
import "./CreateExam.css";
import axios from "axios";
import { motion } from "framer-motion";

const CreateExam = () => {
  const [Name, setname] = useState(() => localStorage.getItem("Name") || "");
  const [duration, setduration] = useState(
    () => localStorage.getItem("duration") || ""
  );
  const [questions, setquestions] = useState(() => {
    const savedQuestions = localStorage.getItem("questions");
    return savedQuestions
      ? JSON.parse(savedQuestions)
      : [{ question_text: "", marks: 0 }];
  });
  // Load saved totalMarks or set default value
  const [totalMarks, setTotalMarks] = useState(() => {
    return Number(localStorage.getItem("totalMarks")) || 0;
  });
  const textarearef = useRef(null);
  const teacherId = localStorage.getItem("teacherId") || 1;
  const [startTime, setStartTime] = useState(
    () => localStorage.getItem("startTime") || ""
  );
  const [endTime, setEndTime] = useState(
    () => localStorage.getItem("endTime") || ""
  );

  useEffect(() => {
    if (textarearef.current) {
      textarearef.current.style.height = "auto"; // Reset height
      textarearef.current.style.height = `${textarearef.current.scrollHeight}px`; // Adjust to content
    }
  }, [questions.question_text]); // Runs when text changes

  useEffect(() => {
    localStorage.setItem("Name", Name);
  }, [Name]);
  useEffect(() => {
    localStorage.setItem("duration", duration);
  }, [duration]);

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  // Update localStorage whenever totalMarks changes
  useEffect(() => {
    localStorage.setItem("totalMarks", totalMarks);
  }, [totalMarks]);
  //start and end time
  useEffect(() => {
    localStorage.setItem("startTime", startTime);
  }, [startTime]);

  useEffect(() => {
    localStorage.setItem("endTime", endTime);
  }, [endTime]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] =
      field === "marks" ? parseInt(value, 10) || 0 : value;
    setquestions(updatedQuestions);

    // Recalculate total marks
    const total = updatedQuestions.reduce((sum, q) => sum + q.marks, 0);
    setTotalMarks(total);
  };
  const addQuestions = () => {
    setquestions([...questions, { question_text: "", marks: 0 }]);
  };

  const deleteQuestion = (index) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setquestions(updatedQuestions);

    // Recalculate total marks after deleting
    const newTotalMarks = updatedQuestions.reduce(
      (sum, q) => sum + Number(q.marks),
      0
    );
    setTotalMarks(newTotalMarks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!Name || !duration || questions.length === 0) {
      alert("Please fill all fields and add at least one question!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/online-exam/createExam",
        {
          Name,
          duration,
          total_Marks: totalMarks,
          questions,
        }
      );

      console.log("Exam Response:", res.data);

      if (res.data.success) {
        alert(res.data.message);
        resetForm(); // ✅ Reset form fields
      } else {
        alert("Exam creation failed.");
      }
    } catch (error) {
      console.error(
        "Error creating exam:",
        error.response?.data || error.message
      );
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
    <div className="min-h-screen w-full bg-white flex items-start justify-center py-10 px-4">
      <div
        className="w-full max-w-3xl bg-[#141414] backdrop-blur-md rounded-xl shadow-2xl p-8 
    border border-[#27e8e8]/20 animate-fadeIn"
      >
        {/* TITLE */}
        <h2 className="text-4xl font-bold text-center text-[#27e8e8] drop-shadow-md mb-6 tracking-wide">
          Create Exam
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Exam Name + Duration */}
          <div className="flex gap-4 max-sm:flex-col">
            <input
              type="text"
              value={Name}
              placeholder="Enter Exam Name"
              onChange={(e) => setname(e.target.value)}
              required
              className="flex-1 px-4 py-3 bg-[#1a1a1a] rounded-lg border border-[#27e8e8]/30 
            text-white placeholder-gray-400 focus:border-[#27e8e8] outline-none
            transition-all duration-300 shadow-md focus:shadow-[#27e8e855]"
              style={{
                // backgroundColor:'white',
                color: "gray",
                height: "40px",
                border: "1px solid #27e8e8",
              }}
            />
            <input
              type="number"
              value={duration}
              placeholder="Duration (minutes)"
              onChange={(e) => setduration(e.target.value)}
              required
              className="px-4 py-3 bg-[#1a1a1a] rounded-lg border border-[#27e8e8]/30 
            text-white placeholder-gray-400 focus:border-[#27e8e8] outline-none
            transition-all duration-300 shadow-md focus:shadow-[#27e8e855]"
              style={{
                // backgroundColor:'white',
                color: "gray",
                height: "40px",
                width: "400px",
                border: "1px solid #27e8e8",
              }}
            />
          </div>
          <div className="flex gap-4 max-sm:flex-col">
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
              className="flex-1 px-4 py-3 bg-[#1a1a1a] rounded-lg border border-[#27e8e8]/30 
    text-gray-400 outline-none"
              style={{ height: "40px", border: "1px solid #27e8e8" }}
            />

            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
              className="flex-1 px-4 py-3 bg-[#1a1a1a] rounded-lg border border-[#27e8e8]/30 
    text-gray-400 outline-none"
              style={{ height: "40px", border: "1px solid #27e8e8" }}
            />
          </div>

          {/* Questions Title */}
          <h3 className="text-center text-2xl font-semibold text-[#27e8e8] mt-1">
            Questions
          </h3>
          <div
            className="flex flex-col gap-4 overflow-y-auto pr-2"
            style={{ maxHeight: "300px" }}
          >
            {/* Question Blocks */}
            {questions.map((q, index) => (
              <div
                key={index}
                className="bg-[#141414] p-4 rounded-lg border border-[#27e8e8]/20 shadow-lg 
            hover:shadow-[#27e8e870] transition-all duration-300 animate-scaleIn"
              >
                <textarea
                  ref={textarearef}
                  placeholder="Question"
                  value={q.question_text}
                  rows={1}
                  onChange={(e) =>
                    handleQuestionChange(index, "question_text", e.target.value)
                  }
                  required
                  className="w-full bg-[#1a1a1a] text-white placeholder-gray-400 rounded-md p-3 
              border border-[#27e8e8]/30 focus:border-[#27e8e8] outline-none transition-all
              mb-3 resize-none shadow-inner"
                />
                <div className="flex items-center justify-between">
                  <p className="text-[#27e8e8]">Marks:</p>
                  <input
                    type="number"
                    placeholder="Marks"
                    value={q.marks}
                    required
                    onChange={(e) =>
                      handleQuestionChange(index, "marks", e.target.value)
                    }
                    className="w-40 bg-[#1a1a1a] text-white placeholder-gray-400 rounded-md p-3 
                border border-[#27e8e8]/30 focus:border-[#27e8e8] outline-none transition-all"
                  />

                  <motion.button
                    type="button"
                    onClick={() => deleteQuestion(index)}
                    className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white 
                shadow-md hover:shadow-red-500/50 transition-all duration-300"
                    whileHover={{
                      scale: 1.08,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                    whileTap={{
                      scale: 0.92,
                    }}
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Marks */}
          <h3 className="text-xl text-[#27e8e8] font-semibold text-center">
            Total Marks: {totalMarks}
          </h3>

          {/* Buttons */}
          <div className="flex justify-center gap-6 mt-4">
            <motion.button
              type="button"
              onClick={addQuestions}
              className="px-6 py-3 bg-[#27e8e8] text-black font-semibold rounded-lg shadow-md"
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 15px rgba(39, 232, 232, 0.7)",
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{
                scale: 0.92,
                boxShadow: "0px 0px 8px rgba(39, 232, 232, 0.5)",
              }}
            >
              Add Question
            </motion.button>

            <motion.button
              type="submit"
              className="px-6 py-3 bg-[#0ef09f] text-black font-semibold rounded-lg shadow-md"
              whileHover={{
                scale: 1.08,
                boxShadow: "0px 0px 15px rgba(14, 240, 159, 0.7)",
                transition: { type: "spring", stiffness: 300 },
              }}
              whileTap={{
                scale: 0.92,
                boxShadow: "0px 0px 8px rgba(14, 240, 159, 0.5)",
              }}
            >
              Create Exam
            </motion.button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateExam;
