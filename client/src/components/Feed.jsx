import React from 'react'
import { Posts } from './Posts'

export const Feed = () => {
    return (
        <>
            <div className="flex-1 my-8 flex flex-col items-center md:pl-[20%]">
                <Posts />
            </div>
        </>
    )
}
