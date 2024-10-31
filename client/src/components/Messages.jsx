
import React, { useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import useGetAllMessages from '@/hooks/useGetMessages';
import { setMessages } from '@/redux/chatSlice';

const Messages = ({ selectedUser }) => {
    const dispatch = useDispatch();
    const { messages } = useSelector((store) => store.chat);
    const { user } = useSelector((store) => store.auth);

    const messageArray = Array.isArray(messages) ? messages : [];

    // Fetch messages when the component mounts
    useEffect(() => {
        async function fetchMessages() {
            const fetchedMessages = await useGetAllMessages();
            if (fetchedMessages) {
                dispatch(setMessages(fetchedMessages));
            }
        }
        fetchMessages();
    }, [dispatch]);

    // Handle delete message API call and state update
    const handleDeleteMessage = async (messageId) => {
        try {
            // Call the delete API
            await axios.delete(`/api/v1/message/msg/${messageId}`);

            // Update the Redux state by removing the deleted message
            dispatch(setMessages(messageArray.filter(msg => msg._id !== messageId)));
        } catch (error) {
            console.error("Failed to delete message:", error);
        }
    };

    return (
        <div className="overflow-y-auto flex-1 p-4">
            <div className="flex justify-center">
                <div className="flex flex-col items-center justify-center">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{selectedUser?.username}</span>
                    <Link to={`/profile/${selectedUser?._id}`}>
                        <Button className="h-8 my-2" variant="secondary">View profile</Button>
                    </Link>
                </div>
            </div>
            <div className="flex flex-col gap-3">
                {messageArray.map((msg) => (
                    <div key={msg._id} className={`flex ${msg.senderId === user.data.user?._id ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-2 rounded-lg max-w-xs break-words ${msg.senderId === user.data.user?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                            {msg.message}
                            {msg.senderId === user.data.user?._id && (
                                <button
                                    className="text-sm text-red-500 ml-2"
                                    onClick={() => handleDeleteMessage(msg._id)}
                                >
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Messages;
