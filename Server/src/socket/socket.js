import { Server } from "socket.io";
import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "  http://localhost:5173/", methods: ["GET", "POST"] },
});

const userSocketMap = {}; // Map to store user socket connections   ||  online user

// User connected
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`user connected ${userId} , ${socket.id}`);
  }

  io.emit("getOnlineUser", Object.keys(userSocketMap));

  // User disconnected
  socket.on("disconnect", () => {
    if (userId in userSocketMap) {
      delete userSocketMap[userId];
      console.log(`user disconnected ${userId}`);
    }
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});

export { app, server, io };
