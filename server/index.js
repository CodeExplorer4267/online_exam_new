// index.js
import express, { Router } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createUsersTable, { createAnswersTable, createMarksSubmitTable } from './db/setup.js';
import router from './routes/Router.js';
import { createExamsTable,createQuestionsTable,createMarksTable } from './db/setup.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
 
// Enable CORS for a specific origin
const corsOptions = { 
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Add allowed origins
  credentials: true, // Allow credentials
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (for incoming requests)
app.use(express.json());

app.use('/online-exam',router);

// Create the users table if it doesn't exist
createUsersTable();
createExamsTable();
createQuestionsTable();
createAnswersTable()
createMarksTable()
createMarksSubmitTable()

// Public route
app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
