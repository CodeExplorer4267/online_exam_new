import { motion } from "framer-motion";
import { FaLaptopCode, FaUserGraduate, FaShieldAlt } from "react-icons/fa";
import { PiExamFill } from "react-icons/pi";
import { IoChatbubbles } from "react-icons/io5";
import { SiGoogledocs } from "react-icons/si";
const features = [
  {
    title:"Create Exams",
    desc:"Create exam with timers in just one click",
    icon:PiExamFill,
  },
  {
    title: "AI-Based Exams",
    desc: "Automatically generate smart questions using AI.",
    icon: FaLaptopCode,
  },
  {
    title: "Student Analytics",
    desc: "Track performance with real-time insights.",
    icon: FaUserGraduate,
  },
  {
    title: "Secure & Proctored",
    desc: "Advanced security to prevent malpractice.",
    icon: FaShieldAlt,
  },
  {
    title:"Chat",
    desc:"Realtime fast chat system with studnents for doubt resolve",
    icon:IoChatbubbles
  },
  {
    title:"Material",
    desc:"Easily upload and manage study materials in one secure place.",
    icon:SiGoogledocs
  },
];

const LandingPage = () => {
  return (
    <div className="bg-[#0b0b0f] text-white min-h-screen overflow-hidden">

      {/* 🔮 Background Glow */}
      <div className="absolute top-[-200px] left-[-200px] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[120px]" />

      {/* 🔝 Navbar */}
      <nav className="flex justify-between items-center px-10 py-6 relative z-10">
        <h1 className="text-2xl font-bold text-cyan-400">Examify</h1>
        <button className="px-6 py-2 rounded-full bg-cyan-500 text-black font-semibold hover:scale-105 transition">
          Login
        </button>
      </nav>

      {/* 🚀 Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 pt-20 relative z-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold leading-tight"
        >
          Smart Online <span className="text-cyan-400">Examination</span>
          <br /> Platform
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 text-gray-400 max-w-xl"
        >
          Conduct secure exams, evaluate students instantly, and manage everything
          from one powerful dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 flex gap-4"
        >
          <button className="px-8 py-3 rounded-full bg-cyan-500 text-black font-semibold hover:scale-110 transition">
            Get Started
          </button>
          <button className="px-8 py-3 rounded-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition">
            Live Demo
          </button>
        </motion.div>
      </section>

      {/* 🌟 Features Section */}
      <section className="mt-32 px-10 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16"
        >
          Powerful Features
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay:0.2 }}
              viewport={{ once: true }}
              className="bg-[#14141c] border border-cyan-500/20 rounded-2xl p-8 shadow-lg hover:shadow-cyan-500/30"
            >
              <item.icon className="text-cyan-400 text-4xl mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🎯 CTA Section */}
      <section className="mt-32 mb-20 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-linear-to-r from-cyan-500 to-blue-500 p-12 rounded-3xl inline-block"
        >
          <h2 className="text-3xl font-bold text-black">
            Ready to Transform Online Exams?
          </h2>
          <button className="mt-6 px-10 py-3 rounded-full bg-black text-cyan-400 font-semibold hover:scale-105 transition">
            Create Free Account
          </button>
        </motion.div>
      </section>
    </div>

  );
};



export default LandingPage;
