// import React from 'react';
// import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
// import { Button } from './ui/button';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import useGetAllMessages from '@/hooks/useGetMessages';

// const Messages = ({ selectedUser, onDeleteMessage }) => {
//     useGetAllMessages();

//     // Access messages directly from Redux, and check if it’s an array
//     const { messages } = useSelector((store) => store.chat);
//     const { user } = useSelector((store) => store.auth);

//     // Check if messages is a valid array, otherwise default to an empty array
//     const messageArray = Array.isArray(messages) ? messages : [];
//     console.log(messageArray);

//     return (
//         <div className='overflow-y-auto flex-1 p-4'>
//             <div className='flex justify-center'>
//                 <div className='flex flex-col items-center justify-center'>
//                     <Avatar className="h-20 w-20">
//                         <AvatarImage src={selectedUser?.profilePicture} alt='profile' />
//                         <AvatarFallback>CN</AvatarFallback>
//                     </Avatar>
//                     <span>{selectedUser?.username}</span>
//                     <Link to={`/profile/${selectedUser?._id}`}>
//                         <Button className="h-8 my-2" variant="secondary">View profile</Button>
//                     </Link>
//                 </div>
//             </div>
//             <div className='flex flex-col gap-3'>
//                 {messageArray.map((msg) => (
//                     <div key={msg._id} className={`flex ${msg.senderId === user?._id ? 'justify-end' : 'justify-start'}`}>
//                         <div className={`p-2 rounded-lg max-w-xs break-words ${msg.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
//                             {msg.message}
//                             {onDeleteMessage && (
//                                 <button
//                                     className="text-sm text-red-500 ml-2"
//                                     onClick={() => onDeleteMessage(msg._id)}
//                                 >
//                                     Delete
//                                 </button>
//                             )}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Messages;
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetAllMessages from '@/hooks/useGetMessages';

const Messages = ({ selectedUser, onDeleteMessage }) => {
    useGetAllMessages();

    const { messages } = useSelector((store) => store.chat);
    const { user } = useSelector((store) => store.auth);
    console.log(user.data,"user on msg page");
    const messageArray = Array.isArray(messages) ? messages : [];
    console.log(messageArray);

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
                        <div className={`p-2 rounded-lg max-w-xs break-words ${msg.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                            {msg.message}
                            {onDeleteMessage && msg.senderId === user?._id && (
                                <button
                                    className="text-sm text-red-500 ml-2"
                                    onClick={() => onDeleteMessage(msg._id)}
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
