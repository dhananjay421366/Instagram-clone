import React from 'react'
import { Navbar } from './Navbar'
import { LeftSideBar } from './LeftSideBar'
import { Outlet } from 'react-router-dom'


export const Layout = () => {
    return (
        <div>
            <Navbar />
            <LeftSideBar />
            <Outlet />
        </div>
    )
}
