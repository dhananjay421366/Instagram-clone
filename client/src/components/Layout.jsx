import React from 'react'
import { Navbar } from './Navbar'
import { LeftSideBar } from './LeftSideBar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Login } from './Login'


export const Layout = () => {
    const { user } = useSelector((store) => store.auth)
    return (
        <div>
            <Navbar />
            {user ? <LeftSideBar /> :""}
            <Outlet />
        </div>
    )
}
