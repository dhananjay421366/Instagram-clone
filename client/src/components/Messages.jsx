import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

export const Messages = ({ selectedUser }) => {
    
    return (
        <div className="overflow-y-auto flex-1 p-4  border-l border-gray-700">
            <div className="flex justify-center ">
                <div className="flex flex-col items-center justify-center">
                    <Avatar className='h-20 w-20'>
                        <AvatarImage src={selectedUser?.profilePicture} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{selectedUser?.username}</span>
                    <Link to={`/${selectedUser?._id}/profile`}>
                        <Button className='h-8 my-2 ' variant='secondary'>View Profile</Button>
                    </Link>
                </div>
            </div>
            <div  className="flex flex-col gap-3">
                {/* Messages */}
                {/* Add your code here */}
                {
                    [1, 2, 3, 4].map((msg) => {
                        return (
                            <div className={`flex`}>
                                <div>
                                    {
                                        msg
                                    }
                                </div>
                            </div>
                        )

                    })
                }
            </div>
        </div>
    );
};
