import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const StudentResultDetails = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  const studentId = localStorage.getItem("userId");

  const [exam, setExam] = useState(null);
  const [evaluation, setEvaluation] = useState([]);
  const [obtainedMarks, setObtainedMarks] = useState(null);
  const [isEvaluated, setIsEvaluated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResultDetails = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5000/online-exam/get-student-results/${examId}/${studentId}`
        );
        if (res.data.success) {
          setExam(res.data.exam);
          setEvaluation(res.data.evaluation);
          setObtainedMarks(res.data.obtainedMarks);
          setIsEvaluated(res.data.isEvaluated);
        }
      } catch (err) {
        console.log("Error while fetching result details:", err);
        setError(
          err.response?.data?.message || "Failed to fetch result details"
        );
      } finally {
        setLoading(false);
      }
    };
    if (studentId && examId) {
      fetchResultDetails();
    } else {
      setLoading(false);
      setError("Student ID or Exam ID is missing. Please login again.");
    }
  }, [examId]);

  // Calculate totals from per-question data
  const totalMaxMarks = evaluation.reduce((sum, q) => sum + (q.max_marks || 0), 0);
  const totalEvaluatedMarks = evaluation.reduce(
    (sum, q) => sum + (q.evaluated_marks ?? 0),
    0
  );
  const percentage =
    isEvaluated && exam?.total_marks
      ? ((totalEvaluatedMarks / exam.total_marks) * 100).toFixed(1)
      : null;

  const getMarksBadge = (evaluated, max) => {
    if (evaluated == null) return { bg: "bg-gray-700", text: "text-gray-400", label: "—" };
    const ratio = evaluated / max;
    if (ratio >= 0.8) return { bg: "bg-green-500/15", text: "text-green-400", label: `${evaluated}/${max}` };
    if (ratio >= 0.5) return { bg: "bg-yellow-500/15", text: "text-yellow-400", label: `${evaluated}/${max}` };
    if (ratio > 0) return { bg: "bg-orange-500/15", text: "text-orange-400", label: `${evaluated}/${max}` };
    return { bg: "bg-red-500/15", text: "text-red-400", label: `${evaluated}/${max}` };
  };

  const getGrade = (pct) => {
    if (pct >= 90) return { grade: "A+", color: "text-green-400" };
    if (pct >= 80) return { grade: "A", color: "text-green-400" };
    if (pct >= 70) return { grade: "B+", color: "text-cyan-400" };
    if (pct >= 60) return { grade: "B", color: "text-cyan-400" };
    if (pct >= 50) return { grade: "C", color: "text-yellow-400" };
    if (pct >= 40) return { grade: "D", color: "text-orange-400" };
    return { grade: "F", color: "text-red-400" };
  };

  if (loading) {
    return (
      <div className="min-h-screen w-[83%] bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-400">Loading result details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-[83%] bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="text-indigo-400 hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-[83%] bg-gradient-to-br from-black via-gray-900 to-black text-white p-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm text-indigo-400 hover:underline flex items-center gap-1"
      >
        <span>&#8592;</span> Back to Results
      </button>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Exam Header */}
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold">{exam?.name}</h1>
              <p className="text-gray-400 text-sm mt-1">
                Duration: {exam?.duration} minutes
              </p>
            </div>
            {isEvaluated && percentage && (
              <div className="flex items-center gap-3">
                <div
                  className={`text-4xl font-bold ${
                    getGrade(parseFloat(percentage)).color
                  }`}
                >
                  {getGrade(parseFloat(percentage)).grade}
                </div>
              </div>
            )}
          </div>

          {/* Summary Stats */}
          <div className="mt-6 grid sm:grid-cols-3 gap-4 text-center">
            <div className="bg-gray-900/80 rounded-xl p-4 border border-gray-700/50">
              <p className="text-gray-400 text-sm">Total Marks</p>
              <p className="text-2xl font-bold text-white mt-1">
                {exam?.total_marks}
              </p>
            </div>
            <div className="bg-gray-900/80 rounded-xl p-4 border border-gray-700/50">
              <p className="text-gray-400 text-sm">Obtained</p>
              {isEvaluated ? (
                <p className="text-2xl font-bold text-green-400 mt-1">
                  {totalEvaluatedMarks}
                </p>
              ) : (
                <p className="text-lg text-yellow-400 mt-1">Pending</p>
              )}
            </div>
            <div className="bg-gray-900/80 rounded-xl p-4 border border-gray-700/50">
              <p className="text-gray-400 text-sm">Percentage</p>
              {isEvaluated && percentage ? (
                <p
                  className={`text-2xl font-bold mt-1 ${
                    parseFloat(percentage) >= 50
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {percentage}%
                </p>
              ) : (
                <p className="text-lg text-yellow-400 mt-1">—</p>
              )}
            </div>
          </div>

          {/* Progress Bar */}
          {isEvaluated && percentage && (
            <div className="mt-5">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Score Progress</span>
                <span>
                  {obtainedMarks} / {exam?.total_marks}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    parseFloat(percentage) >= 80
                      ? "bg-gradient-to-r from-green-500 to-emerald-400"
                      : parseFloat(percentage) >= 50
                      ? "bg-gradient-to-r from-cyan-500 to-blue-400"
                      : parseFloat(percentage) >= 33
                      ? "bg-gradient-to-r from-yellow-500 to-orange-400"
                      : "bg-gradient-to-r from-red-500 to-rose-400"
                  }`}
                  style={{ width: `${Math.min(parseFloat(percentage), 100)}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Detailed Evaluation Section */}
        <div className="bg-gray-800/80 backdrop-blur border border-gray-700 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-1">Detailed Evaluation</h2>
          <p className="text-gray-500 text-sm mb-6">
            Question-by-question breakdown of your answers and marks
          </p>

          {!isEvaluated && (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 flex items-center gap-3">
              <span className="text-yellow-400 text-xl">&#9888;</span>
              <div>
                <p className="text-yellow-400 font-medium">
                  Evaluation Pending
                </p>
                <p className="text-gray-400 text-sm">
                  Your exam has been submitted but the teacher has not yet
                  evaluated your answers. Per-question marks will appear once
                  evaluation is complete.
                </p>
              </div>
            </div>
          )}

          {evaluation.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No questions found for this exam.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {evaluation.map((item, index) => {
                const badge = getMarksBadge(
                  item.evaluated_marks,
                  item.max_marks
                );
                const hasAnswer =
                  item.student_answer &&
                  item.student_answer.trim().length > 0;

                return (
                  <div
                    key={item.question_id || index}
                    className="bg-gray-900/60 border border-gray-700/60 rounded-xl p-5 hover:border-gray-600 transition"
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <span className="bg-indigo-500/20 text-indigo-400 font-bold text-sm px-2.5 py-1 rounded-lg shrink-0">
                          Q{index + 1}
                        </span>
                        <p className="text-white font-medium leading-relaxed">
                          {item.question_text}
                        </p>
                      </div>
                      <div
                        className={`${badge.bg} ${badge.text} font-bold text-sm px-3 py-1 rounded-lg shrink-0`}
                      >
                        {isEvaluated ? badge.label : `— / ${item.max_marks}`}
                      </div>
                    </div>

                    {/* Student Answer */}
                    <div className="ml-9">
                      <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-1.5">
                        Your Answer
                      </p>
                      <div
                        className={`p-3 rounded-lg border ${
                          hasAnswer
                            ? "bg-gray-800/80 border-gray-700/50 text-gray-300"
                            : "bg-red-500/5 border-red-500/20 text-red-400 italic"
                        }`}
                      >
                        {hasAnswer
                          ? item.student_answer
                          : "No answer provided"}
                      </div>

                      {/* Marks Detail */}
                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <span className="text-gray-500">
                          Max Marks:{" "}
                          <span className="text-cyan-400 font-medium">
                            {item.max_marks}
                          </span>
                        </span>
                        {isEvaluated && item.evaluated_marks != null && (
                          <>
                            <span className="text-gray-600">|</span>
                            <span className="text-gray-500">
                              Obtained:{" "}
                              <span
                                className={`font-medium ${
                                  item.evaluated_marks === item.max_marks
                                    ? "text-green-400"
                                    : item.evaluated_marks > 0
                                    ? "text-yellow-400"
                                    : "text-red-400"
                                }`}
                              >
                                {item.evaluated_marks}
                              </span>
                            </span>
                            {item.evaluated_marks === item.max_marks && (
                              <span className="text-green-400 text-xs font-medium bg-green-500/10 px-2 py-0.5 rounded-full">
                                Full Marks
                              </span>
                            )}
                            {item.evaluated_marks === 0 && (
                              <span className="text-red-400 text-xs font-medium bg-red-500/10 px-2 py-0.5 rounded-full">
                                No Marks
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>   
      </div>
    </div>
  );
};

export default StudentResultDetails;
