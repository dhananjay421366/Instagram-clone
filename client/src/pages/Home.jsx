import { Feed } from '@/components/Feed'
import { LeftSideBar } from '@/components/LeftSideBar'
import { RightSideBar } from '@/components/RightSideBar'
import getAllPost from '@/hooks/useGetAllPost'
import useGetSuggestedUser from '@/hooks/useGetSuggestedUser.jsx'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const Home = () => {
  getAllPost()
  useGetSuggestedUser()
  return (
    <>
      <div className='  flex justify-between'>
        <div className="flex-grow ">
          <Feed />
          <Outlet />
        </div>
        <RightSideBar />
      </div>
    </>

  )
}
