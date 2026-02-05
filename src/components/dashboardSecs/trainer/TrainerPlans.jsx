import React, { useState } from 'react';
import { Plus, Search, Filter, Edit, Trash2, Copy, Users, Dumbbell, Apple, Calendar, Clock, Target, TrendingUp } from 'lucide-react';
import { toast } from 'react-toastify';

// ============================================
// Main Plans Page
// ============================================
const TrainerPlans = () => {
  const [activeTab, setActiveTab] = useState('workout');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const workoutPlans = [
    {
      id: 1,
      name: 'Beginner Full Body',
      description: 'Perfect for those starting their fitness journey',
      difficulty: 'beginner',
      duration: '4 weeks',
      frequency: '3x per week',
      exercises: 12,
      assignedTo: 5,
      createdDate: '2024-01-15',
      tags: ['Full Body', 'Beginner', 'Strength'],
    },
    {
      id: 2,
      name: 'Advanced Muscle Building',
      description: 'Intensive program for muscle hypertrophy',
      difficulty: 'advanced',
      duration: '8 weeks',
      frequency: '5x per week',
      exercises: 24,
      assignedTo: 12,
      createdDate: '2024-01-10',
      tags: ['Hypertrophy', 'Advanced', 'Mass Gain'],
    },
    {
      id: 3,
      name: 'Fat Loss Circuit',
      description: 'High-intensity circuit training for fat loss',
      difficulty: 'intermediate',
      duration: '6 weeks',
      frequency: '4x per week',
      exercises: 18,
      assignedTo: 8,
      createdDate: '2024-01-20',
      tags: ['Fat Loss', 'HIIT', 'Circuit'],
    },
    {
      id: 4,
      name: 'Strength & Power',
      description: 'Build explosive strength and power',
      difficulty: 'intermediate',
      duration: '12 weeks',
      frequency: '4x per week',
      exercises: 20,
      assignedTo: 6,
      createdDate: '2024-01-12',
      tags: ['Strength', 'Power', 'Intermediate'],
    },
  ];

  const nutritionPlans = [
    {
      id: 1,
      name: 'Muscle Gain Diet',
      description: 'High protein diet for muscle building',
      calories: 3000,
      protein: 200,
      carbs: 350,
      fats: 80,
      meals: 6,
      assignedTo: 10,
      createdDate: '2024-01-18',
      tags: ['Bulking', 'High Protein'],
    },
    {
      id: 2,
      name: 'Fat Loss Meal Plan',
      description: 'Calorie deficit with optimal macros',
      calories: 1800,
      protein: 150,
      carbs: 150,
      fats: 60,
      meals: 5,
      assignedTo: 15,
      createdDate: '2024-01-14',
      tags: ['Cutting', 'Low Calorie'],
    },
    {
      id: 3,
      name: 'Maintenance Diet',
      description: 'Balanced nutrition for weight maintenance',
      calories: 2400,
      protein: 170,
      carbs: 250,
      fats: 75,
      meals: 5,
      assignedTo: 7,
      createdDate: '2024-01-22',
      tags: ['Maintenance', 'Balanced'],
    },
  ];

  const filteredWorkoutPlans = workoutPlans.filter((plan) => {
    const matchesSearch = plan.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || plan.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const filteredNutritionPlans = nutritionPlans.filter((plan) =>
    plan.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <PlansHeader />

        {/* Tabs */}
        <PlansTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Filters and Search */}
        <FiltersSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}
          activeTab={activeTab}
        />

        {/* Stats Overview */}
        <StatsOverview
          workoutPlans={workoutPlans}
          nutritionPlans={nutritionPlans}
          activeTab={activeTab}
        />

        {/* Plans Grid */}
        {activeTab === 'workout' ? (
          <WorkoutPlansGrid plans={filteredWorkoutPlans} />
        ) : (
          <NutritionPlansGrid plans={filteredNutritionPlans} />
        )}
      </div>
    </div>
  );
};

// ============================================
// Plans Header Component
// ============================================
const PlansHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-blue-600 mb-2">Training Plans</h1>
        <p className="text-gray-200">Create and manage workout & nutrition plans</p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-500 text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
        <Plus size={20} />
        <span>Create New Plan</span>
      </button>
    </div>
  );
};

// ============================================
// Plans Tabs Component
// ============================================
const PlansTabs = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'workout', label: 'Workout Plans', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrition Plans', icon: Apple },
  ];

  return (
    <div className="flex space-x-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-blue-600 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 border border-gray-700'
            }`}
          >
            <Icon size={20} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// ============================================
// Filters Section Component
// ============================================
const FiltersSection = ({ searchQuery, setSearchQuery, selectedDifficulty, setSelectedDifficulty, activeTab }) => {
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced'];

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search plans..."
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-600 transition-all duration-300"
        />
      </div>

      {/* Difficulty Filter (Workout only) */}
      {activeTab === 'workout' && (
        <div className="flex items-center space-x-2">
          <Filter className="text-gray-400" size={20} />
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-600 transition-all duration-300 capitalize"
          >
            {difficulties.map((diff) => (
              <option key={diff} value={diff} className="capitalize">
                {diff}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

// ============================================
// Stats Overview Component
// ============================================
const StatsOverview = ({ workoutPlans, nutritionPlans, activeTab }) => {
  const totalWorkoutPlans = workoutPlans.length;
  const totalNutritionPlans = nutritionPlans.length;
  const totalAssigned = activeTab === 'workout'
    ? workoutPlans.reduce((sum, plan) => sum + plan.assignedTo, 0)
    : nutritionPlans.reduce((sum, plan) => sum + plan.assignedTo, 0);

  const stats = activeTab === 'workout'
    ? [
        { label: 'Total Plans', value: totalWorkoutPlans, icon: Dumbbell, color: 'primary' },
        { label: 'Assigned Clients', value: totalAssigned, icon: Users, color: 'blue-500' },
        { label: 'Total Exercises', value: workoutPlans.reduce((sum, p) => sum + p.exercises, 0), icon: Target, color: 'green-500' },
      ]
    : [
        { label: 'Total Plans', value: totalNutritionPlans, icon: Apple, color: 'primary' },
        { label: 'Assigned Clients', value: totalAssigned, icon: Users, color: 'blue-500' },
        { label: 'Avg Calories', value: Math.round(nutritionPlans.reduce((sum, p) => sum + p.calories, 0) / nutritionPlans.length), icon: TrendingUp, color: 'green-500' },
      ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-200 mb-1">{stat.label}</div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
              </div>
              <div className={`w-14 h-14 bg-${stat.color}/20 rounded-lg flex items-center justify-center`}>
                <Icon className={`text-${stat.color}`} size={28} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================
// Workout Plans Grid Component
// ============================================
const WorkoutPlansGrid = ({ plans }) => {
  const handleEdit = (planId) => {
    toast.info(`Editing plan ${planId}`);
  };

  const handleDuplicate = (planId) => {
    toast.success(`Plan ${planId} duplicated!`);
  };

  const handleDelete = (planId) => {
    toast.error(`Plan ${planId} deleted!`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <WorkoutPlanCard
          key={plan.id}
          plan={plan}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

// ============================================
// Workout Plan Card Component
// ============================================
const WorkoutPlanCard = ({ plan, onEdit, onDuplicate, onDelete }) => {
  const difficultyColors = {
    beginner: { bg: 'bg-green-500/20', text: 'text-green-400', border: 'border-green-500/50' },
    intermediate: { bg: 'bg-primary/20', text: 'text-primary', border: 'border-primary/50' },
    advanced: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/50' },
  };

  const difficulty = difficultyColors[plan.difficulty];

  return (
    <div className={`bg-gray-800 rounded-xl p-6 border-2 ${difficulty.border} hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
          <p className="text-sm text-gray-400">{plan.description}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${difficulty.bg} ${difficulty.text}`}>
          {plan.difficulty}
        </span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-black/50 p-3 rounded-lg">
          <Clock className="text-yellow mb-1" size={16} />
          <div className="text-xs text-gray-200">Duration</div>
          <div className="text-sm font-bold text-white">{plan.duration}</div>
        </div>
        <div className="bg-black/50 p-3 rounded-lg">
          <Calendar className="text-primary mb-1" size={16} />
          <div className="text-xs text-gray-200">Frequency</div>
          <div className="text-sm font-bold text-white">{plan.frequency}</div>
        </div>
        <div className="bg-black/50 p-3 rounded-lg">
          <Target className="text-green-500 mb-1" size={16} />
          <div className="text-xs text-gray-200">Exercises</div>
          <div className="text-sm font-bold text-white">{plan.exercises}</div>
        </div>
        <div className="bg-black/50 p-3 rounded-lg">
          <Users className="text-blue-500 mb-1" size={16} />
          <div className="text-xs text-gray-200">Assigned</div>
          <div className="text-sm font-bold text-white">{plan.assignedTo}</div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {plan.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-black/50 text-xs text-gray-200 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(plan.id)}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Edit size={16} />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDuplicate(plan.id)}
          className="bg-gray-900 hover:bg-black/70 text-white p-2 rounded-lg border border-gray-700 transition-all duration-300"
        >
          <Copy size={16} />
        </button>
        <button
          onClick={() => onDelete(plan.id)}
          className="bg-gray-900 hover:bg-red-500/20 text-red-400 p-2 rounded-lg border border-gray-700 hover:border-red-500/50 transition-all duration-300"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

// ============================================
// Nutrition Plans Grid Component
// ============================================
const NutritionPlansGrid = ({ plans }) => {
  const handleEdit = (planId) => {
    toast.info(`Editing nutrition plan ${planId}`);
  };

  const handleDuplicate = (planId) => {
    toast.success(`Nutrition plan ${planId} duplicated!`);
  };

  const handleDelete = (planId) => {
    toast.error(`Nutrition plan ${planId} deleted!`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <NutritionPlanCard
          key={plan.id}
          plan={plan}
          onEdit={handleEdit}
          onDuplicate={handleDuplicate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

// ============================================
// Nutrition Plan Card Component
// ============================================
const NutritionPlanCard = ({ plan, onEdit, onDuplicate, onDelete }) => {
  return (
    <div className="bg-secondary rounded-xl p-6 border-2 border-green-500/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
          <p className="text-sm text-gray-400">{plan.description}</p>
        </div>
      </div>

      {/* Macros */}
      <div className="bg-black/50 p-4 rounded-lg mb-4">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <div className="text-xs text-gray-400">Calories</div>
            <div className="text-lg font-bold text-primary">{plan.calories}</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Protein</div>
            <div className="text-lg font-bold text-blue-400">{plan.protein}g</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Carbs</div>
            <div className="text-lg font-bold text-green-400">{plan.carbs}g</div>
          </div>
          <div>
            <div className="text-xs text-gray-400">Fats</div>
            <div className="text-lg font-bold text-purple-400">{plan.fats}g</div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-black/50 p-3 rounded-lg">
          <Apple className="text-primary mb-1" size={16} />
          <div className="text-xs text-gray-400">Meals per day</div>
          <div className="text-sm font-bold text-white">{plan.meals}</div>
        </div>
        <div className="bg-black/50 p-3 rounded-lg">
          <Users className="text-primary mb-1" size={16} />
          <div className="text-xs text-gray-400">Assigned</div>
          <div className="text-sm font-bold text-white">{plan.assignedTo}</div>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {plan.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-black/50 text-xs text-gray-400 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(plan.id)}
          className="flex-1 bg-primary hover:bg-primary-light text-black font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
        >
          <Edit size={16} />
          <span>Edit</span>
        </button>
        <button
          onClick={() => onDuplicate(plan.id)}
          className="bg-secondary hover:bg-black/70 text-white p-2 rounded-lg border border-gray-700 transition-all duration-300"
        >
          <Copy size={16} />
        </button>
        <button
          onClick={() => onDelete(plan.id)}
          className="bg-secondary hover:bg-red-500/20 text-red-400 p-2 rounded-lg border border-gray-700 hover:border-red-500/50 transition-all duration-300"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TrainerPlans;