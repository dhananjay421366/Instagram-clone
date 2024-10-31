// import { Conversation } from "../model/conversation.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";
// import { Message } from "../model/message.model.js";
// // for chatting
// export const sendMessage = async (req, res) => {
//   try {
//     const senderId = req.user?._id;
//     const receiverId = req.params.id;
//     const { textMessage: message } = req.body;

//     let conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     });
//     // establish the conversation if not started yet.
//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//       });
//     }
//     const newMessage = await Message.create({
//       senderId,
//       receiverId,
//       message,
//     });
//     if (newMessage) conversation.messages.push(newMessage._id);

//     await Promise.all([conversation.save(), newMessage.save()]);

//     // implement socket io for real time data transfer
//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     return res.status(201).json({
//       success: true,
//       newMessage,
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const getMessage = async (req, res) => {
//   try {
//     const senderId = req.user?._id;
//     console.log(senderId);
//     const receiverId = req.params.id;
//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     }).populate("messages");
//     if (!conversation)
//       return res.status(200).json({ success: true, messages: [] });

//     return res
//       .status(200)
//       .json({ success: true, messages: conversation?.messages });
//   } catch (error) {
//     console.log(error);
//   }
//};import { Conversation } from "../model/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { Message } from "../model/message.model.js";
import { Conversation } from "../model/conversation.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user?._id;
    const receiverId = req.params.id;
    const { textMessage: message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Create conversation if it doesn't exist
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    // Add the new message to the conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

    // Real-time message transmission via socket.io
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Failed to send the message",
    });
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.user?._id;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({ success: true, data: [] });
    }

    return res.status(200).json({ success: true, data: conversation.messages });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve messages",
    });
  }
};

export const deleteMsg = async (req, res) => {
  const messageId = req.params.id;

  if (!messageId) {
    throw new ApiError(404, "Message is not found ");
  }

  const msg = await Message.findByIdAndDelete(messageId);

  if (!msg) {
    throw new ApiError(409, "Error to deleting message");
  }
  return res
    .status(200)
    .json(new ApiResponse("200", msg, "Message was deleted successfully"));
};
