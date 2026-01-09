import React, { useState, useEffect } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { User, Users, Calendar, MessageSquare, Bell, TrendingUp, Award, Video, Plus, Search, Filter, Activity, Target, Flame, Dumbbell, Apple, Camera, Trophy, Send, BookOpen, Clock, CheckCircle } from 'lucide-react';

// Simulated JWT decode (in production, use jwt-decode library)
const getUserFromToken = () => {
    const token = localStorage.getItem('authToken');
    if (!token) ;
    // Simulated user data - in production, decode actual JWT
    return {
        id: 1,
        name: 'John Doe',
        role: 'client', // Change to 'client' to see client dashboard
        avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff'
    };
    };

    // Dashboard Component
    const FitnessDashboard = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('overview');
    const [notifications, setNotifications] = useState(5);
    const [showNotifications, setShowNotifications] = useState(false);

    useEffect(() => {
        const userData = getUserFromToken();
        setUser(userData);
        
        // Simulate setting token if not exists
        if (!localStorage.getItem('authToken')) {
        localStorage.setItem('authToken', 'dummy-token');
        }
    }, []);

    if (!user) {
        return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-white text-xl">Loading...</div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <header className="bg-gray-800 border-b border-gray-700 sticky top-30 md:top-20 z-50">
            <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
                <Dumbbell className="text-blue-500" size={32} />
                <h1 className="text-2xl font-bold text-white">FitCoach Pro</h1>
            </div>
            
            <div className="flex items-center space-x-6">
                <button className="relative text-gray-300 hover:text-white transition">
                <Bell size={24} />
                {notifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications}
                    </span>
                )}
                </button>
                
                <div className="flex items-center space-x-3">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                <div className="text-left">
                    <div className="text-white font-medium">{user.name}</div>
                    <div className="text-gray-400 text-sm capitalize">{user.role}</div>
                </div>
                </div>
            </div>
            </div>
        </header>

        <div className="flex">
            {/* Sidebar */}
            <Sidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Main Content */}
            <main className="flex-1 p-6">
            {user.role === 'trainer' ? (
                <TrainerDashboard activeTab={activeTab} />
            ) : (
                <ClientDashboard activeTab={activeTab} />
            )}
            </main>
        </div>
        </div>
    );
    };

    // Sidebar Component
    const Sidebar = ({ user, activeTab, setActiveTab }) => {
    const trainerMenu = [
        { id: 'overview', label: 'Overview', icon: Activity },
        { id: 'clients', label: 'Clients', icon: Users },
        { id: 'plans', label: 'Plans', icon: BookOpen },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
        { id: 'chat', label: 'Chat', icon: MessageSquare },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
        { id: 'videos', label: 'Video Library', icon: Video },
    ];

    const clientMenu = [
        { id: 'overview', label: 'Overview', icon: Activity },
        { id: 'workout', label: 'My Workout', icon: Dumbbell },
        { id: 'nutrition', label: 'Nutrition', icon: Apple },
        { id: 'progress', label: 'Progress', icon: TrendingUp },
        { id: 'achievements', label: 'Achievements', icon: Trophy },
        { id: 'chat', label: 'Chat', icon: MessageSquare },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
    ];

    const menu = user.role === 'trainer' ? trainerMenu : clientMenu;

    return (
        <aside className="w-64 bg-gray-800 min-h-screen border-r border-gray-700">
        <nav className="p-4 space-y-2">
            {menu.map((item) => {
            const Icon = item.icon;
            return (
                <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
                >
                <Icon size={20} />
                <span>{item.label}</span>
                </button>
            );
            })}
        </nav>
        </aside>
    );
    };

    // Trainer Dashboard
    const TrainerDashboard = ({ activeTab }) => {
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

    const clients = [
        { id: 1, name: 'Sarah Johnson', goal: 'Weight Loss', level: 'Intermediate', status: 'Active' },
        { id: 2, name: 'Mike Chen', goal: 'Muscle Gain', level: 'Advanced', status: 'Active' },
        { id: 3, name: 'Emma Davis', goal: 'Endurance', level: 'Beginner', status: 'Active' },
        { id: 4, name: 'James Wilson', goal: 'Weight Loss', level: 'Intermediate', status: 'Pending' },
    ];

    if (activeTab === 'overview') {
        return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">Trainer Dashboard</h2>
            
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={Users} label="Total Clients" value="24" color="blue" />
            <StatCard icon={BookOpen} label="Active Plans" value="18" color="green" />
            <StatCard icon={Clock} label="Pending Updates" value="6" color="yellow" />
            <StatCard icon={Bell} label="Notifications" value="12" color="red" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
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

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
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

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <QuickActionButton icon={Plus} label="Create Workout Plan" />
                <QuickActionButton icon={Send} label="Send Notification" />
                <QuickActionButton icon={Users} label="Add New Client" />
            </div>
            </div>
        </div>
        );
    }

    if (activeTab === 'clients') {
        return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold text-white">Client Management</h2>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition">
                <Plus size={20} />
                <span>Add Client</span>
            </button>
            </div>

            <div className="flex space-x-4">
            <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                type="text"
                placeholder="Search clients..."
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
                />
            </div>
            <button className="bg-gray-800 text-white px-4 py-2 rounded-lg flex items-center space-x-2 border border-gray-700 hover:bg-gray-700 transition">
                <Filter size={20} />
                <span>Filter</span>
            </button>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
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
        </div>
        );
    }

    return (
        <div className="text-white">
        <h2 className="text-3xl font-bold mb-4">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>
        <p className="text-gray-400">Content for {activeTab} section coming soon...</p>
        </div>
    );
    };

    // Client Dashboard
    const ClientDashboard = ({ activeTab }) => {
    const progressData = [
        { name: 'Week 1', weight: 85 },
        { name: 'Week 2', weight: 84 },
        { name: 'Week 3', weight: 83 },
        { name: 'Week 4', weight: 82 },
    ];

    const todayWorkout = [
        { exercise: 'Bench Press', sets: 4, reps: 12, rest: 60 },
        { exercise: 'Squats', sets: 4, reps: 15, rest: 90 },
        { exercise: 'Deadlifts', sets: 3, reps: 10, rest: 120 },
    ];

    const achievements = [
        { name: '7 Day Streak', icon: Flame, color: 'orange' },
        { name: '50 Workouts', icon: Trophy, color: 'yellow' },
        { name: '10kg Lost', icon: Target, color: 'green' },
    ];

    if (activeTab === 'overview') {
        return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white mb-6">My Dashboard</h2>
            
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={Dumbbell} label="Active Plan" value="Strength" color="purple" />
            <StatCard icon={CheckCircle} label="Today's Workout" value="Complete" color="green" />
            <StatCard icon={Flame} label="Streak" value="12 Days" color="orange" />
            <StatCard icon={Bell} label="Notifications" value="3" color="blue" />
            </div>

            {/* Progress Chart */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-white mb-4">Weight Progress</h3>
            <ResponsiveContainer width="100%" height={250}>
                <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', border: 'none' }} />
                <Line type="monotone" dataKey="weight" stroke="#10b981" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
            </div>

            {/* Today's Workout and Achievements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Today's Workout</h3>
                <div className="space-y-4">
                {todayWorkout.map((exercise, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-gray-900 rounded-lg">
                    <div>
                        <div className="text-white font-medium">{exercise.exercise}</div>
                        <div className="text-gray-400 text-sm">{exercise.sets} sets × {exercise.reps} reps</div>
                    </div>
                    <div className="text-gray-400 text-sm">Rest: {exercise.rest}s</div>
                    </div>
                ))}
                </div>
            </div>

            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Achievements</h3>
                <div className="space-y-4">
                {achievements.map((achievement, idx) => {
                    const Icon = achievement.icon;
                    return (
                    <div key={idx} className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg">
                        <div className={`p-3 rounded-full bg-${achievement.color}-500/20`}>
                        <Icon className={`text-${achievement.color}-400`} size={24} />
                        </div>
                        <span className="text-white font-medium">{achievement.name}</span>
                    </div>
                    );
                })}
                </div>
            </div>
            </div>

            {/* Motivation Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-2">Keep Going!</h3>
            <p className="text-blue-100">You're doing amazing! Stay consistent and you'll reach your goals.</p>
            </div>
        </div>
        );
    }

    return (
        <div className="text-white">
        <h2 className="text-3xl font-bold mb-4">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
        </h2>
        <p className="text-gray-400">Content for {activeTab} section coming soon...</p>
        </div>
    );
    };

    // Reusable Components
    const StatCard = ({ icon: Icon, label, value, color }) => {
    const colorClasses = {
        blue: 'bg-blue-500/20 text-blue-400',
        green: 'bg-green-500/20 text-green-400',
        yellow: 'bg-yellow-500/20 text-yellow-400',
        red: 'bg-red-500/20 text-red-400',
        purple: 'bg-purple-500/20 text-purple-400',
        orange: 'bg-orange-500/20 text-orange-400',
    };

    return (
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition">
        <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon size={24} />
            </div>
        </div>
        <div className="text-3xl font-bold text-white mb-1">{value}</div>
        <div className="text-gray-400">{label}</div>
        </div>
    );
    };

    const QuickActionButton = ({ icon: Icon, label }) => (
    <button className="bg-gray-900 hover:bg-gray-700 text-white p-4 rounded-lg border border-gray-700 flex items-center space-x-3 transition">
        <Icon size={20} className="text-blue-400" />
        <span>{label}</span>
    </button>
);

export default FitnessDashboard;