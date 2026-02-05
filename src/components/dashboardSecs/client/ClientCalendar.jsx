import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Dumbbell, Apple, Camera, Clock, Plus, CheckCircle, X } from 'lucide-react';
import { toast } from 'react-toastify';

// ============================================
// Main Calendar Page
// ============================================
const ClientCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);

  const events = [
    {
      id: 1,
      date: '2024-02-05',
      type: 'workout',
      title: 'Upper Body Strength',
      time: '08:00 AM',
      duration: '45 mins',
      completed: true,
    },
    {
      id: 2,
      date: '2024-02-05',
      type: 'measurement',
      title: 'Weekly Weigh-in',
      time: '09:00 AM',
      completed: false,
    },
    {
      id: 3,
      date: '2024-02-06',
      type: 'workout',
      title: 'Lower Body Power',
      time: '07:30 AM',
      duration: '50 mins',
      completed: false,
    },
    {
      id: 4,
      date: '2024-02-06',
      type: 'nutrition',
      title: 'Meal Prep Day',
      time: '02:00 PM',
      completed: false,
    },
    {
      id: 5,
      date: '2024-02-07',
      type: 'rest',
      title: 'Rest Day',
      completed: false,
    },
    {
      id: 6,
      date: '2024-02-08',
      type: 'workout',
      title: 'Push Day',
      time: '08:00 AM',
      duration: '40 mins',
      completed: false,
    },
    {
      id: 7,
      date: '2024-02-09',
      type: 'workout',
      title: 'Pull Day',
      time: '08:00 AM',
      duration: '40 mins',
      completed: false,
    },
    {
      id: 8,
      date: '2024-02-10',
      type: 'workout',
      title: 'Legs & Core',
      time: '09:00 AM',
      duration: '45 mins',
      completed: false,
    },
    {
      id: 9,
      date: '2024-02-10',
      type: 'measurement',
      title: 'Progress Photos',
      time: '10:00 AM',
      completed: false,
    },
  ];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const handleDateClick = (day) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const getEventsForDate = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter((event) => event.date === dateStr);
  };

  const getEventsForSelectedDate = () => {
    const dateStr = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
    return events.filter((event) => event.date === dateStr);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <CalendarHeader />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar View */}
          <div className="lg:col-span-2">
            <CalendarView
              currentDate={currentDate}
              selectedDate={selectedDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onDateClick={handleDateClick}
              getEventsForDate={getEventsForDate}
              getDaysInMonth={getDaysInMonth}
            />
          </div>

          {/* Events List */}
          <div className="space-y-6">
            <EventsList
              selectedDate={selectedDate}
              events={getEventsForSelectedDate()}
              onAddEvent={() => setShowEventModal(true)}
            />
            <UpcomingEvents events={events} />
          </div>
        </div>

        {/* Weekly Summary */}
        <WeeklySummary events={events} />
      </div>

      {/* Event Modal */}
      {showEventModal && (
        <EventModal onClose={() => setShowEventModal(false)} />
      )}
    </div>
  );
};

// ============================================
// Calendar Header Component
// ============================================
const CalendarHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">My Calendar</h1>
        <p className="text-gray-200">Plan and track your fitness schedule</p>
      </div>
      <div className="flex items-center space-x-3">
        <div className="bg-primary border border-white/50 hover:border-white px-4 py-2 rounded-lg">
          <div className="text-sm text-black">Today</div>
          <div className="text-lg font-bold text-black">
            {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Calendar View Component
// ============================================
const CalendarView = ({ currentDate, selectedDate, onPrevMonth, onNextMonth, onDateClick, getEventsForDate, getDaysInMonth }) => {
  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day) => {
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  return (
    <div className="bg-gray-800 border border-white/50 hover:border-white rounded-2xl p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">{monthName}</h2>
        <div className="flex space-x-2">
          <button
            onClick={onPrevMonth}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={onNextMonth}
            className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Week Days */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-semibold text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells before first day */}
        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square" />
        ))}

        {/* Days of month */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const dayEvents = getEventsForDate(day);
          const hasWorkout = dayEvents.some((e) => e.type === 'workout');
          const hasRest = dayEvents.some((e) => e.type === 'rest');
          const hasCompleted = dayEvents.some((e) => e.completed);

          return (
            <button
              key={day}
              onClick={() => onDateClick(day)}
              className={`aspect-square rounded-lg p-2 transition-all duration-300 relative ${
                isToday(day)
                  ? 'bg-primary text-black font-bold'
                  : isSelected(day)
                  ? 'bg-primary/20 border-2 border-primary text-white'
                  : 'bg-black/50 text-white hover:bg-black/70'
              }`}
            >
              <div className="text-sm">{day}</div>
              {/* Event Indicators */}
              <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex space-x-1">
                {hasWorkout && (
                  <div className={`w-1.5 h-1.5 rounded-full ${isToday(day) ? 'bg-black' : 'bg-primary'}`} />
                )}
                {hasRest && (
                  <div className={`w-1.5 h-1.5 rounded-full ${isToday(day) ? 'bg-black' : 'bg-blue-500'}`} />
                )}
                {hasCompleted && (
                  <div className={`w-1.5 h-1.5 rounded-full ${isToday(day) ? 'bg-black' : 'bg-green-500'}`} />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-6 pt-6 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span className="text-sm text-gray-400">Workout</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-sm text-gray-400">Rest</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-sm text-gray-400">Completed</span>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Events List Component
// ============================================
const EventsList = ({ selectedDate, events, onAddEvent }) => {
  const dateStr = selectedDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  const eventIcons = {
    workout: Dumbbell,
    nutrition: Apple,
    measurement: Camera,
    rest: Calendar,
  };

  const eventColors = {
    workout: 'primary',
    nutrition: 'green-500',
    measurement: 'blue-500',
    rest: 'purple-500',
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">Events</h3>
          <p className="text-sm text-gray-400">{dateStr}</p>
        </div>
        <button
          onClick={onAddEvent}
          className="bg-primary hover:bg-primary-light text-black p-2 rounded-lg transition-all duration-300"
        >
          <Plus size={20} />
        </button>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="mx-auto text-gray-600 mb-3" size={48} />
          <p className="text-gray-400">No events for this day</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => {
            const Icon = eventIcons[event.type];
            const color = eventColors[event.type];
            return (
              <div
                key={event.id}
                className={`bg-black/50 border rounded-lg p-4 hover:border-${color} transition-all duration-300 ${
                  event.completed ? 'border-green-500/50' : 'border-gray-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className={`w-10 h-10 bg-${color}/20 rounded-lg flex items-center justify-center shrink-0`}>
                      <Icon className={`text-${color}`} size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-white mb-1">{event.title}</h4>
                      {event.time && (
                        <div className="flex items-center space-x-2 text-sm text-gray-400">
                          <Clock size={14} />
                          <span>{event.time}</span>
                          {event.duration && <span>• {event.duration}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                  {event.completed && (
                    <CheckCircle className="text-green-400" size={20} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// ============================================
// Upcoming Events Component
// ============================================
const UpcomingEvents = ({ events }) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      eventDate.setHours(0, 0, 0, 0);
      return eventDate >= today && !event.completed;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Upcoming Events</h3>
      <div className="space-y-2">
        {upcomingEvents.map((event) => {
          const eventDate = new Date(event.date);
          const daysDiff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
          const dateStr = daysDiff === 0 ? 'Today' : daysDiff === 1 ? 'Tomorrow' : eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

          return (
            <div key={event.id} className="bg-black/50 border border-gray-700 rounded-lg p-3 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-white">{event.title}</div>
                  <div className="text-xs text-gray-400">{event.time || 'All day'}</div>
                </div>
                <div className="text-xs font-semibold text-primary">{dateStr}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// Weekly Summary Component
// ============================================
const WeeklySummary = ({ events }) => {
  const workoutCount = events.filter((e) => e.type === 'workout' && e.completed).length;
  const totalWorkouts = events.filter((e) => e.type === 'workout').length;
  const restDays = events.filter((e) => e.type === 'rest').length;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-4">This Week's Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-black/50 border border-gray-700 rounded-xl p-4 text-center">
          <Dumbbell className="text-primary mx-auto mb-2" size={32} />
          <div className="text-3xl font-bold text-white">{workoutCount}/{totalWorkouts}</div>
          <div className="text-sm text-gray-400">Workouts Completed</div>
        </div>
        <div className="bg-black/50 border border-gray-700 rounded-xl p-4 text-center">
          <Calendar className="text-blue-500 mx-auto mb-2" size={32} />
          <div className="text-3xl font-bold text-white">{restDays}</div>
          <div className="text-sm text-gray-400">Rest Days</div>
        </div>
        <div className="bg-black/50 border border-gray-700 rounded-xl p-4 text-center">
          <Clock className="text-green-500 mx-auto mb-2" size={32} />
          <div className="text-3xl font-bold text-white">{workoutCount * 45}</div>
          <div className="text-sm text-gray-400">Minutes Trained</div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Event Modal Component
// ============================================
const EventModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Add Event</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        <p className="text-gray-400 text-center py-8">Event creation form coming soon...</p>
        <button
          onClick={onClose}
          className="btn w-full bg-primary hover:bg-primary-light text-black font-bold py-3 rounded-lg transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ClientCalendar;