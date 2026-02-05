import React, { useEffect } from 'react';
import { Header } from '../components/dashboardSecs/Header';
import { Sidebar } from '../components/dashboardSecs/Sidebar';
import { TrainerDashboard } from '../components/dashboardSecs/trainer/TrainerDashboard';
import { ClientDashboard } from '../components/dashboardSecs/client/ClientDashboard';
import { useAppStore } from '../store';
import { getUserFromToken } from '../utils/auth';

const FitnessDashboard = () => {
  const { user, setUser } = useAppStore();

  useEffect(() => {
    const userData = getUserFromToken();
    setUser(userData);
    
    if (!localStorage.getItem('authToken')) {
      localStorage.setItem('authToken', 'dummy-token');
    }
  }, [setUser]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-black text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-1 md:p-6">
          {user.role === 'trainer' ? <TrainerDashboard /> : <ClientDashboard />}
        </main>
      </div>
    </div>
  );
};

export default FitnessDashboard;