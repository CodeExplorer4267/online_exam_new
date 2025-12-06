// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import { motion } from "framer-motion";

// export default function ChatAssistant() {
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content: "👋 Hi! I'm your exam assistant. How can I help you today?",
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const chatEndRef = useRef(null);

//   // Auto scroll to bottom
//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const newMessages = [...messages, { role: "user", content: input }];
//     setMessages(newMessages);
//     setInput("");

//     try {
//       const res = await axios.post("http://localhost:5000/online-exam/askme", {
//         question: input,
//       });

//       const botMessage = { role: "assistant", content: res.data.answer };
//       setMessages((prev) => [...prev, botMessage]);
//     } catch {
//       setMessages((prev) => [
//         ...prev,
//         { role: "assistant", content: "⚠️ Oops! Something went wrong." },
//       ]);
//     }
//   };

//   return (
//     <div className="flex flex-col h-[80vh] w-full max-w-[700px] mx-auto rounded-2xl shadow-2xl border border-gray-200 bg-gradient-to-br from-white to-blue-50 overflow-hidden p-[10px] mt-[20px]">
//       {/* Header */}
//       <div className="bg-blue-600 text-white text-lg font-semibold p-4 text-center shadow">
//         Exam AI Assistant
//       </div>

//       {/* Chat Window */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/70">
//         {messages.map((msg, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className={`max-w-[75%] p-3 rounded-2xl shadow ${
//               msg.role === "user"
//                 ? "ml-auto bg-blue-600 text-white rounded-br-none"
//                 : "mr-auto bg-gray-100 text-gray-800 rounded-bl-none"
//             }`}
//           >
//             {msg.content}
//           </motion.div>
//         ))}
//         <div ref={chatEndRef}></div>
//       </div>

//       {/* Input Box */}
//       <div className="p-4 bg-white border-t flex gap-2 items-center">
//         <input
//           type="text"
//           className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 "
//           placeholder="Ask me anything..."
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button
//           onClick={handleSend}
//           className="bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700 transition"
//         >
//           ➤
//         </button>
//       </div>
//     </div>
//   );
// }
