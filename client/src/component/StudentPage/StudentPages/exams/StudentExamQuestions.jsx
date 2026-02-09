import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import {toast} from "react-toastify";
const StudentExamQuestions = () => {
  const { examId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const duration = state?.duration || 0;
  const EXAM_DURATION=duration*60;
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const studentId = localStorage.getItem("userId");
   
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);

   const STORAGE_KEY = `exam_${examId}_startTime`;

   const getRemainingTime = () => {
    const startTime = localStorage.getItem(STORAGE_KEY);

    if (!startTime) {
      const now = Date.now();
      localStorage.setItem(STORAGE_KEY, now);
      return EXAM_DURATION;
    }

    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    return Math.max(EXAM_DURATION - elapsed, 0);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/online-exam/exam/${examId}`)
      .then(res => setQuestions(res.data.questions));
  }, [examId]);

  // prevent refresh
  useEffect(() => {
    const warn = e => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  // timer
  useEffect(() => {
    setTimeLeft(getRemainingTime());

    const interval = setInterval(() => {
      const remaining = getRemainingTime();
      setTimeLeft(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        submitExam(true);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const submitExam = () => {
    const payload = Object.keys(answers).map(id => ({
      studentId,
      examId,
      questionId: id,
      ...answers[id]
    }));

    axios.post("http://localhost:5000/online-exam/submit-answers", {
      studentId,
      examId,
      answers: payload
    }).then(() => {
      toast.success("Exam submitted!");
      navigate("/student/exams");
    });
  };

  const format = s =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(
      s % 60
    ).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-[#0b0b0f] text-white px-6 py-5 w-[83%]">
      {/* Timer */}
      <div className="fixed top-0 left-0 right-0 bg-[#141414] py-4 text-center shadow-md z-50">
        <p className="text-lg text-[#ADEFD1FF]">
          ⏳ Time Left: {format(timeLeft)}
        </p>
      </div>

      <h2 className="text-2xl text-center text-[#ADEFD1FF] mb-8">
        Exam {examId}
      </h2>

      <div className="space-y-6 max-w-4xl mx-auto">
        {questions.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#141414] p-5 rounded-xl"
          >
            <p className="mb-2">
              <span className="text-[#ADEFD1FF] font-semibold">
                {i + 1}.
              </span>{" "}
              {q.question_text}
              <span className="float-right text-sm text-gray-400">
                {q.marks} marks
              </span>
            </p>

            <textarea
              rows="3"
              className="w-full bg-[#0b0b0f] p-3 rounded-lg outline-none text-white"
              placeholder="Type your answer..."
              onChange={e =>
                setAnswers({
                  ...answers,
                  [q.id]: {
                    questionText: q.question_text,
                    answer: e.target.value,
                    marks: q.marks
                  }
                })
              }
            />
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={submitExam} 
          className="bg-[#00203FFF] text-[#ADEFD1FF] px-8 py-3 rounded-lg hover:opacity-90"
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
};

export default StudentExamQuestions;
