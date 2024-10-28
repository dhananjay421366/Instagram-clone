import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../model/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Post } from "../model/post.model.js";
import { Comment } from "../model/comment.model.js";
import fs from "fs"; // file system
import { getReceiverSocketId,io } from "../socket/socket.js";

// done
const addNewPost = asyncHandler(async (req, res) => {
  const { caption } = req.body;
  const image = req.files?.image[0]; // Access the file directly
  const authorId = req.user?._id;

  if (!image) {
    throw new ApiError(404, "Image is required");
  }
  console.log("File received from Multer:", image);
  const localFilePath = image?.path; // Get the file path from multer
console.log(localFilePath);
  // upload image file on cloudinary
  const uploadedImage = await uploadOnCloudinary(localFilePath);
  console.log("Post image is showed on console ,",uploadedImage);

  // Save the post to MongoDB with the Base64 image string
  const post = await Post.create({
    caption,
    image: uploadedImage?.url, // Store the image as a Base64 string
    author: authorId,
  });

  const user = await User.findById(authorId);
  if (user) {
    user.posts.push(post._id);
    await user.save();
  }

  await post.populate({ path: "author", select: "-password -refreshToken" });

  res
    .status(201)
    .json(new ApiResponse("200", post, "New post added successfully"));
});

// get all post done
const getAllPost = asyncHandler(async (req, res) => {
  const post = await Post.find()
    .sort({ createdAt: -1 })
    .populate({ path: "author", select: "username  profilePicture" })
    .populate({
      path: "comments",
      sort: { createdAt: -1 },
      populate: { path: "commentBy", select: "username profilePicture" },
    });
  return res
    .status(200)
    .json(new ApiResponse("200", post, "All posts fetched successfully"));
});
// my post  done
const getMyPost = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const posts = await Post.find({ author: userId })
    .sort({ craetedAt: -1 })
    .populate({
      path: "author",
      select: "username, profilePicture",
    })
    .populate({
      path: "comments",
      populate: { path: "commentBy", select: "username,profilePicture" },
      options: { sort: { createdAt: -1 } },
    });
  return res
    .status(200)
    .json(new ApiResponse("200", posts, "Your posts fetched successfully"));
});
// like post done
const likePost = asyncHandler(async (req, res) => {
  const likeKarneWakaUserId = req.user._id;
  const postId = req.params.id;
  // console.log(postId);
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post are not found");
  }
  // like logic is started
  await post.updateOne({ $addToSet: { likes: likeKarneWakaUserId } }); // only one user add only one like using addToSet Method
  await post.save();
  // implement socket io for real time notification
  const user = await User.findById(likeKarneWakaUserId).select(
    "username profilePicture"
  );

  const postOwnerId = post.author.toString();

  if (postOwnerId != likeKarneWakaUserId) {
    const notification = {
      type: "like",
      userId: likeKarneWakaUserId,
      userDetails: user,
      message: "Your post was liked ",
    };
    const postOwnerSoketId = getReceiverSocketId(postOwnerId);
    io.to(postOwnerSoketId).emit("notification", notification);
  }
  res.status(200).json(new ApiResponse("200", post, "Post liked successfully"));
});
// done
const disLikePost = asyncHandler(async (req, res) => {
  const likeKarneWakaUserId = req.user._id;
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post are not found");
  }
  // like logic is started
  await post.updateOne({ $pull: { likes: likeKarneWakaUserId } }); // only one user add only one like using addToSet Method
  await post.save();
  // implement socket io for real time notification
  // implement socket io for real time notification
  const user = await User.findById(likeKarneWakaUserId).select(
    "username profilePicture"
  );

  const postOwnerId = post.author.toString();

  if (postOwnerId != likeKarneWakaUserId) {
    const notification = {
      type: "dislike",
      userId: likeKarneWakaUserId,
      userDetails: user,
      message: "Your post was dislike ",
    };
    const postOwnerSoketId = getReceiverSocketId(postOwnerId);
    io.to(postOwnerSoketId).emit("notification", notification);
  }
  res
    .status(200)
    .json(new ApiResponse("200", post, "Post disliked successfully"));
});
// add comment done
const addComment = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const commentKarneWalaUserId = req.user?._id;
  const { content } = req.body;
  const post = await Post.findById(postId);
  if (!content) {
    throw new ApiError(404, "content is required");
  }
  const comment = await Comment.create({
    content,
    commentBy: commentKarneWalaUserId,
    post: postId,
  });
  await comment.populate({
    path: "commentBy",
    select: "username profilePicture",
  });

  post.comments.push(comment?._id);
  await post.save();
  // implement socket io for real time notification
  res
    .status(201)
    .json(new ApiResponse("200", comment, "Comment added successfully"));
});
// post according comments  done
const getCommentsOfPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const comments = await Comment.find({ post: postId }).populate({
    path: "commentBy",
    select: "username profilePicture",
  });
  if (!comments) {
    throw new ApiError(404, "Comments are not found for this post");
  }
  res
    .status(200)
    .json(new ApiResponse("200", comments, "Comments fetched successfully"));
});

// delete post  done

const deletePost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post are not found");
  }
  // check if the logged- in user is the owner of the post
  // console.log(post.author.toString(), "UserIs is ", userId);
  if (post.author.toString() !== userId.toString()) {
    throw new ApiError(403, "Unauthorized ");
  }
  //  delete post
  await Post.findByIdAndDelete(postId);
  // remove the postId from user post
  //   await User.findByIdAndUpdate(userId, { $pull: { posts: postId } });
  //   res.status(200).json(new ApiResponse("200", {}, "Post deleted successfully"));
  let user = await User.findById(userId);
  user.posts = user.posts.filter((post) => post.toString() !== postId);
  await user.save();
  // deletes associated comments
  await Comment.deleteMany({ post: postId });

  res.status(200).json(new ApiResponse("200", {}, "Post deleted successfully"));
});
// Bookmark the post  done
const bookMarkPost = asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const post = await Post.findById(postId);
  if (!post) {
    throw new ApiError(404, "Post are not found");
  }
  const user = await User.findById(userId);
  if (user.bookmarks.includes(post._id)) {
    // already bookmarked -> remove from bookmark
    await user.updateOne({ $pull: { bookmarks: post._id } });
    await user.save();
    return res
      .status(200)
      .json(
        new ApiResponse("200", post, "Post UnBookmarked // save successfully")
      );
  } else {
    // bookmark karna padega
    await user.updateOne({ $addToSet: { bookmarks: post._id } });
    await user.save();
  }
  return res
    .status(200)
    .json(new ApiResponse("200", post, "Post bookmarked successfully"));
});

export {
  getAllPost,
  addNewPost,
  getMyPost,
  likePost,
  disLikePost,
  addComment,
  getCommentsOfPost,
  deletePost,
  bookMarkPost,
};
