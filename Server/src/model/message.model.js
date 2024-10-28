// import mongoose from "mongoose";
// const messageSchema = new mongoose.Schema(
//   {
//     sender: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     receiver: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     message: {
//       type: String,
//       required: true,
//     },
//   },
//   { timestamps: true }
// );
// // export const Message = mongoose.model("Message", messageSchema);
// import mongoose from "mongoose";

// const messageSchema = new mongoose.Schema({
//     senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     message: { type: String, required: [true, 'Message content is required'] },
//     createdAt: { type: Date, default: Date.now }
// });

// export const Message = mongoose.model("Message", messageSchema);

import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export const Message = mongoose.model('Message', messageSchema);
