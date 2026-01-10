import React from 'react';
import { ClientOverview } from './ClientOverview';
import { useAppStore } from '../../../store';

export const ClientDashboard = () => {
  const { activeTab } = useAppStore();

  if (activeTab === 'overview') return <ClientOverview />;

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-4">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </h2>
      <p className="text-gray-400">Content for {activeTab} section coming soon...</p>
    </div>
  );
};