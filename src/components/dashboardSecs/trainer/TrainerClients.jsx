import React from 'react';
import { Plus, Search, Filter } from 'lucide-react';

export const TrainerClients = () => {
  const clients = [
    { id: 1, name: 'Sarah Johnson', goal: 'Weight Loss', level: 'Intermediate', status: 'Active' },
    { id: 2, name: 'Mike Chen', goal: 'Muscle Gain', level: 'Advanced', status: 'Active' },
    { id: 3, name: 'Emma Davis', goal: 'Endurance', level: 'Beginner', status: 'Active' },
    { id: 4, name: 'James Wilson', goal: 'Weight Loss', level: 'Intermediate', status: 'Pending' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex md:flex-col flex-row md:items-start items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Client Management</h2>
        <button className="bg-blue-500 hover:bg-blue-400 text-black px-4 py-2 rounded-lg flex items-center space-x-2 transition w-full sm:w-auto justify-center">
          <Plus size={20} />
          <span>Add Client</span>
        </button>
      </div>

      <div className="flex md:flex-col flex-row gap-3">
        <div className="flex-1 relative ">
          <Search className="absolute left-3 top-3 text-gray-200" size={20} />
          <input
            type="text"
            placeholder="Search clients..."
            className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-white/50 hover:border-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <button className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 border border-gray-700 hover:bg-gray-700 transition">
          <Filter size={20} />
          <span>Filter</span>
        </button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden lg:block bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th className="text-left text-gray-400 font-medium px-6 py-4">Client</th>
              <th className="text-left text-gray-400 font-medium px-6 py-4">Goal</th>
              <th className="text-left text-gray-400 font-medium px-6 py-4">Level</th>
              <th className="text-left text-gray-400 font-medium px-6 py-4">Status</th>
              <th className="text-left text-gray-400 font-medium px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-t border-gray-700 hover:bg-gray-750 transition">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${client.name}&background=3b82f6&color=fff`}
                      alt={client.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="text-white font-medium">{client.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-300">{client.goal}</td>
                <td className="px-6 py-4 text-gray-300">{client.level}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    client.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {client.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-blue-400 hover:text-blue-300 transition">View Profile</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {clients.map((client) => (
          <div key={client.id} className="bg-gray-800 rounded-xl border border-gray-700 p-4">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={`https://ui-avatars.com/api/?name=${client.name}&background=3b82f6&color=fff`}
                alt={client.name}
                className="w-12 h-12 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-white font-medium">{client.name}</h3>
                <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${
                  client.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {client.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Goal:</span>
                <span className="text-gray-300">{client.goal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Level:</span>
                <span className="text-gray-300">{client.level}</span>
              </div>
            </div>

            <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};