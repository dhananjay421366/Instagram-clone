// // import React from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// // import { setselectedUser } from '@/redux/AuthSlice';
// // import { Input } from './ui/input';
// // import { Button } from './ui/button';
// // import { MessageCircle, MessageCircleCode } from 'lucide-react';
// // import { Messages } from './Messages';

// // export const Chatpage = () => {
// //     const { user } = useSelector((store) => store.auth);
// //     const { suggestedUser, selectedUser } = useSelector((store) => store.auth);
// //     const dispatch = useDispatch()
// //     const { onlineUsers } = useSelector((store) => store.chat)

// //     // Check if suggestedUser and its users array exist, otherwise assign an empty array
// //     const suggestedUsersArray = suggestedUser?.users && Array.isArray(suggestedUser.users) ? suggestedUser.users : [];

// //     return (
// //         <div className='flex ml-[16%] h-screen'>
// //             <section className='w-full md:w-1/4 my-8'>
// //                 <h1 className='font-bold mb-4 px-3 text-xl'>
// //                     {user?.data.user.username}
// //                 </h1>
// //                 <hr className='mb-4 border-white' />
// //                 <div className='overflow-y-auto h-[80vh]'>
// //                     {suggestedUsersArray.length > 0 ? (
// //                         suggestedUsersArray.map((user) => (
// //                             <div onClick={() => dispatch(setselectedUser(user))} key={user._id} className='flex items-center gap-4 mb-2  p-3 hover:bg-gray-900 hover:text-white'>
// //                                 <Avatar className='w-14 h-14'>
// //                                     <AvatarImage src={user?.profilePicture} />
// //                                     <AvatarFallback className='text-black'>CN</AvatarFallback>
// //                                 </Avatar>
// //                                 <div>
// //                                     <h2 className='text-sm'>{user?.username}</h2>
// //                                     <p className={`text-xs  font-bold  ${isOnline ? "text-green-600" : 'text-red-600'}`}>{isOnline ? "online" : "offline"}</p>
// //                                 </div>
// //                             </div>
// //                         ))
// //                     ) : (
// //                         <p>No suggested users found.</p>
// //                     )}
// //                 </div>
// //             </section>
// //             {
// //                 selectedUser ? (
// //                     <section className='flex-1 border-l-gray-300 flex flex-col h-full'>
// //                         <div className="flex gap-3 items-center px-3 py-3 border-b border-gray-700sticky  top-0  z-10">
// //                             <Avatar>
// //                                 <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
// //                                 <AvatarFallback>CN</AvatarFallback>
// //                             </Avatar>
// //                             <div className="">
// //                                 <span>{selectedUser?.username}</span>
// //                             </div>
// //                         </div>
// //                         <Messages selectedUser={selectedUser} />
// //                         <div className='flex items-center p-4 border-t border-gray-300'>
// //                             <Input type='text' placeholder='Type a message...' className='flex-1 mr-2 focus-visible:ring-transparent  text-black' />
// //                             <Button>Send</Button>

// //                         </div>
// //                     </section>
// //                 ) : (
// //                     <div className='flex flex-col items-center  justify-center mx-auto'>
// //                         <MessageCircleCode className='w-32 h-32 my-4' />
// //                         <h1 className='font-font-medium text-xl'>Your messages </h1>
// //                         <span >Send a message to start a chat.</span>
// //                     </div>
// //                 )
// //             }
// //         </div>
// //     );
// // };
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { setselectedUser } from '@/redux/AuthSlice';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { MessageCircleCode } from 'lucide-react';
// import { Messages } from './Messages';
// import axios from 'axios';
// import { setMessages } from '@/redux/chatSlice';

// export const Chatpage = () => {
//     const { user } = useSelector((store) => store.auth);
//     const { suggestedUser, selectedUser } = useSelector((store) => store.auth);
//     const { onlineUsers, messages } = useSelector((store) => store.chat);
//     const dispatch = useDispatch();
//     const [textMessage, setTextMsg] = useState("")

//     // Check if suggestedUser and its users array exist, otherwise assign an empty array
//     const suggestedUsersArray = suggestedUser?.users && Array.isArray(suggestedUser.users) ? suggestedUser.users : [];
//     const sendMessageHandler = async (receiverId) => {
//         if (!textMessage.trim()) {
//             console.log("Message content is required.");
//             return;
//         }
    
//         try {
//             const res = await axios.post(`/api/v1/message/send/${receiverId}`, { textMessage }, {
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 withCredentials: true
//             });
    
//             if (res.data) {
//                 dispatch(setMessages([...messages, res.data.newMessage]));
//                 setTextMsg("");  // Clear input field after sending the message
//             }
//         } catch (error) {
//             console.log("Failed to send message:", error);
//         }
//     };
    

//     useEffect(()=>{
//         return ()=>{
//             dispatch(setselectedUser(null))
//         }
//     },[])
//     return (
//         <div className='flex ml-[16%] h-screen'>
//             <section className='w-full md:w-1/4 my-8'>
//                 <h1 className='font-bold mb-4 px-3 text-xl'>
//                     {user?.data.user.username}
//                 </h1>
//                 <hr className='mb-4 border-white' />
//                 <div className='overflow-y-auto h-[80vh]'>
//                     {suggestedUsersArray.length > 0 ? (
//                         suggestedUsersArray.map((suggestedUser) => {
//                             const isOnline = onlineUsers.includes(suggestedUser?._id);
//                             return (
//                                 <div
//                                     onClick={() => dispatch(setselectedUser(suggestedUser))}
//                                     key={suggestedUser._id}
//                                     className='flex items-center gap-4 mb-2 p-3 hover:bg-gray-900 hover:text-white'
//                                 >
//                                     <Avatar className='w-14 h-14'>
//                                         <AvatarImage src={suggestedUser?.profilePicture} />
//                                         <AvatarFallback className='text-black'>CN</AvatarFallback>
//                                     </Avatar>
//                                     <div>
//                                         <h2 className='text-sm'>{suggestedUser?.username}</h2>
//                                         <p className={`text-xs font-bold ${isOnline ? "text-green-600" : "text-red-600"}`}>
//                                             {isOnline ? "online" : "offline"}
//                                         </p>
//                                     </div>
//                                 </div>
//                             );
//                         })
//                     ) : (
//                         <p>No suggested users found.</p>
//                     )}
//                 </div>
//             </section>
//             {selectedUser ? (
//                 <section className='flex-1 border-l-gray-300 flex flex-col h-full'>
//                     <div className="flex gap-3 items-center px-3 py-3 border-b border-gray-700 sticky top-0 z-10">
//                         <Avatar>
//                             <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
//                             <AvatarFallback>CN</AvatarFallback>
//                         </Avatar>
//                         <div>
//                             <span>{selectedUser?.username}</span>
//                         </div>
//                     </div>
//                     <Messages selectedUser={selectedUser} />
//                     <div className='flex items-center p-4 border-t border-gray-300'>
//                         <Input
//                             type='text'
//                             value={textMessage}
//                             onChange={(e) => setTextMsg(e.target.value)}
//                             placeholder='Type a message...'
//                             className='flex-1 mr-2 focus-visible:ring-transparent text-black'
//                         />
//                         <Button onClick={() => sendMessageHandler(selectedUser?._id)}>Send</Button>
//                     </div>
//                 </section>
//             ) : (
//                 <div className='flex flex-col items-center justify-center mx-auto'>
//                     <MessageCircleCode className='w-32 h-32 my-4' />
//                     <h1 className='font-medium text-xl'>Your messages</h1>
//                     <span>Send a message to start a chat.</span>
//                 </div>
//             )}
//         </div>
//     );
// };

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { setselectedUser } from '@/redux/AuthSlice';
// import { Input } from './ui/input';
// import { Button } from './ui/button';
// import { MessageCircleCode } from 'lucide-react';
// import { Messages } from './Messages';
// import axios from 'axios';
// import { setMessages } from '@/redux/chatSlice';

// export const Chatpage = () => {
//     const { user } = useSelector((store) => store.auth);
//     const { suggestedUser, selectedUser } = useSelector((store) => store.auth);
//     const { onlineUsers, messages } = useSelector((store) => store.chat);
//     const dispatch = useDispatch();
//     const [textMessage, setTextMsg] = useState("");

//     // Check if suggestedUser and its users array exist, otherwise assign an empty array
//     const suggestedUsersArray = suggestedUser?.users && Array.isArray(suggestedUser.users) ? suggestedUser.users : [];

//     const sendMessageHandler = async (receiverId) => {
//         if (!textMessage.trim()) {
//             console.log("Message content is required.");
//             return;
//         }

//         try {
//             const res = await axios.post(`/api/v1/message/send/${receiverId}`, { textMessage }, {
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 withCredentials: true
//             });

//             if (res.data.success) {
//                 // Ensure `messages` is an array before adding the new message
//                 const updatedMessages = Array.isArray(messages) ? [...messages, res.data.newMessage] : [res.data.newMessage];
//                 dispatch(setMessages(updatedMessages));
//                 setTextMsg("");  // Clear input field after sending the message
//             }
//         } catch (error) {
//             console.log("Failed to send message:", error);
//         }
//     };

//     useEffect(() => {
//         return () => {
//             dispatch(setselectedUser(null));
//         };
//     }, [dispatch]);

//     return (
//         <div className='flex ml-[16%] h-screen'>
//             <section className='w-full md:w-1/4 my-8'>
//                 <h1 className='font-bold mb-4 px-3 text-xl'>
//                     {user?.data.user.username}
//                 </h1>
//                 <hr className='mb-4 border-white' />
//                 <div className='overflow-y-auto h-[80vh]'>
//                     {suggestedUsersArray.length > 0 ? (
//                         suggestedUsersArray.map((suggestedUser) => {
//                             const isOnline = onlineUsers.includes(suggestedUser?._id);
//                             return (
//                                 <div
//                                     onClick={() => dispatch(setselectedUser(suggestedUser))}
//                                     key={suggestedUser._id}
//                                     className='flex items-center gap-4 mb-2 p-3 hover:bg-gray-900 hover:text-white'
//                                 >
//                                     <Avatar className='w-14 h-14'>
//                                         <AvatarImage src={suggestedUser?.profilePicture} />
//                                         <AvatarFallback className='text-black'>CN</AvatarFallback>
//                                     </Avatar>
//                                     <div>
//                                         <h2 className='text-sm'>{suggestedUser?.username}</h2>
//                                         <p className={`text-xs font-bold ${isOnline ? "text-green-600" : "text-red-600"}`}>
//                                             {isOnline ? "online" : "offline"}
//                                         </p>
//                                     </div>
//                                 </div>
//                             );
//                         })
//                     ) : (
//                         <p>No suggested users found.</p>
//                     )}
//                 </div>
//             </section>
//             {selectedUser ? (
//                 <section className='flex-1 border-l-gray-300 flex flex-col h-full'>
//                     <div className="flex gap-3 items-center px-3 py-3 border-b border-gray-700 sticky top-0 z-10">
//                         <Avatar>
//                             <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
//                             <AvatarFallback>CN</AvatarFallback>
//                         </Avatar>
//                         <div>
//                             <span>{selectedUser?.username}</span>
//                         </div>
//                     </div>
//                     <Messages selectedUser={selectedUser} />
//                     <div className='flex items-center p-4 border-t border-gray-300'>
//                         <Input
//                             type='text'
//                             value={textMessage}
//                             onChange={(e) => setTextMsg(e.target.value)}
//                             placeholder='Type a message...'
//                             className='flex-1 mr-2 focus-visible:ring-transparent text-black'
//                         />
//                         <Button onClick={() => sendMessageHandler(selectedUser?._id)}>Send</Button>
//                     </div>
//                 </section>
//             ) : (
//                 <div className='flex flex-col items-center justify-center mx-auto'>
//                     <MessageCircleCode className='w-32 h-32 my-4' />
//                     <h1 className='font-medium text-xl'>Your messages</h1>
//                     <span>Send a message to start a chat.</span>
//                 </div>
//             )}
//         </div>
//     );
// };

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { setselectedUser } from '@/redux/AuthSlice';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { MessageCircleCode } from 'lucide-react';
import { Messages } from './Messages';
import { setMessages } from '@/redux/chatSlice';
import useGetAllMessages from '@/hooks/useGetMessages';
import axios from 'axios';

export const Chatpage = () => {
    const { user } = useSelector((store) => store.auth);
    const { suggestedUser, selectedUser } = useSelector((store) => store.auth);
    const { onlineUsers, messages } = useSelector((store) => store.chat);
    const dispatch = useDispatch();
    const [textMessage, setTextMsg] = useState("");

    useGetAllMessages(); // Call the custom hook here

    // Check if suggestedUser and its users array exist, otherwise assign an empty array
    const suggestedUsersArray = suggestedUser?.users && Array.isArray(suggestedUser.users) ? suggestedUser.users : [];

    const sendMessageHandler = async (receiverId) => {
        if (!textMessage.trim()) {
            console.log("Message content is required.");
            return;
        }

        try {
            const res = await axios.post(`/api/v1/message/send/${receiverId}`, { textMessage }, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });

            if (res.data) {
                dispatch(setMessages([...messages, res.data.newMessage]));
                setTextMsg("");  // Clear input field after sending the message
            }
        } catch (error) {
            console.log("Failed to send message:", error);
        }
    };

    useEffect(() => {
        return () => {
            dispatch(setselectedUser(null));
        };
    }, [dispatch]);

    return (
        <div className='flex ml-[16%] h-screen'>
            <section className='w-full md:w-1/4 my-8'>
                <h1 className='font-bold mb-4 px-3 text-xl'>{user?.data.user.username}</h1>
                <hr className='mb-4 border-white' />
                <div className='overflow-y-auto h-[80vh]'>
                    {suggestedUsersArray.length > 0 ? (
                        suggestedUsersArray.map((suggestedUser) => {
                            const isOnline = onlineUsers.includes(suggestedUser?._id);
                            return (
                                <div onClick={() => dispatch(setselectedUser(suggestedUser))} key={suggestedUser._id} className='flex items-center gap-4 mb-2 p-3 hover:bg-gray-900 hover:text-white'>
                                    <Avatar className='w-14 h-14'>
                                        <AvatarImage src={suggestedUser?.profilePicture} />
                                        <AvatarFallback className='text-black'>CN</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h2 className='text-sm'>{suggestedUser?.username}</h2>
                                        <p className={`text-xs font-bold ${isOnline ? "text-green-600" : "text-red-600"}`}>{isOnline ? "online" : "offline"}</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p>No suggested users found.</p>
                    )}
                </div>
            </section>

            {selectedUser ? (
                <section className='flex-1 border-l-gray-300 flex flex-col h-full'>
                    <div className="flex gap-3 items-center px-3 py-3 border-b border-gray-700 sticky top-0 z-10">
                        <Avatar>
                            <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <span>{selectedUser?.username}</span>
                        </div>
                    </div>
                    <Messages selectedUser={selectedUser} messages={messages} /> {/* Pass messages here */}
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
                <div className='flex flex-col items-center justify-center mx-auto'>
                    <MessageCircleCode className='w-32 h-32 my-4' />
                    <h1 className='font-medium text-xl'>Your messages</h1>
                    <span>Send a message to start a chat.</span>
                </div>
            )}
        </div>
    );
};


