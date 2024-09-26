import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Link, useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { Comment } from "./Comment";
import { toast } from "sonner";
import { setPost } from "@/redux/postSlice";
import axios from "axios";

export const CommentDialog = ({ open, setOpen }) => {
    const [content, setText] = useState("")
    const { selectedPost, posts } = useSelector((store) => store.post);
    const [comments, setComments] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (selectedPost) {
            setComments(selectedPost.comments)
        }
    })
    // console.log(selectedPost);
    const changeEventHandler = (e) => {
        const inputText = e.target.value;
        if (inputText.trim()) {
            setText(inputText);
        } else {
            setText("");
        }
    };

    const commentHandler = async () => {
        try {
            const res = await axios.post(`/api/v1/posts/${selectedPost._id}/addcomment`, { content }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            })
            if (res.data.success) {
                const updatedCommentData = [...comments, res.data.comment]
                setComments(updatedCommentData)
                const updatePostData = posts.map((p) => p._id === selectedPost._id ? { ...p, comments: updatedCommentData } :
                    p
                )
                dispatch(setPost(updatePostData))
                toast.success(res.data.message)
            }
        } catch (error) {
            toast.error(error.res.data.message)
        }
    }

    return (
        <>
            <Dialog open={open}>
                <DialogContent
                    onInteractOutside={() => setOpen(false)}
                    className="max-w-5xl p-0 flex flex-col"
                >
                    <div className="flex flex-1">
                        <div className="w-1/2">
                            <img
                                className="w-full h-[500px] object-cover rounded-l-lg"
                                src={selectedPost?.image}
                            />
                        </div>
                        <div className="w-1/2  flex flex-col justify-between text-black">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex gap-3 items-center">
                                    <Link>
                                        <Avatar>
                                            <AvatarImage src={selectedPost?.author.profilePicture} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </Link>
                                    <div>
                                        <Link className="font-semibold text-sm ">
                                            {selectedPost?.author.username}
                                        </Link>

                                        <span className="text-gray-600 "></span>
                                    </div>
                                </div>
                                <Dialog>
                                    <DropdownMenu className="text-white  ">
                                        <DropdownMenuTrigger asChild>
                                            <MoreHorizontal className="cursor-pointer" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="">
                                            {/* Dropdown Menu Items */}
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <span>Unfollow</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <span>Add to favorite</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </Dialog>
                            </div>
                            <hr />
                            <div className="flex-1  overflow-y-auto max-h-96 p-4">
                                {/* All comments */}
                                {comments?.map((comment) => (
                                    <Comment key={comment?._id} comment={comment} />
                                ))}
                            </div>
                            <div className="p-4 ">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={content}
                                        onChange={changeEventHandler}
                                        placeholder="Add comment..."
                                        className="w-full outline-none border border-gray-300  p-2 rounded"
                                    />
                                    <Button
                                        disabled={!content.trim()}
                                        onClick={commentHandler}
                                        variant="outline"
                                    >
                                        Send
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
