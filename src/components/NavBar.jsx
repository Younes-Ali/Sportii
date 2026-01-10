import React from 'react'
import { NavLink ,useNavigate } from 'react-router-dom';

export default function NavBar() {

    const navigate = useNavigate();


    return (
        <div className='flex gap-5 text-sm md:text-lg'>
            <NavLink className={({isActive})=> 'hover:text-yellow font-bold ' + (isActive&&'text-yellow')} to={'/'}>
                Home
            </NavLink>
            <NavLink className={({isActive})=> 'hover:text-yellow font-bold ' + (isActive&&'text-yellow')} to={'/about'}>
                About
            </NavLink>
            <NavLink className={({isActive})=> 'hover:text-yellow font-bold ' + (isActive ? 'text-yellow' : " ")} to={'/dashboard'}>
                Dashbourd
            </NavLink>
            <NavLink className={({isActive})=> 'hover:text-yellow font-bold ' + (isActive&&'text-yellow')} to={'/signin'}>
                Sign In/Up
            </NavLink>
            <NavLink className={({isActive})=> 'hover:text-yellow font-bold ' + (isActive&&'text-yellow')} to={'/contact'}>
                Contact Us
            </NavLink>
        </div>
    )
}
