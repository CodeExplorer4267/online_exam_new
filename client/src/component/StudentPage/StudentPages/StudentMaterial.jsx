import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaDownload, FaFilePdf, FaFileAlt } from "react-icons/fa";

const StudentMaterials = () => {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/online-exam/get-all-materials")
      .then(res => setMaterials(res.data.files))
      .catch(err => console.error(err));
  }, []);

  const handleDownload=async(filename)=>{
     const res=await axios.get(`http://localhost:5000/online-exam/download/${filename}`,{
      responseType:'blob'
     })
     const url = window.URL.createObjectURL(new Blob([res.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  }

  return (
    <div className="min-h-screen bg-[#0b0b0f] p-8 w-[83%] text-white">
      {/* Page Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-center text-[#27e8e8] mb-10"
      >
        📚 Study Materials
      </motion.h1>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {materials.length ? (
          materials.map((mat, index) => (
            <motion.div
              key={mat.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#141414] rounded-xl p-6 border border-[#27e8e8]/20 
                         shadow-lg hover:shadow-[#27e8e8]/40 transition-all"
            >
              {/* File Icon */}
              <div className="flex items-center gap-4 mb-4">
                {mat.file_type === "pdf" ? (
                  <FaFilePdf className="text-red-500 text-3xl" />
                ) : (
                  <FaFileAlt className="text-blue-400 text-3xl" />
                )}
                <h3 className="text-lg font-semibold text-[#ADEFD1FF] truncate">
                  {mat.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                {mat.description || "No description provided"}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-xs text-gray-500">
                  Uploaded by: {mat.teacher_name}
                </span>

                <button
                  onClick={()=>handleDownload(mat.file_name)}
                  className="flex items-center gap-2 bg-[#27e8e8] text-black px-4 py-2 
                             rounded-lg font-semibold hover:opacity-90 transition cursor-pointer"
                >
                  <FaDownload/>
                  Download
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No materials available yet
          </p>
        )}
      </div>
    </div>
  );
};

export default StudentMaterials;
