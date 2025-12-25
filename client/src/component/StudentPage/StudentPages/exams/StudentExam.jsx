import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const StudentExam = () => {
  const [ongoing, setOngoing] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/online-exam/exams").then(res => {
      const now = new Date();

      const og = [];
      const up = [];

      res.data.exams.forEach(exam => {
        const start = new Date(exam.start_time);
        const end = new Date(exam.end_time);

        if (now >= start && now <= end) og.push(exam);
        else if (now < start) up.push(exam);
      });

      setOngoing(og);
      setUpcoming(up);
    });
  }, []);

  const ExamCard = ({ exam, active }) => (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="bg-[#141414] rounded-xl p-5 shadow-lg border border-[#1f1f1f]"
    >
      <h3 className="text-xl font-semibold text-[#ADEFD1FF]">
        {exam.name}
      </h3>

      <p className="text-gray-400 mt-2">
        ⏱ Duration: {exam.duration} mins
      </p>
      <p className="text-gray-400">
        📝 Total Marks: {exam.total_marks}
      </p>

      {active ? (
        <button
          onClick={() =>
            navigate(`/student/exam/${exam.id}`, {
              state: { duration: exam.duration }
            })
          }
          className="mt-4 w-full bg-[#00203FFF] text-[#ADEFD1FF] py-2 rounded-lg hover:opacity-90 transition"
        >
          Start Exam
        </button>
      ) : (
        <p className="mt-4 text-yellow-400 text-sm">Starts Soon</p>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#0b0b0f] p-8 text-white w-[83%]">
      <h1 className="text-3xl font-bold text-center text-[#ADEFD1FF] mb-10">
        Student Exams
      </h1>

      {/* Ongoing */}
      <section className="mb-14">
        <h2 className="text-xl mb-4">🟢 Ongoing Exams</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ongoing.length ? (
            ongoing.map(exam => (
              <ExamCard key={exam.id} exam={exam} active />
            ))
          ) : (
            <p className="text-gray-500">No ongoing exams</p>
          )}
        </div>
      </section>

      {/* Upcoming */}
      <section>
        <h2 className="text-xl mb-4">🕒 Upcoming Exams</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.length ? (
            upcoming.map(exam => (
              <ExamCard key={exam.id} exam={exam} />
            ))
          ) : (
            <p className="text-gray-500">No upcoming exams</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default StudentExam;
