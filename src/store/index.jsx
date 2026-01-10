import {create} from 'zustand';



export const useAppStore = create((set) => ({
    user: null,
    activeTab: 'overview',
    notifications: 5,
    isSidebarOpen: false, 
    setUser: (user) => set({ user }),
    setActiveTab: (tab) => set({ activeTab: tab }),
    setNotifications: (count) => set({ notifications: count }),
    toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    closeSidebar: () => set({ isSidebarOpen: false }), 
}));