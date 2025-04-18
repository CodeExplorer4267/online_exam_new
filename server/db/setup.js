// db/setup.js
import pool from './db.js';

const createUsersTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('teacher', 'student') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    `);
    console.log('Users table created or already exists.');
  } catch (error) {
    console.error('Error creating users table:', error);
  }
};

export const createExamsTable=async()=>{
  try {
     await pool.query(`
     CREATE TABLE IF NOT EXISTS exams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  teacher_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
);
   `);
  console.log("Exams table created or already exists")
  } catch (error) {
     console.log("Error while creating exams table",error)
  }
}

export const createQuestionsTable=async()=>{
    try {
      await pool.query(` 
        CREATE TABLE IF NOT EXISTS marks (
  student_id INT,
  exam_id INT,
  exam_marks INT,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
);`
    
  ); 
  console.log("Questions table created or already exists")
    } catch (error) {
       console.log("Error while creating qestions table")
    }
}

export const createAnswersTable=async()=>{
    try {
        await pool.query(`
          CREATE TABLE IF NOT EXISTS answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  exam_id INT,
  question_text TEXT,
  answer TEXT,
  marks INT DEFAULT 0,
  question_id INT,
  isSubmitted BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
);
          `);
        console.log("Answers table created or already exists")
    } catch (error) {
       console.log("Error while creating answers table",error)
    }
}
export const createMarksTable=async()=>{
   try {
     await pool.query(`
       CREATE TABLE IF NOT EXISTS marks_submit (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  exam_id INT,
  isSubmitted BOOLEAN DEFAULT FALSE,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
);
       `) 
       console.log("Marks table created or already exists")
   } catch (error) {
       console.log("Error while creating marks table",error)
   }
}

export const createMarksSubmitTable=async()=>{
     try {
       await pool.query(
        `
        CREATE TABLE IF NOT EXISTS messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sender_id INT,
  receiver_id INT,
  message TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

        `
       )
       console.log("Marks submit table created or already exists")
     } catch (error) {
        console.log("Error while creating submitTable",error)
     }
}

export const createMessageTable=async()=>{
     try {
       await pool.query(`
         CREATE TABLE IF NOT EXISTS messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sender_id INT,
  receiver_id INT,
  message TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE,
);
        `)
        console.log("Mesaage table created or already exists")
     } catch (error) {
        console.log("Error while creating message table",error)
     }
}

export default createUsersTable;

//ON DELETE CASCADE is a referential action in SQL that is used in foreign key constraints. It ensures that when a row in the parent table (the table being referenced) is deleted, all related rows in the child table (the table containing the foreign key) are automatically deleted as well.