
export const StatCard = ({ icon: Icon, label, value, color }) => {
  const colorClasses = {
    blue: 'bg-blue-500 text-blue-200 border',
    green: 'bg-green-500 text-green-200 border',
    yellow: 'bg-yellow-500 text-yellow-200 border',
    red: 'bg-red-500 text-red-200 border',
    purple: 'bg-purple-500 text-purple-200 border',
    orange: 'bg-orange-500 text-orange-200 border',
  };


  return (
    <div className={`bg-gray-800 rounded-xl p-6 border-2 border-white/50 hover:border-white transition`}>
      <div className=" flex flex-col md:flex-row items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className={`text-${colorClasses[color]?.split(' ')[1]?.replace('text-', '') || 'white'}`}>{label}</div>
    </div>
  );
};
