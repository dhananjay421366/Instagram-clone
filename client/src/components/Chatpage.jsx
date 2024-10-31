
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setselectedUser } from '@/redux/AuthSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCode } from 'lucide-react';
import Messages from './Messages';
import { setMessages } from '@/redux/chatSlice';
import useGetAllMessages from '@/hooks/useGetMessages';
import axios from 'axios';

export const Chatpage = () => {
    const { user } = useSelector((store) => store.auth);
    const { suggestedUser, selectedUser } = useSelector((store) => store.auth);
    const { onlineUsers, messages } = useSelector((store) => store.chat);
    const dispatch = useDispatch();
    const [textMessage, setTextMsg] = useState("");
    const [isMobileView, setIsMobileView] = useState(false);

    useGetAllMessages();

    // Responsive view toggle based on selected user
    const handleUserSelect = (user) => {
        dispatch(setselectedUser(user));
        if (window.innerWidth <= 768) {
            setIsMobileView(true);
        }
    };

    const handleBackToUserList = () => {
        dispatch(setselectedUser(null));
        setIsMobileView(false);
    };

    const sendMessageHandler = async (receiverId) => {
        if (!textMessage.trim()) {
            console.log("Message content is required.");
            return;
        }

        try {
            console.log("Sending message to:", receiverId);
            const res = await axios.post(
                `/api/v1/message/send/${receiverId}`,
                { textMessage },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            if (res.data) {
                console.log("Message sent successfully:", res.data.newMessage);
                dispatch(setMessages([...messages, res.data.newMessage]));
                setTextMsg("");
            }
        } catch (error) {
            console.error("Failed to send message:", error);
            alert("Failed to send message. Please check your network or try again.");
        }
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileView(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        return () => {
            dispatch(setselectedUser(null));
        };
    }, [dispatch]);

    const suggestedUsersArray = suggestedUser?.users && Array.isArray(suggestedUser.users) ? suggestedUser.users : [];

    return (
        <div className='md:flex md:ml-[16%] h-screen'>
            {/* User List Section */}
            {!isMobileView && (
                <section className='w-full md:w-1/4 my-8'>
                    <h1 className='font-bold mb-4 px-3 text-xl'>{user?.data.user.username}</h1>
                    <hr className='mb-4 border-white' />
                    <div className='overflow-y-auto h-[80vh]'>
                        {suggestedUsersArray.length > 0 ? (
                            suggestedUsersArray.map((suggestedUser) => {
                                const isOnline = onlineUsers.includes(suggestedUser?._id);
                                return (
                                    <div
                                        onClick={() => handleUserSelect(suggestedUser)}
                                        key={suggestedUser._id}
                                        className='flex items-center gap-4 mb-2 p-3 hover:bg-gray-900 hover:text-white'
                                    >
                                        <Avatar className='w-14 h-14'>
                                            <AvatarImage src={suggestedUser?.profilePicture} />
                                            <AvatarFallback className='text-black'>CN</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h2 className='text-sm'>{suggestedUser?.username}</h2>
                                            <p className={`text-xs font-bold ${isOnline ? "text-green-600" : "text-red-600"}`}>
                                                {isOnline ? "online" : "offline"}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No suggested users found.</p>
                        )}
                    </div>
                </section>
            )}

            {/* Chat Section */}
            {selectedUser ? (
                <section className={`flex-1 ${isMobileView ? "w-full" : "md:border-l border-gray-700"} flex flex-col h-full`}>
                    <div className="flex gap-3 items-center px-3 py-3 border-b border-gray-700 sticky top-0 z-10">
                        {isMobileView && (
                            <Button onClick={handleBackToUserList} className="mr-2">
                                Back
                            </Button>
                        )}
                        <Avatar>
                            <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <span>{selectedUser?.username}</span>
                        </div>
                    </div>
                    <Messages selectedUser={selectedUser} messages={messages} />
                    <div className='flex items-center p-4 border-t border-gray-300'>
                        <Input
                            type='text'
                            value={textMessage}
                            onChange={(e) => setTextMsg(e.target.value)}
                            placeholder='Type a message...'
                            className='flex-1 mr-2 focus-visible:ring-transparent text-black'
                        />
                        <Button onClick={() => sendMessageHandler(selectedUser?._id)}>Send</Button>
                    </div>
                </section>
            ) : (
                !isMobileView && (
                    <div className='flex flex-col items-center justify-center mx-auto'>
                        <MessageCircleCode className='w-32 h-32 my-4' />
                        <h1 className='font-medium text-xl'>Your messages</h1>
                        <span>Send a message to start a chat.</span>
                    </div>
                )
            )}
        </div>
    );
};
