import pool from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



//register a new user
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!["student", "teacher"].includes(role)) {
    return res.status(400).json({ message: "Role must be student or teacher" });
  }

  try {
    const table = role === "student" ? "students" : "teachers";

    // Check existing user
    const [existing] = await pool.query(
      `SELECT id FROM ${table} WHERE email = ?`,
      [email]
    );

    if (existing.length > 0) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      `INSERT INTO ${table} (name, email, password, role) VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, role]
    );

    res.status(201).json({
      message: "Registration successful",
      userId: result.insertId,
      role,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// In register:

//  correctly validate username, email, password, role.

//  check if role is either "student" or "teacher".

// check if the user already exists (great job).

// hash the password with bcrypt before saving (perfect security).
// On success, you return userId and role

//login user

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "Email, password and role required" });
  }

  if (!["student", "teacher"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    const table = role === "student" ? "students" : "teachers";

    const [rows] = await pool.query(
      `SELECT * FROM ${table} WHERE email = ?`,
      [email]
    );

    if (rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      userId: user.id,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// You validate email and password.

// You check if user exists.

// You compare the entered password with hashed password using bcrypt.compare.

// You generate a JWT token (nice job for authentication).

// You return token, role, and studentId to the frontend.

//get the studentlist
export const getStudentList=async(req,res)=>{
   try {
     const [students]=await pool.query('SELECT id,username,email FROM users WHERE role=?',['student'])
     if(students.length===0){
        res.status(200).json({message:'No student found'})
     }
     res.status(200).json({students})
   } catch (error) {
      res.status(400).json({success:false,error:error.message})
   }
}
