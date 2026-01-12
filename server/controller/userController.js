import pool from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

function generate10DigitId() {
  const timePart = Date.now().toString().slice(-6);
  const randomPart = Math.floor(1000 + Math.random() * 9000);
  return timePart + randomPart; // 10 digits
}

//register a new user
export const register = async (req, res) => {
  let { name, email, password, role } = req.body;
  role = role?.toLowerCase().trim();
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  if (!["student", "teacher"].includes(role)) {
    return res.status(400).json({ message: "Role must be student or teacher" });
  }
  
  const table = role === "student" ? "students" : "teachers";
  const connection=await pool.getConnection()
  try {
    await connection.beginTransaction()

    const [existingUser]=await connection.query(`SELECT id from ${table} WHERE email=?`,[email])
    if(existingUser.length > 0){
      return res.status(400).json({success:false,message:"User with this email already exists"})
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await connection.query(
      `INSERT INTO ${table} (name, email, password, role)
       VALUES (?, ?, ?, ?)`,
      [name, email, hashedPassword, role]
    );
    const userId=result.insertId;
    let unique10DigitId;
    let exists=true
    while(exists){
       unique10DigitId=generate10DigitId()
       const [rows]=await connection.query("SELECT 1 FROM unique_ids WHERE  unique_10_digit_id=?",[unique10DigitId])
       exists=rows.length > 0
    }

   await connection.query(`
      INSERT INTO unique_ids(user_id,role,unique_10_digit_id) VALUES(?,?,?)
    `,[userId,role,unique10DigitId])

   await connection.commit()
   res.status(201).json({
      message: "Registration successful",
      userId,
      role,
      uniqueId: unique10DigitId
    });

  } catch (error) {
     await connection.rollback()
     console.log("Registration error:",error)
  }
  finally{
    connection.close()
  }
};


export const login = async (req, res) => {
  let { email, password, role } = req.body;
  role=role?.toLowerCase().trim()

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
