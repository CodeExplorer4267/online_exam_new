import React from "react";
import { PiStudentFill } from "react-icons/pi";
import { Avatar } from "@mui/material";
import { FaChalkboardUser } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify"
const NavbarStudent = () => {
  const [profileEdit, setprofileEdit] = useState(false);
  const [year,setYear]=useState(0)
  const [phone,setPhone]=useState("")
  const studentId=localStorage.getItem("userId")
  const updateProfile=async()=>{
      try {
        const res=await axios.put("http://localhost:5000/online-exam/student/update-profile",{
          year:year,
          phone:phone,
          id:studentId
        })
        if(res.status===200){
           toast.success(res.data.message)
            setprofileEdit(false)
        }
        else{
           toast.error("Failed to update profile")
        }
      } catch (error) {
         console.log("Error updating profile:", error);
      }
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full h-[100px] bg-[#141414] text-[#7dbbff] flex justify-between items-center px-20 py-10"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex justify-center items-center gap-5"
        >
          <FaChalkboardUser
            style={{
              color: "#7dbbff",
            }}
            size={50}
          />
          <span className="text-white font-bold text-[30px]">
            Student Dashboard
          </span>
        </motion.div>
        <motion.div className="rounded-full w-10 h-auto flex justify-center">
          <Avatar
            className="border-2 border-[#7dbbff]"
            style={{
              height: "50px",
              width: "50px",
            }}
            onClick={() => setprofileEdit(!profileEdit)}
          />
          {profileEdit && (
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
              <div className="h-[300px] w-[300px] rounded-[20px] flex flex-col items-center gap-6 p-6 bg-[#0b0b0f] relative">
                <div className="flex justify-center items-center gap-10">
                  <h2 className="text-cyan-400 font-bold">Update Profile</h2>
                  <span
                    className="text-cyan-400 font-bold text-xl cursor-pointer absolute top-2 right-4"
                    onClick={() => setprofileEdit(false)}
                  >
                    X
                  </span>
                </div>
                <div className="flex flex-col gap-6">
                  <input type="text" placeholder="Update your year" className="h-10 w-full bg-black p-3 rounded-[10px] text-cyan-400" onChange={(e)=>{
                     setYear(e.target.value)
                  }}/>
                  <input type="text" placeholder="Update your Phone No." className="h-10 w-full bg-black p-3 rounded-[10px] text-cyan-400" onChange={(e)=>{
                     setPhone(e.target.value)
                  }}/>
                </div>
                <button className="h-[30px] w-[100px] bg-cyan-400 font-bold p-1 rounded-[10px] text-black" onClick={()=>{
                   updateProfile()
                }}>Submit</button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

export default NavbarStudent;
