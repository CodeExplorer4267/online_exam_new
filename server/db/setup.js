// db/setup.js
import pool from './db.js';

export const createStudentsTable=async()=>{
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student','admin') DEFAULT 'student',
    year INT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
        `)
        console.log('Students table created or already exists')
    } catch (error) {
       console.log('Error while creating students table : ',error)
    }
}
export const createTeachersTable=async()=>{
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS teachers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('teacher') NOT NULL DEFAULT 'teacher',
    phone_number VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);
        `)
        console.log('Teachers table created or already exists')
    } catch (error) {
       console.log('Error while creating Teachers table : ',error)
    }
}

export const createExamsTable=async()=>{
   try {
     await pool.query(`
       CREATE TABLE IF NOT EXISTS exams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT NOT NULL,
    name VARCHAR(150) NOT NULL,
    duration INT NOT NULL COMMENT 'Duration in minutes',
    total_marks INT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE
);
      `)
      console.log('Exams table created or already exists')
   } catch (error) {
      console.log('Error while creating exams table.')
   }
}

export const createQuestionsTable=async()=>{
   try {
    await pool.query(
      `
      CREATE TABLE IF NOT EXISTS questions(
        id INT AUTO_INCREMENT PRIMARY KEY,
        exam_id INT NOT NULL,
        question_text VARCHAR(1000) NOT NULL,
        marks INT NOT NULL,
        FOREIGN KEY(exam_id) REFERENCES exams(id) ON DELETE CASCADE
    );
      `
    )
    console.log('Questions table created or already exists')
   } catch (error) {
     console.log('Error while creating questions table')
   }  
}


export const createMessageTable=async()=>{
     try {
       await pool.query(`
         CREATE TABLE IF NOT EXISTS messages (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sender_id BIGINT NOT NULL,
  receiver_id BIGINT NOT NULL,
  message TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
        `)
        console.log("Message table created or already exists")
     } catch (error) {
        console.log("Error while creating message table",error)
     }
}

export const createUniqueIdTable=async()=>{
   try {
     await pool.query(`
      CREATE TABLE IF NOT EXISTS unique_ids(
        id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role ENUM('student','teacher') NOT NULL,
  unique_10_digit_id CHAR(10) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
      `)
      console.log("Unique id table created or already exists")
   } catch (error) {
     console.log("Error while creating unique id table",error)
   }
}

// export const createQuestionsTable=async()=>{
//     try {
//       await pool.query(` 
//         CREATE TABLE IF NOT EXISTS marks (
//   student_id INT,
//   exam_id INT,
//   exam_marks INT,
//   FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
//   FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
// );`
    
//   ); 
//   console.log("Questions table created or already exists")
//     } catch (error) {
//        console.log("Error while creating qestions table")
//     }
// }

// export const createAnswersTable=async()=>{
//     try {
//         await pool.query(`
//           CREATE TABLE IF NOT EXISTS answers (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   student_id INT,
//   exam_id INT,
//   question_text TEXT,
//   answer TEXT,
//   marks INT DEFAULT 0,
//   question_id INT,
//   isSubmitted BOOLEAN DEFAULT FALSE,
//   FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
//   FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE,
//   FOREIGN KEY (question_id) REFERENCES questions(id) ON DELETE CASCADE
// );
//           `);
//         console.log("Answers table created or already exists")
//     } catch (error) {
//        console.log("Error while creating answers table",error)
//     }
// }
// export const createMarksTable=async()=>{
//    try {
//      await pool.query(`
//        CREATE TABLE IF NOT EXISTS marks_submit (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   student_id INT,
//   exam_id INT,
//   isSubmitted BOOLEAN DEFAULT FALSE,
//   FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
//   FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE
// );
//        `) 
//        console.log("Marks table created or already exists")
//    } catch (error) {
//        console.log("Error while creating marks table",error)
//    }
// }

// export const createMarksSubmitTable=async()=>{
//      try {
//        await pool.query(
//         `
//         CREATE TABLE IF NOT EXISTS messages (
//   id INT PRIMARY KEY AUTO_INCREMENT,
//   sender_id INT,
//   receiver_id INT,
//   message TEXT,
//   timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
//   FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
// );

//         `
//        )
//        console.log("Marks submit table created or already exists")
//      } catch (error) {
//         console.log("Error while creating submitTable",error)
//      }
// }


// export const createMaterialsTable=async()=>{
//     try {
//       await pool.query(`
//         CREATE TABLE IF NOT EXISTS materials(
//           id INT PRIMARY KEY AUTO_INCREMENT,
//           title VARCHAR(255) NOT NULL,
//           file_name VARCHAR(255) NOT NULL,
//           teacher_name VARCHAR(255) NOT NULL,
//           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         );
//         `)
//         console.log("Materials table created or already exists")
//     } catch (error) {
//        console.log("Error while creating materials table",error)
//     }
// }

// export default createUsersTable;

//ON DELETE CASCADE is a referential action in SQL that is used in foreign key constraints. It ensures that when a row in the parent table (the table being referenced) is deleted, all related rows in the child table (the table containing the foreign key) are automatically deleted as well.