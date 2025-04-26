import React from "react";
import "./Material.css";
import { useRef } from "react";
import axios from "axios";
const Material = () => {
  const title = useRef();
  const name = useRef();
  const file = useRef();
  const handleUpload = async (e) => {
    try {
      e.preventDefault();
      if (!title.current.value || !name.current.value || !file.current.value) {
        alert("Please fill all the fields");
        return;
      }
      const formData = new FormData();
      formData.append("title", title.current.value);
      formData.append("name", name.current.value);
      formData.append("file", file.current.files[0]);

      const res = await axios.post(
        "http://localhost:5000/online-exam/upload-material".formData
      );
      if (res.data.success) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
      title.current.value = "";
      name.current.value = "";
      file.current.value = "";

      console.log("Response:", res.data);
    } catch (error) {
      console.log("Error:", error.message);
    }
  };
  return (
    <div className="material-container">
      <h1 id="material-heading">Upload Material</h1>
      <form action="">
        <input
          type="text"
          placeholder="Enter title of the material"
          className="material-input"
          ref={title}
        />
        <input
          type="text"
          placeholder="Enter Name"
          className="material-input"
          ref={name}
        />
        <input
          type="file"
          placeholder="Upload"
          className="material-input"
          ref={file}
        />
        <button id="material-upload-btn" onClick={handleUpload}>
          Upload
        </button>
      </form>
    </div>
  );
};

export default Material;
