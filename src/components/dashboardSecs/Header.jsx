import React from 'react';
import { Bell, Dumbbell } from 'lucide-react';
import { useAppStore } from '../../store';
import { IoMenuSharp } from "react-icons/io5";

export const Header = () => {
  const { user, notifications, toggleSidebar } = useAppStore();

  return (
    <header className="bg-yellow border-b border-gray-700">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <Dumbbell className="text-black" size={32} />
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full" />
            <div className="text-left">
              <div className="text-black font-medium">{user?.name}</div>
              <div className="text-gray-900 text-sm capitalize">{user?.role}</div>
            </div>
          </div>
          <button className="relative text-gray-900 hover:text-white transition">
            <Bell size={24} />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
          <button 
            onClick={toggleSidebar}
            className="text-black hover:text-gray-400 transition md:hidden"
          >
            <IoMenuSharp size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};
