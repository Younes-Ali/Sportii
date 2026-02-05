import React, { useState } from 'react';
import { Line, Bar, Doughnut, Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Users, TrendingUp, Target, Award, Calendar, Filter, Download, Activity, Zap } from 'lucide-react';
import { toast } from 'react-toastify';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// ============================================
// Main Analytics Page
// ============================================
const TrainerAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('all');

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <AnalyticsHeader selectedPeriod={selectedPeriod} setSelectedPeriod={setSelectedPeriod} />

        {/* Key Metrics */}
        <KeyMetrics />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ClientGrowthChart />
          <WorkoutCompletionChart />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ClientGoalsChart />
          <PerformanceRadarChart />
        </div>

        {/* Client Performance Table */}
        <ClientPerformanceTable />

        {/* Additional Stats */}
        <AdditionalStats />
      </div>
    </div>
  );
};

// ============================================
// Analytics Header Component
// ============================================
const AnalyticsHeader = ({ selectedPeriod, setSelectedPeriod }) => {
  const periods = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' },
  ];

  const handleExport = () => {
    toast.success('Exporting analytics report...');
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Analytics Dashboard</h1>
        <p className="text-gray-200">Track client performance and business metrics</p>
      </div>
      <div className="flex items-center space-x-3">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-yellow transition-all duration-300"
        >
          {periods.map((period) => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </select>
        <button
          onClick={handleExport}
          className="bg-gray-800 hover:bg-yellow text-white hover:text-black font-bold px-4 py-2 rounded-lg transition-all duration-300 flex items-center space-x-2"
        >
          <Download size={20} />
          <span>Export</span>
        </button>
      </div>
    </div>
  );
};

// ============================================
// Key Metrics Component
// ============================================
const KeyMetrics = () => {
  const metrics = [
    {
      label: 'Total Clients',
      value: '42',
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'primary',
    },
    {
      label: 'Active Plans',
      value: '38',
      change: '+12%',
      trend: 'up',
      icon: Target,
      color: 'blue-500',
    },
    {
      label: 'Avg Completion',
      value: '87%',
      change: '+5%',
      trend: 'up',
      icon: Activity,
      color: 'green-500',
    },
    {
      label: 'Client Retention',
      value: '94%',
      change: '+2%',
      trend: 'up',
      icon: Award,
      color: 'purple-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <div
            key={index}
            className="bg-gray-800 border border-white/50 hover:border-white rounded-xl p-5 transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 bg-${metric.color}/20 rounded-lg flex items-center justify-center`}>
                <Icon className={`text-${metric.color}`} size={24} />
              </div>
              <span className={`text-sm font-semibold ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {metric.change}
              </span>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{metric.value}</div>
            <div className="text-sm text-gray-200">{metric.label}</div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================
// Client Growth Chart Component
// ============================================
const ClientGrowthChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Clients',
        data: [5, 8, 6, 10, 7, 12],
        borderColor: '#f7bb17',
        backgroundColor: 'rgba(247, 187, 23, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#f7bb17',
        pointBorderColor: '#000',
        pointBorderWidth: 2,
      },
      {
        label: 'Total Clients',
        data: [25, 33, 39, 49, 56, 68],
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#000',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
          padding: 15,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#f7bb17',
        bodyColor: '#fff',
        borderColor: '#f7bb17',
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      y: {
        grid: { color: '#3c3c3c' },
        ticks: { color: '#9ca3af' },
      },
      x: {
        grid: { color: '#3c3c3c' },
        ticks: { color: '#9ca3af' },
      },
    },
  };

  return (
    <div className="bg-gray-800 border border-white/50 hover:border-white rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-4">Client Growth</h3>
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

// ============================================
// Workout Completion Chart Component
// ============================================
const WorkoutCompletionChart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Completed',
        data: [32, 38, 35, 40, 37, 28, 20],
        backgroundColor: '#10b981',
        borderRadius: 8,
      },
      {
        label: 'Missed',
        data: [6, 4, 7, 3, 5, 8, 12],
        backgroundColor: '#ef4444',
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
          padding: 15,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#f7bb17',
        bodyColor: '#fff',
        borderColor: '#f7bb17',
        borderWidth: 1,
        padding: 12,
      },
    },
    scales: {
      y: {
        stacked: true,
        grid: { color: '#3c3c3c' },
        ticks: { color: '#9ca3af' },
      },
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { color: '#9ca3af' },
      },
    },
  };

  return (
    <div className="bg-gray-800 border border-white/50 hover:border-white rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-4">Workout Completion Rate</h3>
      <div className="h-80">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

// ============================================
// Client Goals Chart Component
// ============================================
const ClientGoalsChart = () => {
  const data = {
    labels: ['Weight Loss', 'Muscle Gain', 'Endurance', 'Strength', 'General Fitness'],
    datasets: [
      {
        data: [35, 28, 15, 12, 10],
        backgroundColor: [
          '#f7bb17',
          '#3b82f6',
          '#10b981',
          '#8b5cf6',
          '#ef4444',
        ],
        borderColor: '#000',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          padding: 15,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#f7bb17',
        bodyColor: '#fff',
        borderColor: '#f7bb17',
        borderWidth: 1,
        padding: 12,
      },
    },
  };

  return (
    <div className="bg-gray-800 border border-white/50 hover:border-white rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-4">Client Goals Distribution</h3>
      <div className="h-80 flex items-center justify-center">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

// ============================================
// Performance Radar Chart Component
// ============================================
const PerformanceRadarChart = () => {
  const data = {
    labels: ['Client Satisfaction', 'Workout Quality', 'Nutrition Adherence', 'Progress Tracking', 'Communication'],
    datasets: [
      {
        label: 'This Month',
        data: [92, 88, 85, 90, 95],
        backgroundColor: 'rgba(247, 187, 23, 0.2)',
        borderColor: '#f7bb17',
        borderWidth: 2,
        pointBackgroundColor: '#f7bb17',
        pointBorderColor: '#000',
        pointBorderWidth: 2,
      },
      {
        label: 'Last Month',
        data: [85, 82, 80, 85, 88],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: '#3b82f6',
        borderWidth: 2,
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#000',
        pointBorderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
          padding: 15,
          font: { size: 12 },
        },
      },
    },
    scales: {
      r: {
        angleLines: { color: '#3c3c3c' },
        grid: { color: '#3c3c3c' },
        pointLabels: {
          color: '#9ca3af',
          font: { size: 11 },
        },
        ticks: {
          color: '#9ca3af',
          backdropColor: 'transparent',
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 border border-white/50 hover:border-white rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-4">Performance Metrics</h3>
      <div className="h-80 flex items-center justify-center">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
};

// ============================================
// Client Performance Table Component
// ============================================
const ClientPerformanceTable = () => {
  const clients = [
    { id: 1, name: 'Sarah Johnson', goal: 'Weight Loss', workouts: 18, completion: 95, progress: 'Excellent', trend: 'up' },
    { id: 2, name: 'Mike Chen', goal: 'Muscle Gain', workouts: 20, completion: 90, progress: 'Excellent', trend: 'up' },
    { id: 3, name: 'Emma Davis', goal: 'Endurance', workouts: 16, completion: 88, progress: 'Good', trend: 'up' },
    { id: 4, name: 'James Wilson', goal: 'Weight Loss', workouts: 12, completion: 75, progress: 'Fair', trend: 'down' },
    { id: 5, name: 'Lisa Brown', goal: 'Strength', workouts: 19, completion: 92, progress: 'Excellent', trend: 'up' },
  ];

  const getProgressColor = (progress) => {
    switch (progress) {
      case 'Excellent':
        return 'text-green-400 bg-green-500/20';
      case 'Good':
        return 'text-blue-400 bg-blue-500/20';
      case 'Fair':
        return 'text-yellow-400 bg-yellow-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="bg-gray-800 border border-white/50 hover:border-white rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-4">Top Performing Clients</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-black">
            <tr>
              <th className="text-left text-gray-200 font-medium px-4 py-3">Client</th>
              <th className="text-left text-gray-200 font-medium px-4 py-3">Goal</th>
              <th className="text-center text-gray-200 font-medium px-4 py-3">Workouts</th>
              <th className="text-center text-gray-200 font-medium px-4 py-3">Completion</th>
              <th className="text-center text-gray-200 font-medium px-4 py-3">Progress</th>
              <th className="text-center text-gray-200 font-medium px-4 py-3">Trend</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id} className="border-t border-gray-700 hover:bg-black/50 transition-all duration-300">
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={`https://ui-avatars.com/api/?name=${client.name}&background=f7bb17&color=000`}
                      alt={client.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <span className="text-white font-medium">{client.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-300">{client.goal}</td>
                <td className="px-4 py-3 text-center text-white font-semibold">{client.workouts}</td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-16 bg-black rounded-full h-2">
                      <div
                        className="bg-green-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${client.completion}%` }}
                      />
                    </div>
                    <span className="text-white font-semibold text-sm">{client.completion}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getProgressColor(client.progress)}`}>
                    {client.progress}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <TrendingUp
                    className={`mx-auto ${client.trend === 'up' ? 'text-green-400' : 'text-red-400 rotate-180'}`}
                    size={20}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================
// Additional Stats Component
// ============================================
const AdditionalStats = () => {
  const stats = [
    { label: 'Avg Session Duration', value: '52 mins', icon: Calendar, color: 'primary' },
    { label: 'Total Workouts This Month', value: '856', icon: Zap, color: 'blue-500' },
    { label: 'Client Check-ins', value: '124', icon: Activity, color: 'green-500' },
    { label: 'Plans Created', value: '18', icon: Target, color: 'purple-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-gray-800 border border-white/50 hover:border-white rounded-xl p-5 transition-all duration-300"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-10 h-10 bg-${stat.color}/20 rounded-lg flex items-center justify-center`}>
                <Icon className={`text-${stat.color}`} size={20} />
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
            <div className="text-2xl font-bold text-white">{stat.value}</div>
          </div>
        );
      })}
    </div>
  );
};

export default TrainerAnalytics;