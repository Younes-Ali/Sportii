import React, { useState, useEffect } from 'react';
import { Dumbbell, Clock, Flame, CheckCircle, Play, Pause, SkipForward } from 'lucide-react';
import { toast } from 'react-toastify';

// ============================================
// Main Workout Page
// ============================================
const ClientWorkout = () => {
  const [activeDay, setActiveDay] = useState('Monday');

  const todayWorkout = {
    name: 'Upper Body Strength',
    duration: '45 mins',
    exercises: [
      { id: 1, name: 'Bench Press', sets: 4, reps: 12, rest: 90, completed: false },
      { id: 2, name: 'Incline Dumbbell Press', sets: 3, reps: 15, rest: 60, completed: false },
      { id: 3, name: 'Cable Flyes', sets: 3, reps: 12, rest: 60, completed: false },
      { id: 4, name: 'Shoulder Press', sets: 4, reps: 10, rest: 90, completed: false },
      { id: 5, name: 'Lateral Raises', sets: 3, reps: 15, rest: 45, completed: false },
    ],
    calories: 350,
  };

  const weeklyPlan = [
    { day: 'Monday', workout: 'Upper Body Strength', duration: '45 mins', completed: true },
    { day: 'Tuesday', workout: 'Lower Body Power', duration: '50 mins', completed: true },
    { day: 'Wednesday', workout: 'Rest Day', duration: '-', completed: false },
    { day: 'Thursday', workout: 'Push Day', duration: '40 mins', completed: false },
    { day: 'Friday', workout: 'Pull Day', duration: '40 mins', completed: false },
    { day: 'Saturday', workout: 'Legs & Core', duration: '45 mins', completed: false },
    { day: 'Sunday', workout: 'Active Recovery', duration: '30 mins', completed: false },
  ];

  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-500 border',
    green: 'bg-green-500/20 text-green-500 border',
    yellow: 'bg-yellow-500/20 text-yellow-500 border',
    red: 'bg-red-500/20 text-red-500 border',
    purple: 'bg-purple-500/20 text-purple-500 border',
    orange: 'bg-orange-500/20 text-orange-500 border',
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 wow animate__animated animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <WorkoutHeader />

        {/* Today's Workout Section */}
        <TodayWorkoutCard workout={todayWorkout} colorClasses={colorClasses} />

        {/* Weekly Plan */}
        <WeeklyPlanSection weeklyPlan={weeklyPlan} activeDay={activeDay} setActiveDay={setActiveDay} />

        {/* Exercise Details */}
        <ExerciseList exercises={todayWorkout.exercises} />
      </div>
    </div>
  );
};

// ============================================
// Workout Header Component
// ============================================
const WorkoutHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-black mb-2">My Workout</h1>
        <p className="text-gray-800">Track your daily exercises and progress</p>
      </div>
      <div className="flex items-center space-x-4">
        <div className="bg-yellow px-6 py-3 rounded-lg border border-primary/30">
          <div className="text-sm text-gray-900">Current Streak</div>
          <div className="text-2xl font-bold text-orange-700 flex items-center">
            <Flame className="mr-2" size={24} />
            12 Days
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Today's Workout Card Component
// ============================================
const TodayWorkoutCard = ({ workout , colorClasses }) => {
  const [progress, setProgress] = useState(80);

  return (
    <div className="bg-linear-to-br from-yellow to-transparent border border-black rounded-2xl p-6 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-black mb-1">{workout.name}</h2>
          <p className="text-gray-900">Today's Session</p>
        </div>
        <div className="bg-black/80 p-4 rounded-full">
          <Dumbbell className="text-yellow" size={32} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <StatBadge icon={Clock} label="Duration" value={workout.duration} color={colorClasses.red} />
        <StatBadge icon={Dumbbell} label="Exercises" value={workout.exercises.length} color={colorClasses.blue} />
        <StatBadge icon={Flame} label="Calories" value={`${workout.calories} kcal`} color={colorClasses.green} />
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-900">Progress</span>
          <span className="text-primary font-semibold">{progress}%</span>
        </div>
        <div className="w-full rounded-full h-3 overflow-hidden border">
          <div
            className="bg-primary h-full transition-all duration-500 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button className="w-full mt-4 bg-primary hover:bg-primary-light text-black font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105">
        Start Workout
      </button>
    </div>
  );
};

// ============================================
// Stat Badge Component
// ============================================
const StatBadge = ({ icon: Icon, label, value, color }) => {
  return (
    <div className={`${color} to-white p-3 rounded-lg text-center`}>
      <Icon className={`mx-auto mb-1`} size={20} />
      <div className="text-xl font-bold italic text-white">{label}</div>
      <div className="text-lg font-bold text-black">{value}</div>
    </div>
  );
};

// ============================================
// Weekly Plan Section Component
// ============================================
const WeeklyPlanSection = ({ weeklyPlan, activeDay, setActiveDay }) => {
  return (
    <div className="bg-linear-to-br from-yellow to-transparent border border-gray-700 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-black mb-4">Weekly Plan</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {weeklyPlan.map((day) => (
          <DayCard
            key={day.day}
            day={day}
            isActive={activeDay === day.day}
            onClick={() => setActiveDay(day.day)}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================
// Day Card Component
// ============================================
const DayCard = ({ day, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-105 ${
        isActive
          ? 'bg-primary text-black shadow-lg shadow-primary/50'
          : day.completed
          ? 'bg-green-500/20 border border-green-500/30 text-white'
          : 'bg-black/50 border border-gray-700 text-gray-300 hover:border-primary/50'
      }`}
    >
      <div className="text-sm font-semibold mb-1">{day.day}</div>
      <div className="text-xs opacity-80">{day.workout}</div>
      <div className="text-xs opacity-60 mt-1">{day.duration}</div>
      {day.completed && (
        <CheckCircle className="mt-2 text-green-400" size={16} />
      )}
    </div>
  );
};

// ============================================
// Exercise List Component
// ============================================
const ExerciseList = ({ exercises }) => {
  const [exerciseStates, setExerciseStates] = useState(
    exercises.map(ex => ({ ...ex, completed: false, currentSet: 0 }))
  );

  const handleCompleteSet = (index) => {
    setExerciseStates(prev => {
      const newStates = [...prev];
      const exercise = newStates[index];
      
      if (exercise.currentSet < exercise.sets) {
        exercise.currentSet += 1;
      }
      
      if (exercise.currentSet === exercise.sets) {
        exercise.completed = true;
        toast.success(`${exercise.name} completed! 🎉`, {
          position: 'top-right',
          autoClose: 2000,
        });
      }
      
      return newStates;
    });
  };

  return (
    <div className="bg-linear-to-br from-yellow to-transparent border border-gray-700 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-black mb-4">Exercise Details</h3>
      <div className="space-y-4">
        {exerciseStates.map((exercise, index) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            index={index}
            onCompleteSet={() => handleCompleteSet(index)}
          />
        ))}
      </div>
    </div>
  );
};

// ============================================
// Exercise Card Component
// ============================================
const ExerciseCard = ({ exercise, index, onCompleteSet }) => {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(exercise.rest);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      setIsTimerRunning(false);
      toast.info('Rest time complete! 💪');
      setTimeRemaining(exercise.rest);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining, exercise.rest]);

  return (
    <div
      className={`p-5 rounded-xl transition-all duration-300 ${
        exercise.completed
          ? 'bg-green-500/10 border-2 border-green-500/50'
          : 'bg-black/50 border border-gray-700 hover:border-primary/50'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
            exercise.completed ? 'bg-green-500 text-white' : 'bg-primary text-black'
          }`}>
            {exercise.completed ? <CheckCircle size={20} /> : index + 1}
          </div>
          <div>
            <h4 className="text-lg font-bold text-white">{exercise.name}</h4>
            <p className="text-sm text-gray-400">
              {exercise.currentSet}/{exercise.sets} sets completed
            </p>
          </div>
        </div>
        {exercise.completed && (
          <div className="text-green-400 font-semibold">✓ Done</div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className=" p-3 rounded-lg text-center">
          <div className="text-xl font-bold text-gray-900 mb-1">Sets</div>
          <div className="text-lg font-bold text-gray-900">{exercise.sets}</div>
        </div>
        <div className=" p-3 rounded-lg text-center">
          <div className="text-xl font-bold text-gray-900 mb-1">Reps</div>
          <div className="text-lg font-bold text-gray-900">{exercise.reps}</div>
        </div>
        <div className=" p-3 rounded-lg text-center">
          <div className="text-xl font-bold text-gray-900 mb-1">Rest</div>
          <div className="text-lg font-bold text-gray-900">{exercise.rest}s</div>
        </div>
      </div>

      {/* Rest Timer */}
      {!exercise.completed && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-white">Rest Timer</span>
            <span className="text-white font-bold">{timeRemaining}s</span>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="flex-1 bg-primary hover:bg-primary-light text-black font-semibold py-2 rounded-lg transition-all duration-300"
            >
              {isTimerRunning ? <Pause size={16} className="inline mr-2" /> : <Play size={16} className="inline mr-2" />}
              {isTimerRunning ? 'Pause' : 'Start Rest'}
            </button>
            <button
              onClick={onCompleteSet}
              disabled={exercise.completed}
              className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-all duration-300"
            >
              <CheckCircle size={16} className="inline mr-2" />
              Complete Set
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientWorkout;