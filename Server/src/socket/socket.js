// import { Server } from "socket.io";
// import express from "express";
// import http from "http";
// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: { origin: "  http://localhost:5173/", methods: ["GET", "POST"] },
// });

// const userSocketMap = {}; // Map to store user socket connections   ||  online user
// export const getReceiverSocketId = (receiverId)=>userSocketMap(receiverId)
// // User connected
// io.on("connection", (socket) => {
//   const userId = socket.handshake.query.userId;

//   if (userId) {
//     userSocketMap[userId] = socket.id;
//     console.log(`user connected ${userId} , ${socket.id}`);
//   }

//   io.emit("getOnlineUser", Object.keys(userSocketMap));

//   // User disconnected
//   socket.on("disconnect", () => {
//     if (userId in userSocketMap) {
//       delete userSocketMap[userId];
//       console.log(`user disconnected ${userId}`);
//     }
//     io.emit("getOnlineUser", Object.keys(userSocketMap));
//   });
// });

// export { app, server, io };
import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173/", methods: ["GET", "POST"] },
});

const userSocketMap = {}; // Map to store user socket connections (online users)

// Function to get receiver's socket ID
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]; // Use bracket notation to access the object
};

// User connected
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User connected: ${userId}, ${socket.id}`);
  }

  // Broadcast online users
  io.emit("getOnlineUser", Object.keys(userSocketMap));

  // User disconnected
  socket.on("disconnect", () => {
    if (userId in userSocketMap) {
      delete userSocketMap[userId];
      console.log(`User disconnected: ${userId}`);
    }

    // Broadcast updated list of online users
    io.emit("getOnlineUser", Object.keys(userSocketMap));
  });
});

export { app, server, io };

