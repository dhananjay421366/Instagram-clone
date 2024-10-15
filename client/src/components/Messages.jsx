import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export const Messages = ({ selectedUser, messages }) => {
    return (
        <div className="flex-1 p-4 overflow-y-auto">
            {messages && messages.length > 0 ? (
                messages.map((msg) => (
                    <div
                        key={msg._id}
                        className={`flex ${msg.senderId === selectedUser._id ? "justify-end" : "justify-start"} mb-2`}
                    >
                        <div className="max-w-xs bg-gray-800 text-white p-2 rounded-lg">
                            {/* Ensure you are accessing the correct property here */}
                            <p>{msg.message}</p>
                        </div>
                    </div>
                ))
            ) : (
                <p>No messages yet.</p>
            )}
        </div>
    );
};
