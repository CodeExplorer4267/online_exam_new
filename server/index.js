// index.js
import express, { Router } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createUsersTable, { createAnswersTable, createMarksSubmitTable } from './db/setup.js';
import router from './routes/Router.js';
import { createExamsTable,createQuestionsTable,createMarksTable } from './db/setup.js';
import http from 'http';
import {Server} from 'socket.io'; //server is a class in socket.io
dotenv.config();

const app = express();
const server=http.createServer(app)
const io=new Server(server,{   //connection that we are creating is a socket.io connection
  cors:{
    origin:["http://localhost:5173","http://localhost:5174"],
    methods:["GET","POST"],
    credentials:true
  }
}) //socket.io server created   

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

// Create a Socket.IO server
io.on('connection',(socket)=>{
    console.log(`User connected with id: ${socket.id}`);
    // Listen for events from the client
    socket.on('disconnect', () => {
        console.log(`User disconnected with id: ${socket.id}`);
    });
})
//From the code snippet above, the socket.io("connection") function establishes a connection with the React app, then creates a unique ID for each socket and logs the ID to the console whenever a user visits the web page.

// When you refresh or close the web page, the socket fires the disconnect event showing that a user has disconnected from the socket.

// Public route
app.get('/', (req, res) => {
  res.send('Hello');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
