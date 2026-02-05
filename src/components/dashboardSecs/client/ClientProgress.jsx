import React, { useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { TrendingDown, Camera, Ruler, Scale, Calendar, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-toastify';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler);

// ============================================
// Main Progress Page
// ============================================
const ClientProgress = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('1M');
  
  const weightData = [
    { date: '2024-01-01', weight: 85, bodyFat: 22 },
    { date: '2024-01-08', weight: 84.2, bodyFat: 21.5 },
    { date: '2024-01-15', weight: 83.5, bodyFat: 21 },
    { date: '2024-01-22', weight: 83, bodyFat: 20.5 },
    { date: '2024-01-29', weight: 82.3, bodyFat: 20 },
  ];

  const measurements = {
    chest: { current: 102, previous: 105, change: -3 },
    waist: { current: 85, previous: 90, change: -5 },
    hips: { current: 98, previous: 100, change: -2 },
    biceps: { current: 38, previous: 36, change: 2 },
    thighs: { current: 58, previous: 60, change: -2 },
  };

  const progressPhotos = [
    { id: 1, date: '2024-01-01', url: 'https://via.placeholder.com/300x400/3c3c3c/f7bb17?text=Week+1', week: 'Week 1' },
    { id: 2, date: '2024-01-15', url: 'https://via.placeholder.com/300x400/3c3c3c/f7bb17?text=Week+3', week: 'Week 3' },
    { id: 3, date: '2024-01-29', url: 'https://via.placeholder.com/300x400/3c3c3c/f7bb17?text=Week+5', week: 'Week 5' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white md:p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <ProgressHeader />

        {/* Stats Overview */}
        <StatsOverview weightData={weightData} />

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WeightChart data={weightData} period={selectedPeriod} setPeriod={setSelectedPeriod} />
          <BodyFatChart data={weightData} />
        </div>

        {/* Measurements */}
        <MeasurementsSection measurements={measurements} />

        {/* Progress Photos */}
        <ProgressPhotosSection photos={progressPhotos} />
      </div>
    </div>
  );
};

// ============================================
// Progress Header Component
// ============================================
const ProgressHeader = () => {
  return (
    <div className="flex items-center justify-between flex-wrap">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">My Progress</h1>
        <p className="text-gray-400">Track your transformation journey</p>
      </div>
      <button className="bg-yellow hover:bg-primary-light text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 mt-2 md:mt-0" onClick={() => toast.info('Add Progress Entry functionality coming soon!')}>
        <Plus className="inline mr-2" size={20} />
        Add Entry
      </button>
    </div>
  );
};

// ============================================
// Stats Overview Component
// ============================================
const StatsOverview = ({ weightData }) => {
  const latestWeight = weightData[weightData.length - 1].weight;
  const startWeight = weightData[0].weight;
  const weightLost = startWeight - latestWeight;
  const weightChangePercent = ((weightLost / startWeight) * 100).toFixed(1);

  const stats = [
    {
      label: 'Current Weight',
      value: `${latestWeight} kg`,
      icon: Scale,
      color: 'red-500',
    },
    {
      label: 'Weight Lost',
      value: `${weightLost.toFixed(1)} kg`,
      icon: TrendingDown,
      color: 'green-500',
      change: `${weightChangePercent}%`,
    },
    {
      label: 'Days Active',
      value: '29',
      icon: Calendar,
      color: 'blue-500',
    },
    {
      label: 'Body Fat',
      value: `${weightData[weightData.length - 1].bodyFat}%`,
      icon: Ruler,
      color: 'purple-500',
      change: '-2%',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-gray-800 border border-white/50 hover:border-white rounded-xl p-5 transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-12 h-12 bg-${stat.color}/20 rounded-lg flex items-center justify-center`}>
                <Icon className={`text-${stat.color}`} size={24} />
              </div>
              {stat.change && (
                <span className="text-green-400 text-sm font-semibold">{stat.change}</span>
              )}
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================
// Weight Chart Component
// ============================================
const WeightChart = ({ data, period, setPeriod }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
  };

  const chartData = {
    labels: data.map((d) => formatDate(d.date)),
    datasets: [
      {
        label: 'Weight (kg)',
        data: data.map((d) => d.weight),
        borderColor: '#f7bb17',
        backgroundColor: 'rgba(247, 187, 23, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointBackgroundColor: '#f7bb17',
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
        display: false,
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#f7bb17',
        bodyColor: '#fff',
        borderColor: '#f7bb17',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: '#3c3c3c',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      x: {
        grid: {
          color: '#3c3c3c',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
  };

  const periods = ['1W', '1M', '3M', '6M', '1Y'];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h3 className="text-2xl font-bold text-white">Weight Progress</h3>
        <div className="flex space-x-2">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-lg text-sm font-semibold transition-all duration-300 ${
                period === p
                  ? 'bg-yellow text-black'
                  : 'bg-black/50 text-gray-400 hover:bg-black/70'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

// ============================================
// Body Fat Chart Component
// ============================================
const BodyFatChart = ({ data }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}`;
  };

  const chartData = {
    labels: data.map((d) => formatDate(d.date)),
    datasets: [
      {
        label: 'Body Fat %',
        data: data.map((d) => d.bodyFat),
        backgroundColor: '#3b82f6',
        borderColor: '#3b82f6',
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        titleColor: '#3b82f6',
        bodyColor: '#fff',
        borderColor: '#3b82f6',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: '#3c3c3c',
        },
        ticks: {
          color: '#9ca3af',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-4">Body Fat Progress</h3>
      <div className="h-64">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

// ============================================
// Measurements Section Component
// ============================================
const MeasurementsSection = ({ measurements }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <Ruler className="text-primary mr-3" size={28} />
          Body Measurements
        </h3>
        <button className="text-primary hover:text-primary-light font-semibold transition-all duration-300">
          Update Measurements
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {Object.entries(measurements).map(([key, value]) => (
          <MeasurementCard key={key} name={key} data={value} />
        ))}
      </div>
    </div>
  );
};

// ============================================
// Measurement Card Component
// ============================================
const MeasurementCard = ({ name, data }) => {
  const isPositive = data.change > 0;
  const isNegative = data.change < 0;

  return (
    <div className="bg-black/50 border border-white/50 rounded-xl p-4 hover:border-white transition-all duration-300">
      <div className="text-sm text-gray-400 mb-2 capitalize">{name}</div>
      <div className="text-3xl font-bold text-white mb-2">{data.current} cm</div>
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-400">Previous: {data.previous} cm</span>
        <span
          className={`font-semibold ${
            isPositive && name === 'biceps'
              ? 'text-green-400'
              : isNegative && name !== 'biceps'
              ? 'text-green-400'
              : isPositive
              ? 'text-red-400'
              : 'text-gray-400'
          }`}
        >
          {data.change > 0 ? '+' : ''}
          {data.change} cm
        </span>
      </div>
    </div>
  );
};

// ============================================
// Progress Photos Section Component
// ============================================
const ProgressPhotosSection = ({ photos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-white flex items-center">
          <Camera className="text-primary mr-3" size={28} />
          Progress Photos
        </h3>
        <button className="bg-primary hover:bg-primary-light text-black font-bold px-4 py-2 rounded-lg transition-all duration-300">
          <Camera className="inline mr-2" size={16} />
          Add Photo
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Photo Display */}
        <div className="lg:col-span-2">
          <div className="relative bg-black rounded-xl overflow-hidden group">
            <img
              src={photos[currentIndex].url}
              alt={photos[currentIndex].week}
              className="w-full h-96 object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
              <div className="text-white font-bold text-xl">{photos[currentIndex].week}</div>
              <div className="text-gray-400 text-sm">{formatDate(photos[currentIndex].date)}</div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="space-y-4">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => setCurrentIndex(index)}
              className={`cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                currentIndex === index
                  ? 'ring-4 ring-primary'
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              <img src={photo.url} alt={photo.week} className="w-full h-32 object-cover" />
              <div className="bg-black p-2">
                <div className="text-white text-sm font-semibold">{photo.week}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientProgress;