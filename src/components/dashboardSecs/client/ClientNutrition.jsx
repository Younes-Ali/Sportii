import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Apple, Droplet, Plus, Utensils, TrendingUp, Target } from 'lucide-react';
import { toast } from 'react-toastify';

ChartJS.register(ArcElement, Tooltip, Legend);

// ============================================
// Main Nutrition Page
// ============================================
const ClientNutrition = () => {
  const [waterGlasses, setWaterGlasses] = useState(5);
  const targetWater = 8;

  const dailyMacros = {
    calories: { consumed: 1650, target: 2200 },
    protein: { consumed: 120, target: 150 },
    carbs: { consumed: 180, target: 250 },
    fats: { consumed: 55, target: 70 },
  };

  const meals = [
    {
      id: 1,
      name: 'Breakfast',
      time: '08:00 AM',
      foods: ['Oatmeal with Banana', '2 Eggs', 'Green Tea'],
      calories: 450,
      protein: 25,
      completed: true,
    },
    {
      id: 2,
      name: 'Lunch',
      time: '01:00 PM',
      foods: ['Grilled Chicken Breast', 'Brown Rice', 'Mixed Vegetables'],
      calories: 650,
      protein: 55,
      completed: true,
    },
    {
      id: 3,
      name: 'Snack',
      time: '04:00 PM',
      foods: ['Greek Yogurt', 'Almonds', 'Apple'],
      calories: 350,
      protein: 20,
      completed: true,
    },
    {
      id: 4,
      name: 'Dinner',
      time: '07:00 PM',
      foods: ['Salmon', 'Sweet Potato', 'Broccoli'],
      calories: 550,
      protein: 45,
      completed: false,
    },
  ];

  const handleAddWater = () => {
    if (waterGlasses < targetWater) {
      setWaterGlasses(prev => prev + 1);
      toast.success('Great! Keep hydrated! 💧');
    } else {
      toast.info('Daily water goal achieved! 🎉');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <NutritionHeader />

        {/* Macros Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MacrosCard macros={dailyMacros} />
          <WaterIntakeCard glasses={waterGlasses} target={targetWater} onAdd={handleAddWater} />
        </div>

        {/* Meals Section */}
        <MealsSection meals={meals} />

        {/* Tips Section */}
        <NutritionTips />
      </div>
    </div>
  );
};

// ============================================
// Nutrition Header Component
// ============================================
const NutritionHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-primary mb-2">Nutrition Plan</h1>
        <p className="text-gray-200">Track your daily meals and macros</p>
      </div>
      <button className="bg-primary hover:bg-primary-light text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
        <Plus className="inline mr-2" size={20} />
        Log Meal
      </button>
    </div>
  );
};

// ============================================
// Macros Card Component
// ============================================
const MacrosCard = ({ macros }) => {
  const chartData = {
    labels: ['Protein', 'Carbs', 'Fats'],
    datasets: [
      {
        data: [macros.protein.consumed, macros.carbs.consumed, macros.fats.consumed],
        backgroundColor: ['#605dff', '#297fff', '#0cc952'],
        borderColor: ['#000', '#000', '#000'],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#fff',
          font: { size: 12 },
          padding: 15,
        },
      },
    },
    maintainAspectRatio: false,
  };

  const caloriePercentage = Math.round((macros.calories.consumed / macros.calories.target) * 100);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-white">Today's Macros</h3>
        <Apple className="text-primary" size={28} />
      </div>

      {/* Calories Progress */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-200">Calories</span>
          <span className="text-primary font-bold">
            {macros.calories.consumed} / {macros.calories.target} kcal
          </span>
        </div>
        <div className="w-full bg-black rounded-full h-3 overflow-hidden">
          <div
            className="bg-linear-r from-primary to-primary-light h-full transition-all duration-500"
            style={{ width: `${caloriePercentage}%` }}
          />
        </div>
      </div>

      {/* Macro Bars */}
      <div className="space-y-4 mb-6">
        <MacroBar label="Protein" consumed={macros.protein.consumed} target={macros.protein.target} color="primary" />
        <MacroBar label="Carbs" consumed={macros.carbs.consumed} target={macros.carbs.target} color="blue-500" />
        <MacroBar label="Fats" consumed={macros.fats.consumed} target={macros.fats.target} color="green-500" />
      </div>

      {/* Chart */}
      <div className="h-48">
        <Pie data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

// ============================================
// Macro Bar Component
// ============================================
const MacroBar = ({ label, consumed, target, color }) => {
  const percentage = Math.round((consumed / target) * 100);

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-200">{label}</span>
        <span className="text-white font-semibold">
          {consumed}g / {target}g
        </span>
      </div>
      <div className="w-full bg-black rounded-full h-2">
        <div
          className={`bg-${color} h-full rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// ============================================
// Water Intake Card Component
// ============================================
const WaterIntakeCard = ({ glasses, target, onAdd }) => {
  const percentage = Math.round((glasses / target) * 100);

  return (
    <div className="bg-linear-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-white">Water Intake</h3>
        <Droplet className="text-blue-400" size={28} />
      </div>

      <div className="text-center mb-6">
        <div className="text-6xl font-bold text-blue-400 mb-2">
          {glasses} / {target}
        </div>
        <div className="text-gray-400">Glasses Today</div>
      </div>

      {/* Progress Ring Visual */}
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="transform -rotate-90" width="192" height="192">
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="#1e293b"
            strokeWidth="12"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r="88"
            stroke="#3b82f6"
            strokeWidth="12"
            fill="none"
            strokeDasharray={`${2 * Math.PI * 88}`}
            strokeDashoffset={`${2 * Math.PI * 88 * (1 - percentage / 100)}`}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400">{percentage}%</div>
            <div className="text-sm text-gray-400">Complete</div>
          </div>
        </div>
      </div>

      <button
        onClick={onAdd}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        <Plus className="inline mr-2" size={20} />
        Add Glass
      </button>
    </div>
  );
};

// ============================================
// Meals Section Component
// ============================================
const MealsSection = ({ meals }) => {
  return (
    <div className="bg-gray-800 border border-white/50 hover:border-white rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
        <Utensils className="text-primary mr-3" size={28} />
        Today's Meals
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {meals.map((meal) => (
          <MealCard key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

// ============================================
// Meal Card Component
// ============================================
const MealCard = ({ meal }) => {
  return (
    <div
      className={`p-5 rounded-xl transition-all duration-300 ${
        meal.completed
          ? 'bg-green-500/10 border-2 border-green-500/50'
          : 'bg-black/50 border border-gray-700 hover:border-primary/50'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div>
          <h4 className="text-xl font-bold text-white">{meal.name}</h4>
          <p className="text-sm text-gray-400">{meal.time}</p>
        </div>
        {meal.completed && (
          <div className="bg-green-500 text-white p-2 rounded-full">
            <Target size={20} />
          </div>
        )}
      </div>

      <div className="space-y-1 mb-4">
        {meal.foods.map((food, index) => (
          <div key={index} className="text-sm text-gray-300">
            • {food}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-700">
        <div className="text-center">
          <div className="text-xs text-gray-400">Calories</div>
          <div className="text-lg font-bold text-primary">{meal.calories}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-400">Protein</div>
          <div className="text-lg font-bold text-primary">{meal.protein}g</div>
        </div>
        <button
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
            meal.completed
              ? 'bg-green-600 text-white cursor-default'
              : 'bg-primary hover:bg-primary-light text-black'
          }`}
        >
          {meal.completed ? 'Completed' : 'Log'}
        </button>
      </div>
    </div>
  );
};

// ============================================
// Nutrition Tips Component
// ============================================
const NutritionTips = () => {
  const tips = [
    {
      title: 'Stay Hydrated',
      description: 'Drink at least 8 glasses of water daily for optimal performance',
      icon: Droplet,
      color: 'blue',
    },
    {
      title: 'Protein Timing',
      description: 'Consume protein within 30 minutes after workout for muscle recovery',
      icon: TrendingUp,
      color: 'orange',
    },
    {
      title: 'Balanced Meals',
      description: 'Include all macros in every meal for sustained energy',
      icon: Apple,
      color: 'green',
    },
  ];

  return (
    <div className="bg-gray-800 border border-white/50 hover:border-white rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-4">Nutrition Tips</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tips.map((tip, index) => {
          const Icon = tip.icon;
          return (
            <div
              key={index}
              className="bg-black/50 border border-gray-700 p-4 rounded-xl hover:border-primary/50 transition-all duration-300"
            >
              <div className={`w-12 h-12 bg-${tip.color}-500/20 rounded-full flex items-center justify-center mb-3`}>
                <Icon className={`text-${tip.color}-400`} size={24} />
              </div>
              <h4 className="text-lg font-bold text-white mb-2">{tip.title}</h4>
              <p className="text-sm text-gray-400">{tip.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientNutrition;