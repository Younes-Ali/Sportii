import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Dumbbell, CheckCircle, FlameIcon, Bell, Target, Trophy } from 'lucide-react';
import { StatCard } from '../StatCard';

export const ClientOverview = () => {
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
    { name: '7 Day Streak', icon: FlameIcon, color: 'red' },
    { name: '50 Workouts', icon: Trophy, color: 'yellow' },
    { name: '10kg Lost', icon: Target, color: 'green' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white mb-6">My Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Dumbbell} label="Active Plan" value="Strength" color="purple" />
        <StatCard icon={CheckCircle} label="Today's Workout" value="Complete" color="green" />
        <StatCard icon={FlameIcon} label="Streak" value="12 Days" color="orange" />
        <StatCard icon={Bell} label="Notifications" value="3" color="blue" />
      </div>

      <div className="bg-black rounded-xl p-6 border border-gray-700">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-black rounded-xl p-6 border border-gray-700">
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

        <div className="bg-black rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-4">Recent Achievements</h3>
          <div className="space-y-4">
            {achievements.map((achievement, idx) => {
              const Icon = achievement.icon;
              return (
                <div key={idx} className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg">
                  <div className={`p-3 rounded-full bg-${achievement.color}-500/20`}>
                    <Icon className={`text-${achievement.color}-500`} size={24} />
                  </div>
                  <span className="text-white font-medium">{achievement.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-white mb-2">Keep Going!</h3>
        <p className="text-blue-100">You're doing amazing! Stay consistent and you'll reach your goals.</p>
      </div>
    </div>
  );
};