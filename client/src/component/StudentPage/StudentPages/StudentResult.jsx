import React, { useState } from "react";

const exams = [
  {
    id: 1,
    title: "Data Structures Mid Term",
    subject: "DSA",
    totalMarks: 100,
    obtainedMarks: 82,
    publishedOn: "20 Jan 2026",
  },
  {
    id: 2,
    title: "Operating Systems Test",
    subject: "OS",
    totalMarks: 50,
    obtainedMarks: 41,
    publishedOn: "18 Jan 2026",
  },
];

const StudentResult = ({ onViewDetails }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        📊 Your Exam Results
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="bg-gray-800/70 backdrop-blur border border-gray-700 rounded-2xl p-5 hover:scale-[1.02] transition"
          >
            <h2 className="text-xl font-semibold">{exam.title}</h2>
            <p className="text-sm text-gray-400 mt-1">{exam.subject}</p>

            <div className="mt-4 space-y-1 text-sm">
              <p>
                <span className="text-gray-400">Marks:</span>{" "}
                <span className="text-green-400 font-semibold">
                  {exam.obtainedMarks}
                </span>{" "}
                / {exam.totalMarks}
              </p>
              <p className="text-gray-400">
                Published on: {exam.publishedOn}
              </p>
            </div>

            <button
              onClick={() => onViewDetails(exam)}
              className="mt-5 w-full py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition font-medium"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentResult;
