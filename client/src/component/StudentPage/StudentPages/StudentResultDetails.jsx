import React from "react";

const StudentResultDetails = ({ exam, onBack }) => {
  const evaluation = [
    { question: "Q1: Explain Stack", marks: "8 / 10" },
    { question: "Q2: Queue Operations", marks: "9 / 10" },
    { question: "Q3: Linked List", marks: "7 / 10" },
    { question: "Q4: Trees", marks: "8 / 10" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      <button
        onClick={onBack}
        className="mb-4 text-sm text-indigo-400 hover:underline"
      >
        ← Back to Results
      </button>

      <div className="max-w-4xl mx-auto bg-gray-800/80 backdrop-blur border border-gray-700 rounded-2xl p-6">
        <h1 className="text-2xl font-bold">{exam.title}</h1>
        <p className="text-gray-400">{exam.subject}</p>

        <div className="mt-6 grid sm:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-900 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Total Marks</p>
            <p className="text-xl font-semibold">{exam.totalMarks}</p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Obtained</p>
            <p className="text-xl font-semibold text-green-400">
              {exam.obtainedMarks}
            </p>
          </div>
          <div className="bg-gray-900 rounded-xl p-4">
            <p className="text-gray-400 text-sm">Percentage</p>
            <p className="text-xl font-semibold text-indigo-400">
              {((exam.obtainedMarks / exam.totalMarks) * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        <h2 className="mt-8 mb-4 text-xl font-semibold">
          📝 Detailed Evaluation
        </h2>

        <div className="space-y-3">
          {evaluation.map((item, index) => (
            <div
              key={index}
              className="flex justify-between bg-gray-900 rounded-xl p-4"
            >
              <span>{item.question}</span>
              <span className="text-green-400 font-medium">
                {item.marks}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentResultDetails;
