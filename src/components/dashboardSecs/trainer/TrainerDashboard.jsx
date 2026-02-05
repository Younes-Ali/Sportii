
import { TrainerOverview } from './TrainerOverview';
import { TrainerClients } from './TrainerClients';
import { useAppStore } from '../../../store';
import TrainerPlans from './TrainerPlans';
import TrainerAnalytics from './TrainerAnalytics';
import TrainerCalendar from './TrainerCalendar';
import TrainerVideos from './TrainerVideos';

export const TrainerDashboard = () => {
  const { activeTab } = useAppStore();

  if (activeTab === 'overview') return <TrainerOverview />;
  else if (activeTab === 'clients') return <TrainerClients />;
  else if (activeTab === 'plans') return <TrainerPlans />;
  else if (activeTab === 'analytics') return <TrainerAnalytics />;
  else if (activeTab === 'chat') return <div className="text-white">Trainer Chat Section</div>;
  else if (activeTab === 'calendar') return <TrainerCalendar />;
  else if (activeTab === 'videos') return <TrainerVideos />;
  return (
    <div className="text-white">
      <h2 className="text-3xl font-bold mb-4">
        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
      </h2>
      <p className="text-gray-400">Content for {activeTab} section coming soon...</p>
    </div>
  );
};