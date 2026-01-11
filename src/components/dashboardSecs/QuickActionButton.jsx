
export const QuickActionButton = ({ icon: Icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="bg-gray-900 hover:bg-gray-700 text-white p-4 rounded-lg border border-gray-700 flex items-center space-x-3 transition"
  >
    <Icon size={20} className="text-yellow" />
    <span>{label}</span>
  </button>
);