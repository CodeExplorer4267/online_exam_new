
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Generate = () => {
  const [topic, setTopic] = useState("");
  const [totalmarks, setTotalMarks] = useState(0);
  const [difficulty, setDifficulty] = useState("Medium");
  const [questionPaper, setQuestionPaper] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setQuestionPaper(""); 

    try {
      const res = await axios.post(
        "http://localhost:5000/online-exam/generate",
        {
          topic,
          totalmarks,
          difficulty,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      setQuestionPaper(res.data.questionPaper);
    } catch (error) {
      setQuestionPaper("❌ Error generating question paper. Check console.");
      console.log("Error:", error.message);
    }

    setLoading(false);
  };

  return (
  <div className="w-[81%] mx-auto p-6 mt-5">

    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-4xl text-center font-extrabold text-[#27e8e8]"
    >
      AI Question Generator
    </motion.h2>

    {/* FLEX CONTAINER → FORM LEFT, OUTPUT RIGHT */}
    <div className="flex flex-col lg:flex-row gap-8 mt-10 justify-center">

      {/* LEFT: Form Section */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#141414] p-6 rounded-xl shadow-lg w-full lg:w-[45%]
                   border border-[#04364A]"
      >
        <div className="flex flex-col gap-5 items-center">

          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="text"
            value={topic}
            placeholder="Enter topic..."
            onChange={(e) => setTopic(e.target.value)}
            className="w-[90%] px-4 py-3 rounded-lg bg-[#002b45] border border-[#044868]
                       text-[#ADEFD1] focus:outline-none"
          />

          <motion.input
            whileFocus={{ scale: 1.03 }}
            type="number"
            value={totalmarks}
            placeholder="Total Marks..."
            onChange={(e) => setTotalMarks(Number(e.target.value))}
            className="w-[90%] px-4 py-3 rounded-lg bg-[#002b45] border border-[#044868]
                       text-[#ADEFD1]"
          />

          <motion.select
            whileFocus={{ scale: 1.03 }}
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-[50%] px-4 py-3 rounded-lg bg-[#044868] text-[#ADEFD1] font-semibold"
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </motion.select>

          <motion.button
            disabled={loading}
            onClick={handleGenerate}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-3 rounded-lg text-lg font-bold transition-all
            ${
              loading ? "bg-gray-600 cursor-not-allowed"
                      : "bg-[#0EF09F] text-black hover:bg-[#15ffae]"
            }`}
          >
            {loading ? "Generating..." : "Generate"}
          </motion.button>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 flex justify-center"
            >
              <div className="loader border-t-4 border-[#0EF09F] w-10 h-10 rounded-full animate-spin"></div>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* RIGHT: Generated Output */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-[#141414] p-5 rounded-xl shadow-lg w-full lg:w-[50%]
                   border border-[#044868] max-h-[500px] overflow-y-auto"
      >
        {questionPaper ? (
          <pre className="whitespace-pre-wrap text-[#27e8e8] text-sm">
            {questionPaper}
          </pre>
        ) : (
          <p className="text-[#7abdbf] text-center">
            Generated questions will appear here →
          </p>
        )}
      </motion.div>

    </div>
  </div>
);

};

export default Generate;
