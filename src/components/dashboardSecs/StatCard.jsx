import React from 'react';

export const StatCard = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-200 border',
    green: 'bg-green-500 text-green-200 border',
    yellow: 'bg-yellow-500 text-yellow-200 border',
    red: 'bg-red-500 text-red-200 border',
    purple: 'bg-purple-500 text-purple-200 border',
    orange: 'bg-orange-500 text-orange-200 border',
  };

  const colorClasses2 = {
    blue: 'from-blue-800 via-blue-600 to-transparent bg-linear-to-tl',
    green: 'from-green-800 via-green-600 to-transparent bg-linear-to-tl',
    yellow: 'from-yellow-800 via-yellow-600 to-transparent bg-linear-to-tl',
    red: 'from-red-800 via-red-600 to-transparent bg-linear-to-tl',
    purple: 'from-purple-800 via-purple-600 to-transparent bg-linear-to-tl',
    orange: 'from-orange-800 via-orange-600 to-transparent bg-linear-to-tl',
  };

  return (
    <div className={`${colorClasses2[color]} rounded-xl p-6 border-2 border-yellow hover:border-yellow-600 transition`}>
      <div className=" flex flex-col md:flex-row items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-white">{label}</div>
    </div>
  );
};
