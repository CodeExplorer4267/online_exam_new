import pool from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//register a new user
export const register=async(req,res)=>{
    const { username, email, password, role } = req.body;
    
      // Basic validation
      if (!username || !email || !password || !role) {
        return res.status(400).json({ error: 'Please provide username, email, password, and role.' });
      }
    
      if (!['teacher', 'student'].includes(role)) {
        return res.status(400).json({ error: 'Role must be either teacher or student.' });
      }
    
      try {
        // Check if the user already exists
        const [existing] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existing.length > 0) {
          return res.status(400).json({ error: 'User with this email already exists.' });
        }
    
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Insert the new user into the database
        const [result] = await pool.query(
          'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
          [username, email, hashedPassword, role]
        );
        
        res.status(201).json({
          message: 'User registered successfully.',
          userId: result.insertId,
          role:role,
        });
      } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal Server Error',error:error.message });
      }
}

//login user
export const login=async(req,res)=>{
  const { email, password,role} = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Please provide email and password.' });
  }

  try {
    // Retrieve user by email
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    const user = rows[0];

    // Compare the password with the stored hash
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid credentials.' });
    }

    // Optionally, create a JWT for the user
    const token = jwt.sign(
      { id: user.id, role: user.role, email: user.email },
      process.env.JWT_SECRET || 'yoursecretkey',
      { expiresIn: '30d' }
    );

    res.json({
      message: 'Login successful.',
      token,
      // user: {
      //   id: user.id,
      //   username: user.username,
      //   email: user.email,
      //   role: user.role,
      // },
      role:role,
      studentId:user.id
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

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
