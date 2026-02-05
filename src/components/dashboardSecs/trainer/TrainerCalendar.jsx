import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Plus, Users, Dumbbell, Clock, X, CheckCircle, Video, MessageSquare } from 'lucide-react';
import { toast } from 'react-toastify';

// ============================================
// Main Trainer Calendar Page
// ============================================
const TrainerCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventModal, setShowEventModal] = useState(false);
  const [viewMode, setViewMode] = useState('month'); // month, week, day

  const events = [
    {
      id: 1,
      date: '2024-02-05',
      type: 'session',
      title: 'Training Session - Sarah Johnson',
      time: '08:00 AM',
      duration: '1 hour',
      client: 'Sarah Johnson',
      status: 'confirmed',
    },
    {
      id: 2,
      date: '2024-02-05',
      type: 'consultation',
      title: 'Initial Consultation - Mike Chen',
      time: '10:00 AM',
      duration: '45 mins',
      client: 'Mike Chen',
      status: 'confirmed',
    },
    {
      id: 3,
      date: '2024-02-05',
      type: 'checkin',
      title: 'Weekly Check-in - Emma Davis',
      time: '02:00 PM',
      duration: '30 mins',
      client: 'Emma Davis',
      status: 'pending',
    },
    {
      id: 4,
      date: '2026-02-05',
      type: 'session',
      title: 'Training Session - James Wilson',
      time: '07:30 AM',
      duration: '1 hour',
      client: 'James Wilson',
      status: 'confirmed',
    },
    {
      id: 5,
      date: '2024-02-06',
      type: 'video',
      title: 'Video Recording - Exercise Tutorial',
      time: '12:00 PM',
      duration: '2 hours',
      status: 'scheduled',
    },
    {
      id: 6,
      date: '2024-02-07',
      type: 'session',
      title: 'Group Class - HIIT Training',
      time: '06:00 PM',
      duration: '1 hour',
      clients: 8,
      status: 'confirmed',
    },
    {
      id: 7,
      date: '2024-02-08',
      type: 'consultation',
      title: 'Progress Review - Lisa Brown',
      time: '09:00 AM',
      duration: '45 mins',
      client: 'Lisa Brown',
      status: 'confirmed',
    },
    {
      id: 8,
      date: '2024-02-09',
      type: 'session',
      title: 'Training Session - Alex Turner',
      time: '08:00 AM',
      duration: '1 hour',
      client: 'Alex Turner',
      status: 'confirmed',
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
        <CalendarHeader onAddEvent={() => setShowEventModal(true)} />

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

          {/* Sidebar */}
          <div className="space-y-6">
            <DaySchedule
              selectedDate={selectedDate}
              events={getEventsForSelectedDate()}
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
const CalendarHeader = ({ onAddEvent }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-white mb-2">Schedule & Calendar</h1>
        <p className="text-gray-400">Manage your client sessions and appointments</p>
      </div>
      <button
        onClick={onAddEvent}
        className="bg-primary hover:bg-primary-light text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
      >
        <Plus size={20} />
        <span>Add Event</span>
      </button>
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
          const eventCount = dayEvents.length;

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
              {/* Event Count Badge */}
              {eventCount > 0 && (
                <div className={`absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                  isToday(day) ? 'bg-black text-primary' : 'bg-primary text-black'
                }`}>
                  {eventCount}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ============================================
// Day Schedule Component
// ============================================
const DaySchedule = ({ selectedDate, events }) => {
  const dateStr = selectedDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  const eventIcons = {
    session: Dumbbell,
    consultation: MessageSquare,
    checkin: CheckCircle,
    video: Video,
  };

  const eventColors = {
    session: 'primary',
    consultation: 'blue-500',
    checkin: 'green-500',
    video: 'purple-500',
  };

  const statusColors = {
    confirmed: 'bg-green-500/20 text-green-400',
    pending: 'bg-yellow-500/20 text-yellow-400',
    scheduled: 'bg-blue-500/20 text-blue-400',
  };

  return (
    <div className="bg-gray-800 border border-white/50 hover:border-white rounded-2xl p-6">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white">Schedule</h3>
        <p className="text-sm text-gray-400">{dateStr}</p>
      </div>

      {events.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="mx-auto text-gray-600 mb-3" size={48} />
          <p className="text-gray-200">No events scheduled</p>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((event) => {
            const Icon = eventIcons[event.type];
            const color = eventColors[event.type];
            return (
              <div
                key={event.id}
                className={`bg-black/50 border border-gray-700 rounded-lg p-4 hover:border-${color} transition-all duration-300`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 bg-${color}/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`text-${color}`} size={20} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white mb-1">{event.title}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-200 mb-2">
                      <Clock size={14} />
                      <span>{event.time}</span>
                      <span>•</span>
                      <span>{event.duration}</span>
                    </div>
                    {event.client && (
                      <div className="flex items-center space-x-2 mb-2">
                        <img
                          src={`https://ui-avatars.com/api/?name=${event.client}&background=f7bb17&color=000`}
                          alt={event.client}
                          className="w-6 h-6 rounded-full"
                        />
                        <span className="text-sm text-gray-300">{event.client}</span>
                      </div>
                    )}
                    {event.clients && (
                      <div className="flex items-center space-x-2 text-sm text-gray-300 mb-2">
                        <Users size={14} />
                        <span>{event.clients} participants</span>
                      </div>
                    )}
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${statusColors[event.status]}`}>
                      {event.status}
                    </span>
                  </div>
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
      return eventDate >= today;
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 5);

  return (
    <div className="bg-gray-800 border border-white/50 hover:border-white rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">Upcoming Events</h3>
      <div className="space-y-2">
        {upcomingEvents.map((event) => {
          const eventDate = new Date(event.date);
          const daysDiff = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
          const dateStr = daysDiff === 0 ? 'Today' : daysDiff === 1 ? 'Tomorrow' : eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

          return (
            <div key={event.id} className="bg-black/50 border border-gray-700 rounded-lg p-3 hover:border-primary/50 transition-all duration-300">
              <div className="flex items-center justify-between mb-1">
                <div className="text-sm font-semibold text-white truncate">{event.title}</div>
                <div className="text-xs font-semibold text-primary ml-2">{dateStr}</div>
              </div>
              <div className="text-xs text-gray-400">{event.time}</div>
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
  const sessions = events.filter((e) => e.type === 'session').length;
  const consultations = events.filter((e) => e.type === 'consultation').length;
  const checkIns = events.filter((e) => e.type === 'checkin').length;

  return (
    <div className="bg-gray-800 border border-white/50 hover:border-white rounded-2xl p-6">
      <h3 className="text-2xl font-bold text-white mb-4">This Week's Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-black/50 border border-gray-700 rounded-xl p-4 text-center">
          <Calendar className="text-primary mx-auto mb-2" size={32} />
          <div className="text-3xl font-bold text-white">{events.length}</div>
          <div className="text-sm text-gray-400">Total Events</div>
        </div>
        <div className="bg-black/50 border border-gray-700 rounded-xl p-4 text-center">
          <Dumbbell className="text-yellow-500 mx-auto mb-2" size={32} />
          <div className="text-3xl font-bold text-white">{sessions}</div>
          <div className="text-sm text-gray-400">Training Sessions</div>
        </div>
        <div className="bg-black/50 border border-gray-700 rounded-xl p-4 text-center">
          <MessageSquare className="text-blue-500 mx-auto mb-2" size={32} />
          <div className="text-3xl font-bold text-white">{consultations}</div>
          <div className="text-sm text-gray-200">Consultations</div>
        </div>
        <div className="bg-black/50 border border-gray-700 rounded-xl p-4 text-center">
          <CheckCircle className="text-green-500 mx-auto mb-2" size={32} />
          <div className="text-3xl font-bold text-white">{checkIns}</div>
          <div className="text-sm text-gray-400">Check-ins</div>
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
          className="w-full bg-primary hover:bg-primary-light text-black font-bold py-3 rounded-lg transition-all duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default TrainerCalendar;