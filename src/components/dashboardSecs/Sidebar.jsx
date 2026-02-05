import React from 'react';
import { Activity, Users, BookOpen, TrendingUp, MessageSquare, Calendar, Video, Dumbbell, Apple, Trophy, X } from 'lucide-react';
import { useAppStore } from '../../store';

export const Sidebar = () => {
  const { user, activeTab, setActiveTab, isSidebarOpen, closeSidebar } = useAppStore();

  const trainerMenu = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'clients', label: 'Clients', icon: Users },
    { id: 'plans', label: 'Plans', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'videos', label: 'Video Library', icon: Video },
  ];

  const clientMenu = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'workout', label: 'My Workout', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrition', icon: Apple },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  const menu = user?.role === 'trainer' ? trainerMenu : clientMenu;

  return (
    <>
      {/* Overlay - يظهر لما الـ sidebar يكون مفتوح */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar - مخفي دايماً ويظهر بس لما isSidebarOpen يكون true */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50
          w-64 bg-black min-h-screen border-r border-yellow
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        {/* زرار الإغلاق */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <span className="text-white font-semibold">Menu</span>
          <button 
            onClick={closeSidebar}
            className="text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>
        </div>    
        
        {/* القائمة */}
        <nav className="p-4 space-y-2">
          {menu.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  closeSidebar(); // يقفل الـ sidebar بعد اختيار أي صفحة
                }}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                  activeTab === item.id
                    ? 'bg-yellow text-black'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};