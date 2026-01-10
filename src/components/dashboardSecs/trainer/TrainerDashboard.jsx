
import { TrainerOverview } from './TrainerOverview';
import { TrainerClients } from './TrainerClients';
import { useAppStore } from '../../../store';

export const TrainerDashboard = () => {
  const { activeTab } = useAppStore();

  if (activeTab === 'overview') return <TrainerOverview />;
  if (activeTab === 'clients') return <TrainerClients />;

  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-4">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </h2>
      <p className="text-gray-400">Content for {activeTab} section coming soon...</p>
    </div>
  );
};