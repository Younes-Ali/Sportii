import React from 'react';
import { ClientOverview } from './ClientOverview';
import { useAppStore } from '../../../store';
import ClientWorkout from './ClientWorkout';
import ClientNutrition from './ClientNutrition';
import ClientProgress from './ClientProgress';
import ClientAchievements from './ClientAchievements';
import ClientCalendar from './ClientCalendar';

export const ClientDashboard = () => {
  const { activeTab } = useAppStore();

  if (activeTab === 'overview') return <ClientOverview />;
  else if (activeTab === 'workout') return <ClientWorkout />;
  else if (activeTab === 'nutrition') return <ClientNutrition />;
  else if (activeTab === 'progress') return <ClientProgress/>;
  else if (activeTab === 'achievements') return <ClientAchievements />;
  else if (activeTab === 'calendar') return <ClientCalendar />;
  else if (activeTab === 'chat') return <div className="text-white">Client Chat Section</div>;

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-4">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </h2>
      <p className="text-gray-400">Content for {activeTab} section coming soon...</p>
    </div>
  );
};