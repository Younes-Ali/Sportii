import React from 'react'
import { NavLink ,useNavigate } from 'react-router-dom';

export default function NavBar() {

    const navigate = useNavigate();


    return (
        <div className='flex gap-5 text-md md:text-lg'>
            <NavLink className={({isActive})=> 'hover:text-[#f7bb17] font-bold ' + (isActive&&'text-[#f7bb17]')} to={'/'}>
                Home
            </NavLink>
            <NavLink className={({isActive})=> 'hover:text-[#f7bb17] font-bold ' + (isActive&&'text-[#f7bb17]')} to={'/about'}>
                About
            </NavLink>
            <NavLink className={({isActive})=> 'hover:text-[#f7bb17] font-bold ' + (isActive ? 'text-[#f7bb17]' : " ")} to={'/dashboard'}>
                Dashbourd
            </NavLink>
            <NavLink className={({isActive})=> 'hover:text-[#f7bb17] font-bold ' + (isActive&&'text-[#f7bb17]')} to={'/signin'}>
                Sign In/Up
            </NavLink>
            <NavLink className={({isActive})=> 'hover:text-[#f7bb17] font-bold ' + (isActive&&'text-[#f7bb17]')} to={'/contact'}>
                Contact Us
            </NavLink>
        </div>
    )
}
