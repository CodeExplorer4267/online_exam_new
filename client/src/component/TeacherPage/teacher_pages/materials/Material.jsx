import React, { useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaCloudUploadAlt } from "react-icons/fa";

// Correct PDF worker for Vite
import "../../../../pdf-worker.js";
import * as pdfjs from "pdfjs-dist";

const Material = () => {
  const title = useRef();
  const name = useRef();
  const file = useRef();

  const [dragging, setDragging] = useState(false);
  const [previewName, setPreviewName] = useState("");
  const [loading, setLoading] = useState(false);
  const [pdfPreviewURL, setPdfPreviewURL] = useState(null);

  // Generate preview using canvas
  const generatePdfPreview = async (uploadedFile) => {
    const pdfURL = URL.createObjectURL(uploadedFile);
    const pdf = await pdfjs.getDocument(pdfURL).promise;
    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 1.1 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    await page.render({ canvasContext: context, viewport }).promise;
    setPdfPreviewURL(canvas.toDataURL());
  };

  const handleFileSelect = (e) => {
    const uploaded = e.target.files[0];
    if (!uploaded) return;

    setPreviewName(uploaded.name);

    if (uploaded.type === "application/pdf") {
      generatePdfPreview(uploaded);
    } else {
      setPdfPreviewURL(null);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!title.current.value || !name.current.value || !file.current.value) {
      alert("Please fill all the fields");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title.current.value);
      formData.append("teacher_name", name.current.value);
      formData.append("file", file.current.files[0]);

      const res = await axios.post(
        "http://localhost:5000/online-exam/upload-material",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert(res.data.message);

      title.current.value = "";
      name.current.value = "";
      file.current.value = "";
      setPreviewName("");
      setPdfPreviewURL(null);

    } catch (err) {
      alert("Error uploading material");
      console.log(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="w-[81%] mx-auto mt-6 p-4 text-[#ADEFD1]">

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center mb-10"
      >
        Upload Study Material
      </motion.h1>

      {/* Two Column Layout */}
      <div className="flex flex-col lg:flex-row gap-10">

        {/* LEFT — Upload Form */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#001722] border border-[#04364A] shadow-lg p-8 rounded-2xl w-full lg:w-[45%]"
        >
          <form onSubmit={handleUpload} className="flex flex-col gap-5">

            <input
              ref={title}
              type="text"
              placeholder="Enter material title"
              className="w-full px-4 py-3 rounded-lg bg-[#002b45] border border-[#044868] text-[#ADEFD1] focus:outline-none"
            />

            <input
              ref={name}
              type="text"
              placeholder="Enter teacher's name"
              className="w-full px-4 py-3 rounded-lg bg-[#002b45] border border-[#044868] text-[#ADEFD1] focus:outline-none"
            />

            <label
              className={`border-2 border-dashed rounded-xl py-10 cursor-pointer flex flex-col items-center
                ${dragging ? "bg-[#023049]" : "bg-[#00203F]"} border-[#0EF09F] transition`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);

                const dropped = e.dataTransfer.files[0];
                if (!dropped) return;

                file.current.files = e.dataTransfer.files;
                setPreviewName(dropped.name);

                if (dropped.type === "application/pdf") {
                  generatePdfPreview(dropped);
                } else {
                  setPdfPreviewURL(null);
                }
              }}
            >
              <FaCloudUploadAlt size={55} className="text-[#0EF09F]" />
              <p className="mt-3 text-lg">
                {previewName ? (
                  <span className="text-[#0EF09F]">{previewName}</span>
                ) : (
                  "Click or drag file to upload"
                )}
              </p>
              <input type="file" ref={file} className="hidden" onChange={handleFileSelect} />
            </label>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="w-full py-3 bg-[#0EF09F] text-black text-lg font-bold rounded-lg 
                         shadow hover:bg-[#17ffb0] transition disabled:bg-gray-600"
              type="submit"
            >
              {loading ? "Uploading..." : "Upload Material"}
            </motion.button>
          </form>
        </motion.div>

        {/* RIGHT — PDF Preview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-[#00203F] border border-[#044868] shadow-lg p-6 rounded-2xl w-full lg:w-[55%] min-h-[400px]"
        >
          <h2 className="text-2xl font-semibold mb-4 text-[#0EF09F]">Preview</h2>

          {pdfPreviewURL ? (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="mt-4 p-3 bg-[#002b45] rounded-lg border border-[#044868] flex justify-center"
  >
    <div className="max-h-[450px] overflow-auto rounded-lg">
      <img
        src={pdfPreviewURL}
        alt="PDF Preview"
        className="rounded-md shadow-lg w-[75%] mx-auto"
      />
    </div>
  </motion.div>
) : (
  <p className="text-[#7EC7C7] text-center opacity-70 mt-20">
    PDF Preview will appear here →
  </p>
)}

        </motion.div>

      </div>
    </div>
  );
};

export default Material;
