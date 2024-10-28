import React from 'react'
import { Post } from './Post'
import { useSelector } from 'react-redux'

export const Posts = () => {
  const { posts } = useSelector((store) => store.post)
  // console.log(posts);
  return (
    <>
      <div className="m-8">
        {/* {posts.map((post) => <Post key={post._id} post={post} />)} */}
        {posts
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((post) => (
            <Post key={post?._id} post={post} />
          ))}


      </div>
    </>
  )
}
