// index.js
import http from "http";
import { Server } from "socket.io";
import connectDB from "./db/index.js"; // Assuming your database connection logic is in `db/index.js`
import { app } from "./app.js"; // Import the configured Express app from `app.js`

import dotenv from 'dotenv';
dotenv.config();


// Create HTTP server and initialize Socket.io
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Socket.io setup
const userSocketMap = {};
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User connected: ${userId}, ${socket.id}`);
  }

  io.emit("getOnlineUser", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    if (userSocketMap[userId]) {
      delete userSocketMap[userId];
      console.log(`User disconnected: ${userId}`);
    }
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});

// Database Connection and Server Start
connectDB()
  .then(() => {
    server.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });
