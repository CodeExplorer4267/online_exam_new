import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const AttemptedStudents = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await axios.get(
        `http://localhost:5000/online-exam/answers/attempted/${examId}`
      );
      setStudents(res.data?.students || []);
    };
    fetchStudents();
  }, [examId]);

  return (
    <div className="min-h-screen w-full bg-[#020617] px-6 py-10">
      <h1 className="text-center text-3xl font-bold text-cyan-400 mb-10">
         Students Who Attempted
      </h1>

      <div className="max-w-6xl mx-auto bg-[#0b1220] rounded-2xl shadow-xl border border-cyan-500/20 overflow-hidden">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-cyan-900/30 text-cyan-200">
            <tr>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Score</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((stu, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-700 hover:bg-cyan-500/10 transition text-center"
              >
                <td className="px-6 py-4 font-semibold text-white">
                  {stu.name}
                </td>
                <td className="px-6 py-4">{stu.email}</td>
                <td className="px-6 py-4 text-cyan-300 font-bold">
                  0
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full text-xs bg-green-500/20 text-green-400">
                    Submitted
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() =>
                      navigate(`/teacher/result/${examId}/${stu.student_id}`)
                    }
                    className="px-4 py-2 rounded-lg bg-cyan-500 text-black font-semibold hover:bg-cyan-400 transition"
                  >
                    View Result
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttemptedStudents;
