

import React, { useEffect, useState, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';
import { Bookmark, MessageCircle, MoreHorizontal, Send } from 'lucide-react';
import { Button } from './ui/button';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'sonner';
import { Badge } from './ui/badge';
import {CommentDialog} from "./CommentDialog"; // Adjust based on actual file name
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectedPost, setPost } from '@/redux/postSlice';

export const Post = ({ post }) => {
  const { posts } = useSelector((store) => store.post);
  const { user } = useSelector((store) => store.auth);
  const [content, setText] = useState('');
  const [open, setOpen] = useState(false);
  const [liked, setLiked] = useState(post.likes.includes(user?.data.user._id) || false);
  const [comments, setComments] = useState(post.comments);
  const [postlike, setPostlike] = useState(post.likes.length);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoRef = useRef(null);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    setText(inputText.trim() ? inputText : '');
  };

  const delePostHandler = async () => {
    if (!user) {
      toast.error('Please login to delete posts.');
      return navigate('/login');
    }

    try {
      const res = await axios.delete(`/api/v1/posts/${post?._id}/deletepost`, { withCredentials: true });
      if (res.data.success) {
        setOpen(false);
        const updatedPost = posts.filter((postItem) => postItem._id !== post?._id);
        dispatch(setPost(updatedPost));
        toast.success(res.data.message, { duration: 2000 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message, { duration: 2000 });
    } finally {
      setOpen(false);
    }
  };

  const likeDislike = async () => {
    if (!user) {
      toast.error('Please login to like posts.');
      return navigate('/login');
    }

    try {
      const action = liked ? 'dislike' : 'like';
      const res = await axios.post(`/api/v1/posts/${post._id}/${action}`, {}, {
        withCredentials: true
      });
      if (res.data.success) {
        setLiked(!liked);
        setPostlike((prev) => (liked ? prev - 1 : prev + 1));
        toast.success(res.data.message, { duration: 2000 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message, { duration: 2000 });
    }
  };

  const commentHandler = async () => {
    if (!user) {
      toast.error('Please login to comment.');
      return navigate('/login');
    }

    try {
      const res = await axios.post(`/api/v1/posts/${post._id}/addcomment`, { content }, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res.data.success) {
        setComments((prevComments) => [...prevComments, res.data.comment]); // Update comments dynamically
        setText(''); // Clear comment input
        toast.success(res.data.message, { duration: 2000 });
      }
    } catch (error) {
      toast.error(error.response?.data?.message, { duration: 2000 });
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          videoElement.play();
        } else {
          videoElement.pause();
        }
      });
    }, { threshold: 0.5 });

    if (videoElement) {
      observer.observe(videoElement);
    }

    return () => {
      if (videoElement) observer.unobserve(videoElement);
    };
  }, [post.image]);

  const handleVideoClick = () => {
    const videoElement = videoRef.current;
    if (videoElement.paused) {
      videoElement.play(); // Play the video if it's not already playing
    } else {
      navigate('/reels'); // Redirect to reels if the video is already playing
    }
  };


  // Ensure author is available before rendering
  const author = post.author || {};
  const bookmarkHandler = async () => {
    try {
      const res = await axios.get(`/api//v1/posts/toggle/${post?._id}/bookmark`)
      if (res.data.success) {
        toast.success(res.data.message)

      }

    } catch (error) {

    }
  }
  return (
    <div className='my-8 w-full max-w-sm mx-auto'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Avatar>
            <Link to={`/${author?._id}/profile`}>
              <AvatarImage src={author?.profilePicture} alt="profile_pic" />
              <AvatarFallback>CN</AvatarFallback>
            </Link>
          </Avatar>
          <div className='flex items-center gap-3'>
            <Link to={`/${author._id}/profile`}>
              <h1>{author.username ? author.username.slice(0, 10) : 'Unknown User'}</h1>
            </Link>
            {user?.data.user._id === author?._id && <Badge variant="secondary">Author</Badge>}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className='cursor-pointer' />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center text-black">
            {
              post?.author?._id != user?.data.user._id && <Button variant='ghost' className="cursor-pointer w-fit text-[#ED4956] font-bold">Unfollow</Button>
            }

            <Button variant='ghost' className="cursor-pointer w-fit">Add to favorites</Button>
            {user?.data.user._id === author?._id && (
              <Button variant='ghost' className="cursor-pointer w-fit text-[#ED4956]" onClick={delePostHandler}>
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {/* Render image or video */}
      {post.image ? (
        post.image.endsWith(".mp4") ? (
          <video
            ref={videoRef}
            className="rounded-sm my-2 w-full aspect-square object-cover"
            src={post?.image}
            controls
            loop
            onClick={handleVideoClick}
          />
        ) : (
          <img
            className="rounded-sm my-2 w-full aspect-square object-cover"
            src={post?.image}
            alt="post_img"
          />
        )
      ) : null}

      <div className='flex items-center justify-between my-2'>
        <div className='flex items-center gap-3'>
          {liked ? (
            <FaHeart size={'24'} onClick={likeDislike} className='cursor-pointer text-red-600' />
          ) : (
            <FaRegHeart size={'22px'} onClick={likeDislike} className='cursor-pointer hover:text-red-600' />
          )}
          <MessageCircle onClick={() => { dispatch(selectedPost(post)); setOpen(true); }} className='cursor-pointer hover:text-gray-600' />
          <Send className='cursor-pointer hover:text-gray-600' />
        </div>
        <Bookmark onClick={bookmarkHandler} className='cursor-pointer hover:text-gray-600' />
      </div>

      <span className='font-medium block mb-2'>
        <span className='mr-2'>{postlike}</span> likes
      </span>

      <p>
        <span className='font-medium mr-2'>{author.username || 'Unknown User'}</span>
        {post.caption.slice(0, 15)}
      </p>

      {comments.length > 0 && (
        <span onClick={() => { dispatch(selectedPost(post)); setOpen(true); }} className='cursor-pointer text-sm text-gray-400'>
          View all {comments.length} comments
        </span>
      )}

      <CommentDialog open={open} setOpen={setOpen} />

      <div className='flex items-center justify-between'>
        <input
          type="text"
          value={content}
          onChange={changeEventHandler}
          placeholder='Add a comment...'
          className='outline-none text-black my-2 py-2 rounded-md text-sm w-[80%]'
        />
        {content && <span onClick={commentHandler} className='text-[#3BADF8] cursor-pointer'>Post</span>}
      </div>
    </div>
  );
};

