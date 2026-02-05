import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, BookOpen, Clock, Bell, Plus, Send } from 'lucide-react';
import { StatCard } from '../StatCard';
import { QuickActionButton } from '../QuickActionButton';

export const TrainerOverview = () => {
  const clientProgressData = [
    { name: 'Week 1', clients: 12 },
    { name: 'Week 2', clients: 15 },
    { name: 'Week 3', clients: 18 },
    { name: 'Week 4', clients: 22 },
  ];

  const topClients = [
    { name: 'Sarah Johnson', progress: 95, avatar: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=10b981&color=fff' },
    { name: 'Mike Chen', progress: 88, avatar: 'https://ui-avatars.com/api/?name=Mike+Chen&background=3b82f6&color=fff' },
    { name: 'Emma Davis', progress: 82, avatar: 'https://ui-avatars.com/api/?name=Emma+Davis&background=8b5cf6&color=fff' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">Trainer Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center md:text-left">
        <StatCard icon={Users} label="Total Clients" value="24" color="blue" />
        <StatCard icon={BookOpen} label="Active Plans" value="18" color="green" />
        <StatCard icon={Clock} label="Pending Updates" value="6" color="yellow" />
        <StatCard icon={Bell} label="Notifications" value="12" color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-xl p-6 border border-white/50 hover:border-white transition-all duration-300">
          <h3 className="text-xl font-semibold text-white mb-4">Client Growth</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={clientProgressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
              <Line type="monotone" dataKey="clients" stroke="#3b82f6" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-800 rounded-xl p-6 border border-white/50 hover:border-white transition-all duration-300">
          <h3 className="text-xl font-semibold text-white mb-4">Top Performers</h3>
          <div className="space-y-4">
            {topClients.map((client, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <img src={client.avatar} alt={client.name} className="w-12 h-12 rounded-full" />
                <div className="flex-1">
                  <div className="text-white font-medium">{client.name}</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${client.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-green-400 font-semibold">{client.progress}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-white/50 hover:border-white transition-all duration-300">
        <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <QuickActionButton icon={Plus} label="Create Workout Plan" />
          <QuickActionButton icon={Send} label="Send Notification" />
          <QuickActionButton icon={Users} label="Add New Client" />
        </div>
      </div>
    </div>
  );
};