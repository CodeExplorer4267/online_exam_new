// index.js
import express, { Router } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import createUsersTable, { createAnswersTable, createMarksSubmitTable, createMessageTable } from './db/setup.js';
import router from './routes/Router.js';
import { createExamsTable,createQuestionsTable,createMarksTable } from './db/setup.js';
import http from 'http';
import pool from './db/db.js'
import {Server} from 'socket.io'; //server is a class in socket.io
dotenv.config();

const app = express();
const server=http.createServer(app)
const io=new Server(server,{   //connection that we are creating is a socket.io connection
  cors:{
    origin:["http://localhost:5173","http://localhost:5174"], //kon origin socketIO server er start hobe
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
createMessageTable()

const onlineusers=new Map() //map to track online users

// Create a Socket.IO server
//socket io works on events. The socket.io server listens for events from the client and responds accordingly. The socket.io server is created using the http server instance.
io.on('connection',(socket)=>{
    console.log(`User connected with id: ${socket.id}`);
    
    socket.on('register', (userId) => {
      onlineusers.set(userId, socket.id); //map userID with current socket id of te user
      io.emit('update_online_users', Array.from(onlineusers.keys()));
    }); 

    //Now, after a client connects, we expect them to send their userId (student or teacher) to identify who they are.
// This tells the server: “Hey, I’m user 12” or “I’m user 5.”

// On receiving this userId, the server does two things:

// io.emit('update_online_users', Array.from(onlineUsers.keys()));
// onlineUsers.keys() returns all currently online userIds.

// Array.from(...) converts it into an array.

// io.emit(...) sends this array to everyone connected.

//This block listens for a private chat message being sent from one user to another.
    socket.on('send_message',async({senderId,receiverId,message})=>{
        const query=`
         INSERT INTO messages(sender_id,reciever_id,message) VALUES(?,?,?)
         `
         const [result]=await pool.query(query,[senderId,receiverId,message]);
        //  Now you're checking:
        //  Is the receiver currently online? 
        //  If yes, you get their socket.id.        
        //  This map (onlineUsers) was built earlier when users called register.
         const receiverSocket = onlineusers.get(receiverId);
          if (receiverSocket) {
            io.to(receiverSocket).emit('receive_message', {
               senderId, //If the recipient is online, this line will instantly send them the message in real-time.
               message,
               timestamp: new Date()
      });
    }
    //
    })

    // Listen for events from the client
    socket.on('disconnect', () => {
      for (let [userId, id] of onlineusers.entries()) {
        if (id === socket.id) {
          onlineusers.delete(userId);
          break;
        }
      }
      io.emit('update_online_users', Array.from(onlineusers.keys()));
      console.log(`User disconnected with id: ${socket.id}`);
    });
  });

//From the code snippet above, the socket.io("connection") function establishes a connection with the React app, then creates a unique ID for each socket and logs the ID to the console whenever a user visits the web page.

// When you refresh or close the web page, the socket fires the disconnect event showing that a user has disconnected from the socket.

// Public route
app.get('/', (req, res) => {
  res.send('Hello');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
