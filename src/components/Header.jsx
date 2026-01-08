import React from 'react'
import lightLogo from '../assets/imges/logo/lightMode.png';
import darkLogo from '../assets/imges/logo/darkMode.png';
import NavBar from './NavBar';

export default function Header() {
    return (
    <div className='w-full flex flex-col md:flex-row items-center justify-around gap-7 md:gap-0 text-white bg-main p-3'>
        <img className='w-[300px]' src={darkLogo} alt="logo" />
        <NavBar/>
    </div>
    )
}
