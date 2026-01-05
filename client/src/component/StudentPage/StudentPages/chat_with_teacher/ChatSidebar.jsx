import axios from "axios"
import React, { useEffect, useState } from "react"
import { Search } from "lucide-react"
import { useNavigate } from "react-router-dom"

const ChatSidebar = () => {
  const [teachers, setTeachers] = useState([])
  const [search, setSearch] = useState("")
  const [activeTeacher, setActiveTeacher] = useState(null)
  const navigate=useNavigate();
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/online-exam/get-teachers"
        )
        if (res.data.success) {
          setTeachers(res.data.teachers)
        }
      } catch (error) {
        console.log("Error fetching teachers:", error)
      }
    }
    fetchTeachers()
  }, [])


  return (
    <aside className="w-[30%] h-screen bg-[#0e1323] border-r border-white/10 flex flex-col text-white">

      {/* ===== Header ===== */}
      <div className="p-5 border-b border-white/10">
        <h2 className="text-xl font-semibold">Teachers</h2>
        <p className="text-xs text-gray-400 mt-1">
          Available for doubt solving
        </p>
      </div>

      {/* ===== Search ===== */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 bg-[#141a2e] rounded-xl px-3 py-2">
          <Search size={16} className="text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search teacher..."
            className="bg-transparent outline-none text-sm w-full text-gray-200 placeholder-gray-400"
          />
        </div>
      </div>

      {/* ===== Teacher List ===== */}
      <div className="flex-1 overflow-y-auto px-3 space-y-2 scrollbar-thin scrollbar-thumb-white/10">

        {teachers.length === 0 && (
          <p className="text-center text-gray-500 mt-6 text-sm">
            No teachers found
          </p>
        )}

        {teachers.map((teacher) => (
          <div
            key={teacher.id}
            onClick={() => {
              navigate(`/student/chat/${teacher.id}`)
              setActiveTeacher(teacher)
            }}
            className={`p-4 rounded-xl cursor-pointer transition-all
              ${
                activeTeacher?.id === teacher.id
                  ? "bg-blue-600/20 border border-blue-500"
                  : "hover:bg-white/5"
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-100">
                  {teacher.name}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Click to chat
                </p>
              </div>

              {/* Online Indicator (static for now) */}
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
          </div>
        ))}
      </div>
    </aside>
  )
}

export default ChatSidebar
