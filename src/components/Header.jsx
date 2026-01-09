import React, { useState, useEffect } from 'react'
import lightLogo from '../assets/imges/logo/lightMode.png';
import darkLogo from '../assets/imges/logo/darkMode.png';
import NavBar from './NavBar';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div 
            className="w-full flex flex-col md:flex-row items-center justify-around gap-7 md:gap-0 text-white sticky top-0 z-50 transition-all duration-300 p-3 backdrop-blur-md shadow-lg"
            style={{
                backgroundColor: scrolled ? 'rgba(60, 60, 60, 0.65)' : 'rgb(60, 60, 60)'
            }}
        >
            <img 
                className={`transition-all duration-300 ${
                    scrolled ? 'w-[200px]' : 'w-[300px]'
                }`} 
                src={darkLogo} 
                alt="logo" 
            />
            <NavBar/>
        </div>
    )
}