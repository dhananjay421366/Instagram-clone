// // import { Conversation } from "../model/conversation.model.js";
// // import { getReceiverSocketId, io } from "../socket/socket.js";
// // import { Message } from "../model/message.model.js";
// // // for chatting
// // export const sendMessage = async (req, res) => {
// //   try {
// //     const senderId = req.user?._id;
// //     const receiverId = req.params.id;
// //     const { textMessage: message } = req.body;

// //     let conversation = await Conversation.findOne({
// //       participants: { $all: [senderId, receiverId] },
// //     });
// //     // establish the conversation if not started yet.
// //     if (!conversation) {
// //       conversation = await Conversation.create({
// //         participants: [senderId, receiverId],
// //       });
// //     }
// //     const newMessage = await Message.create({
// //       senderId,
// //       receiverId,
// //       message,
// //     });
// //     if (newMessage) conversation.messages.push(newMessage._id);

// //     await Promise.all([conversation.save(), newMessage.save()]);

// //     // implement socket io for real time data transfer
// //     const receiverSocketId = getReceiverSocketId(receiverId);
// //     if (receiverSocketId) {
// //       io.to(receiverSocketId).emit("newMessage", newMessage);
// //     }

// //     return res.status(201).json({
// //       success: true,
// //       newMessage,
// //     });
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };
// // export const getMessage = async (req, res) => {
// //   try {
// //     const senderId = req.user?._id;
// //     console.log(senderId);
// //     const receiverId = req.params.id;
// //     const conversation = await Conversation.findOne({
// //       participants: { $all: [senderId, receiverId] },
// //     }).populate("messages");
// //     if (!conversation)
// //       return res.status(200).json({ success: true, messages: [] });

// //     return res
// //       .status(200)
// //       .json({ success: true, messages: conversation?.messages });
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };
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

//     // Establish the conversation if not started yet.
//     if (!conversation) {
//       conversation = await Conversation.create({
//         participants: [senderId, receiverId],
//         messages: [], // Ensure the messages array is initialized
//       });
//     }

//     const newMessage = await Message.create({
//       senderId,
//       receiverId,
//       message,
//     });

//     // Ensure the conversation has a messages array before pushing new messages
//     if (!conversation.messages) {
//       conversation.messages = [];
//     }

//     // Push the new message into the conversation's messages array
//     conversation.messages.push(newMessage._id);

//     // Save both conversation and new message
//     await Promise.all([conversation.save(), newMessage.save()]);

//     // Implement socket.io for real-time data transfer
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
//     return res.status(500).json({
//       success: false,
//       error: "Failed to send the message",
//     });
//   }
// };

// // Get messages between the sender and receiver
// export const getMessage = async (req, res) => {
//   try {
//     const senderId = req.user?._id;
//     const receiverId = req.params.id;

//     const conversation = await Conversation.findOne({
//       participants: { $all: [senderId, receiverId] },
//     }).populate("messages");

//     if (!conversation) {
//       return res.status(200).json({ success: true, messages: [] });
//     }

//     return res.status(200).json({ success: true, messages: conversation.messages });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       success: false,
//       error: "Failed to retrieve messages",
//     });
//   }
// };
import { Conversation } from "../model/conversation.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import { Message } from "../model/message.model.js";

// Send message
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user?._id;
    const receiverId = req.params.id;
    const { textMessage: message } = req.body;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    // Establish the conversation if not started yet.
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: [], // Ensure the messages array is initialized
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    // Ensure the conversation has a messages array before pushing new messages
    if (!conversation.messages) {
      conversation.messages = [];
    }

    // Push the new message into the conversation's messages array
    conversation.messages.push(newMessage._id);

    // Save both conversation and new message
    await Promise.all([conversation.save(), newMessage.save()]);

    // Implement socket.io for real-time data transfer
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    return res.status(201).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Failed to send the message",
    });
  }
};

// Get messages between the sender and receiver
export const getMessage = async (req, res) => {
  try {
    const senderId = req.user?._id;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({ success: true, messages: [] });
    }

    return res.status(200).json({ success: true, messages: conversation.messages });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      error: "Failed to retrieve messages",
    });
  }
};
