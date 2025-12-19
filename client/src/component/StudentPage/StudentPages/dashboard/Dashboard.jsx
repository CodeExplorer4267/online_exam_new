import React from "react";
import { motion } from "framer-motion";
import {
  FaClipboardList,
  FaCheckCircle,
  FaClock,
  FaChartLine,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Exams",
    value: 12,
    icon: <FaClipboardList />,
    color: "from-cyan-400 to-blue-500",
  },
  {
    title: "Completed",
    value: 8,
    icon: <FaCheckCircle />,
    color: "from-green-400 to-emerald-500",
  },
  {
    title: "Upcoming",
    value: 4,
    icon: <FaClock />,
    color: "from-yellow-400 to-orange-500",
  },
  {
    title: "Avg Score",
    value: "82%",
    icon: <FaChartLine />,
    color: "from-pink-400 to-purple-500",
  },
];
 
const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-[#0b0f1a] text-white p-8 w-[83%]">
      
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-cyan-400">
          Welcome Back 👋
        </h1>
        <p className="text-gray-400">
          Track your exams, performance & progress
        </p>
      </motion.div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="relative bg-[#121826] rounded-xl p-6 shadow-lg border border-white/10"
          >
            <div
              className={`absolute inset-0 rounded-xl bg-gradient-to-r ${item.color} opacity-10`}
            />
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{item.title}</p>
                <h2 className="text-3xl font-bold mt-1">{item.value}</h2>
              </div>
              <div className="text-3xl text-cyan-400">{item.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* QUICK ACTIONS */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-10"
      >
        <h2 className="text-xl font-semibold mb-4 text-cyan-400">
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard
            title="Start Exam"
            desc="Attempt available exams"
            color="from-cyan-500 to-blue-600"
          />
          <ActionCard
            title="View Results"
            desc="Check detailed performance"
            color="from-green-500 to-emerald-600"
          />
          <ActionCard
            title="Study Materials"
            desc="Access uploaded resources"
            color="from-purple-500 to-pink-600"
          />
        </div>
      </motion.div>
    </div>
  );
};

const ActionCard = ({ title, desc, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`bg-gradient-to-r ${color} rounded-xl p-6 cursor-pointer shadow-lg`}
  >
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm text-white/80 mt-1">{desc}</p>
  </motion.div>
);

export default StudentDashboard;
