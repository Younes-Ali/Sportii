import React, { useState } from 'react';
import { Trophy, Award, Flame, Target, Zap, Star, TrendingUp, Lock, CheckCircle, Medal, Crown, Sparkles } from 'lucide-react';
import { toast } from 'react-toastify';

// ============================================
// Main Achievements Page
// ============================================
const ClientAchievements = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievements = [
    {
      id: 1,
      title: 'First Workout',
      description: 'Complete your first workout session',
      icon: Zap,
      category: 'workout',
      unlocked: true,
      unlockedDate: '2024-01-01',
      rarity: 'common',
      points: 10,
    },
    {
      id: 2,
      title: '7 Day Streak',
      description: 'Workout for 7 consecutive days',
      icon: Flame,
      category: 'streak',
      unlocked: true,
      unlockedDate: '2024-01-10',
      rarity: 'rare',
      points: 50,
    },
    {
      id: 3,
      title: '50 Workouts',
      description: 'Complete 50 workout sessions',
      icon: Trophy,
      category: 'workout',
      unlocked: true,
      unlockedDate: '2024-01-25',
      rarity: 'epic',
      points: 100,
      progress: 50,
      target: 50,
    },
    {
      id: 4,
      title: 'Weight Loss Champion',
      description: 'Lose 10kg from starting weight',
      icon: Target,
      category: 'progress',
      unlocked: false,
      rarity: 'epic',
      points: 150,
      progress: 7.2,
      target: 10,
    },
    {
      id: 5,
      title: 'Early Bird',
      description: 'Complete 20 morning workouts before 7 AM',
      icon: Star,
      category: 'workout',
      unlocked: false,
      rarity: 'rare',
      points: 75,
      progress: 12,
      target: 20,
    },
    {
      id: 6,
      title: '30 Day Warrior',
      description: 'Maintain a 30-day workout streak',
      icon: Crown,
      category: 'streak',
      unlocked: false,
      rarity: 'legendary',
      points: 300,
      progress: 12,
      target: 30,
    },
    {
      id: 7,
      title: 'Nutrition Master',
      description: 'Log meals for 30 consecutive days',
      icon: Award,
      category: 'nutrition',
      unlocked: false,
      rarity: 'epic',
      points: 120,
      progress: 18,
      target: 30,
    },
    {
      id: 8,
      title: 'Hydration Hero',
      description: 'Reach water goal for 14 days straight',
      icon: Sparkles,
      category: 'nutrition',
      unlocked: true,
      unlockedDate: '2024-01-20',
      rarity: 'rare',
      points: 60,
    },
    {
      id: 9,
      title: '100 Workout Club',
      description: 'Complete 100 workout sessions',
      icon: Medal,
      category: 'workout',
      unlocked: false,
      rarity: 'legendary',
      points: 500,
      progress: 50,
      target: 100,
    },
  ];

  const categories = [
    { id: 'all', name: 'All', icon: Trophy },
    { id: 'workout', name: 'Workout', icon: Zap },
    { id: 'streak', name: 'Streak', icon: Flame },
    { id: 'progress', name: 'Progress', icon: TrendingUp },
    { id: 'nutrition', name: 'Nutrition', icon: Award },
  ];

  const filteredAchievements = selectedCategory === 'all'
    ? achievements
    : achievements.filter((a) => a.category === selectedCategory);

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalPoints = achievements
    .filter((a) => a.unlocked)
    .reduce((sum, a) => sum + a.points, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <AchievementsHeader unlockedCount={unlockedCount} total={achievements.length} totalPoints={totalPoints} />

        {/* Categories */}
        <CategoriesFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement) => (
            <AchievementCard key={achievement.id} achievement={achievement} />
          ))}
        </div>

        {/* Milestones Section */}
        <MilestonesSection />
      </div>
    </div>
  );
};

// ============================================
// Achievements Header Component
// ============================================
const AchievementsHeader = ({ unlockedCount, total, totalPoints }) => {
  const percentage = Math.round((unlockedCount / total) * 100);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-green-500 mb-2">Achievements</h1>
          <p className="text-gray-200">Track your milestones and earn rewards</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="bg-gray-800 border border-white/50 hover:border-white px-6 py-3 rounded-lg text-center">
            <div className="text-sm text-gray-200">Total Points</div>
            <div className="text-2xl font-bold text-green-500">{totalPoints}</div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-800 border border-white/50 hover:border-white rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Trophy className="text-green-700" size={28} />
            <div>
              <div className="text-xl font-bold text-white">Overall Progress</div>
              <div className="text-sm text-gray-200">
                {unlockedCount} of {total} achievements unlocked
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold text-green-700">{percentage}%</div>
        </div>
        <div className="w-full bg-black rounded-full h-4 overflow-hidden">
          <div
            className="bg-linear-to-r from-green-500 via-green-600 to-green-700 h-full transition-all duration-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

// ============================================
// Categories Filter Component
// ============================================
const CategoriesFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="flex space-x-3 overflow-x-auto pb-2">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-5 py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 ${
              selectedCategory === category.id
                ? 'bg-green-500 text-black shadow-lg'
                : 'btn bg-gray-800 text-gray-400 hover:bg-green-400/80 border border-white/50 hover:text-black'
            }`}
          >
            <Icon size={20} />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};

// ============================================
// Achievement Card Component
// ============================================
const AchievementCard = ({ achievement }) => {
  const Icon = achievement.icon;
  const rarityColors = {
    common: { bg: 'bg-gray-500/20', text: 'text-gray-400', border: 'border-gray-500/50' },
    rare: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/50' },
    epic: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/50' },
    legendary: { bg: 'bg-primary/20', text: 'text-primary', border: 'border-primary/50' },
  };

  const rarity = rarityColors[achievement.rarity];
  const progress = achievement.progress ? (achievement.progress / achievement.target) * 100 : 0;

  return (
    <div
      className={`bg-gray-800 rounded-xl p-6 border-2 transition-all duration-300 transform hover:scale-105 border-white/50 hover:border-white ${
        achievement.unlocked
          ? `${rarity.border} hover:shadow-lg hover:shadow-${achievement.rarity === 'legendary' ? 'primary' : achievement.rarity === 'epic' ? 'purple-500' : achievement.rarity === 'rare' ? 'blue-500' : 'gray-500'}/50`
          : 'border-gray-700 opacity-60'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-16 h-16 rounded-xl flex items-center justify-center ${rarity.bg} ${
            !achievement.unlocked && 'grayscale'
          }`}
        >
          {achievement.unlocked ? (
            <Icon className={rarity.text} size={32} />
          ) : (
            <Lock className="text-gray-600" size={32} />
          )}
        </div>
        <div className="flex flex-col items-end space-y-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${rarity.bg} ${rarity.text}`}
          >
            {achievement.rarity}
          </span>
          {achievement.unlocked && (
            <CheckCircle className="text-green-400" size={20} />
          )}
        </div>
      </div>

      <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
      <p className="text-sm text-gray-400 mb-4">{achievement.description}</p>

      {/* Progress Bar for Locked Achievements */}
      {!achievement.unlocked && achievement.progress !== undefined && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Progress</span>
            <span className={rarity.text}>
              {achievement.progress} / {achievement.target}
            </span>
          </div>
          <div className="w-full bg-black rounded-full h-2">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                achievement.rarity === 'legendary'
                  ? 'bg-primary'
                  : achievement.rarity === 'epic'
                  ? 'bg-purple-500'
                  : achievement.rarity === 'rare'
                  ? 'bg-blue-500'
                  : 'bg-gray-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Unlocked Date and Points */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
        <div className="text-sm text-gray-400">
          {achievement.unlocked ? (
            <span>Unlocked: {new Date(achievement.unlockedDate).toLocaleDateString()}</span>
          ) : (
            <span>Locked</span>
          )}
        </div>
        <div className={`font-bold ${achievement.unlocked ? rarity.text : 'text-gray-600'}`}>
          +{achievement.points} pts
        </div>
      </div>
    </div>
  );
};

// ============================================
// Milestones Section Component
// ============================================
const MilestonesSection = () => {
  const milestones = [
    {
      id: 1,
      title: 'Bronze Tier',
      description: 'Reach 500 total points',
      points: 500,
      currentPoints: 470,
      icon: Medal,
      color: 'orange-500',
      unlocked: false,
    },
    {
      id: 2,
      title: 'Silver Tier',
      description: 'Reach 1000 total points',
      points: 1000,
      currentPoints: 470,
      icon: Medal,
      color: 'gray-500',
      unlocked: false,
    },
    {
      id: 3,
      title: 'Gold Tier',
      description: 'Reach 2000 total points',
      points: 2000,
      currentPoints: 470,
      icon: Crown,
      color: 'yellow-500',
      unlocked: false,
    },
  ];

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
        <Crown className="text-primary mr-3" size={28} />
        Tier Milestones
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {milestones.map((milestone) => {
          const Icon = milestone.icon;
          const progress = (milestone.currentPoints / milestone.points) * 100;
          return (
            <div
              key={milestone.id}
              className="bg-black/50 border border-gray-700 rounded-xl p-5 hover:border-primary/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-12 h-12 bg-${milestone.color}/20 rounded-lg flex items-center justify-center`}>
                  <Icon className={`text-${milestone.color}`} size={24} />
                </div>
                {milestone.unlocked && (
                  <CheckCircle className="text-green-400" size={20} />
                )}
              </div>
              <h4 className="text-lg font-bold text-white mb-1">{milestone.title}</h4>
              <p className="text-sm text-gray-400 mb-3">{milestone.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className={`text-${milestone.color} font-semibold`}>
                    {milestone.currentPoints} / {milestone.points}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-${milestone.color} h-full rounded-full transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientAchievements;