import React from "react";
import { motion } from "framer-motion";
import { FaChalkboardTeacher } from "react-icons/fa";
import { Avatar } from "@mui/material";
import "./NavbarTeacher.css";

const NavbarTeacher = () => {
  return (
    <>
      <motion.div 
        className="nav-teacher"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="logo-section"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FaChalkboardTeacher className="logo-icon" />
          <h1 className="title">Teacher Dashboard</h1>
        </motion.div>

        <motion.div 
          className="avatar-wrapper"
          whileHover={{ scale: 1.1, rotate: 3 }}
        >
          <Avatar className="avatar" />
        </motion.div>
      </motion.div>

      <hr className="divider" />
    </>
  );
};

export default NavbarTeacher;
