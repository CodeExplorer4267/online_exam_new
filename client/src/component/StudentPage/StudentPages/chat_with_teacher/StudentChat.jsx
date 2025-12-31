import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { Send, Search } from "lucide-react"

const StudentChat = () => {
  const [teachers, setTeachers] = useState([])
  const [activeTeacher, setActiveTeacher] = useState(null)
  const [messages, setMessages] = useState([])
  const [text, setText] = useState("")
  const chatEndRef = useRef(null)

  useEffect(() => {
    const fetchTeachers = async () => {
      const res = await axios.get(
        "http://localhost:5000/online-exam/get-teachers"
      )
      if (res.data.success) setTeachers(res.data.teachers)
    }
    fetchTeachers()
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const sendMessage = () => {
    if (!text.trim()) return
    setMessages([...messages, { sender: "me", text }])
    setText("")
  }

  return (
    <div className="w-[83%] h-screen bg-[#0b0f19] flex text-white overflow-hidden">

      {/* ================= LEFT SIDEBAR ================= */}
      <aside className="w-[26%] bg-[#0e1323] border-r border-white/10 flex flex-col">

        {/* Header */}
        <div className="p-5 border-b border-white/10">
          <h2 className="text-xl font-semibold">Teachers</h2>
        </div>

        {/* Search */}
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 bg-[#141a2e] rounded-xl px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Search teacher..."
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
        </div>

        {/* Teacher List */}
        <div className="flex-1 overflow-y-auto px-3 space-y-2">
          {teachers.map((t) => (
            <div
              key={t.id}
              onClick={() => {
                setActiveTeacher(t)
                setMessages([])
              }}
              className={`p-4 rounded-xl cursor-pointer transition-all
              ${
                activeTeacher?.id === t.id
                  ? "bg-blue-600/20 border border-blue-500"
                  : "hover:bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">{t.username}</p>
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Available for chat
              </p>
            </div>
          ))}
        </div>
      </aside>

      {/* ================= CHAT AREA ================= */}
      <section className="flex-1 flex flex-col">

        {/* Chat Header */}
        <div className="h-[72px] border-b border-white/10 flex items-center px-6 bg-[#0e1323]">
          {activeTeacher ? (
            <div>
              <h3 className="font-semibold text-lg">
                {activeTeacher.username}
              </h3>
              <p className="text-xs text-green-400">Online</p>
            </div>
          ) : (
            <p className="text-gray-400">
              Select a teacher to start chatting
            </p>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
          {!activeTeacher && (
            <div className="h-full flex items-center justify-center text-gray-500">
              👋 Start a conversation with a teacher
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`max-w-[60%] px-4 py-3 rounded-2xl text-sm
              ${
                msg.sender === "me"
                  ? "ml-auto bg-blue-600"
                  : "bg-white/10"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Input */}
        {activeTeacher && (
          <div className="h-[82px] border-t border-white/10 flex items-center gap-4 px-6 bg-[#0e1323]">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-[#141a2e] px-4 py-3 rounded-xl outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 p-3 rounded-xl transition"
            >
              <Send size={18} />
            </button>
          </div>
        )}
      </section>
    </div>
  )
}

export default StudentChat
