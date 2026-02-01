import { create } from "zustand";

export const useAppStore = create((set) => ({
  user: null,
  activeTab: "overview",
  notifications: 5,
  isSidebarOpen: false,
  setUser: (user) => set({ user }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setNotifications: (count) => set({ notifications: count }),
  toggleSidebar: () =>
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
}));

// ============================================
// 2. Workout Store
// src/stores/workoutStore.js
// ============================================

export const useWorkoutStore = create((set, get) => ({
  currentPlan: null,
  todayWorkout: null,
  weeklySchedule: [],
  completedWorkouts: [],
  exercises: [],
  loading: false,

  setCurrentPlan: (plan) => set({ currentPlan: plan }),

  setTodayWorkout: (workout) => set({ todayWorkout: workout }),

  setWeeklySchedule: (schedule) => set({ weeklySchedule: schedule }),

  markWorkoutComplete: (workoutId) => {
    set((state) => ({
      completedWorkouts: [...state.completedWorkouts, workoutId],
    }));
  },

  updateExerciseProgress: (exerciseId, progress) => {
    set((state) => ({
      exercises: state.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, ...progress } : ex
      ),
    }));
  },

  completeExercise: (exerciseId) => {
    set((state) => ({
      exercises: state.exercises.map((ex) =>
        ex.id === exerciseId ? { ...ex, completed: true } : ex
      ),
    }));
  },

  setLoading: (loading) => set({ loading }),
}));

// ============================================
// 3. Nutrition Store
// src/stores/nutritionStore.js
// ============================================


export const useNutritionStore = create((set, get) => ({
  currentPlan: null,
  dailyMacros: {
    calories: { consumed: 0, target: 2200 },
    protein: { consumed: 0, target: 150 },
    carbs: { consumed: 0, target: 250 },
    fats: { consumed: 0, target: 70 },
  },
  meals: [],
  waterIntake: 0,
  targetWater: 8,

  setNutritionPlan: (plan) => set({ currentPlan: plan }),

  setDailyMacros: (macros) => set({ dailyMacros: macros }),

  updateWaterIntake: (amount) => {
    set((state) => ({
      waterIntake: Math.min(state.waterIntake + amount, state.targetWater),
    }));
  },

  resetWaterIntake: () => set({ waterIntake: 0 }),

  addMeal: (meal) => {
    set((state) => ({
      meals: [...state.meals, meal],
      dailyMacros: {
        calories: {
          ...state.dailyMacros.calories,
          consumed: state.dailyMacros.calories.consumed + meal.calories,
        },
        protein: {
          ...state.dailyMacros.protein,
          consumed: state.dailyMacros.protein.consumed + meal.protein,
        },
        carbs: {
          ...state.dailyMacros.carbs,
          consumed: state.dailyMacros.carbs.consumed + meal.carbs,
        },
        fats: {
          ...state.dailyMacros.fats,
          consumed: state.dailyMacros.fats.consumed + meal.fats,
        },
      },
    }));
  },

  markMealComplete: (mealId) => {
    set((state) => ({
      meals: state.meals.map((meal) =>
        meal.id === mealId ? { ...meal, completed: true } : meal
      ),
    }));
  },
}));

// ============================================
// 4. Client Store (for Trainers)
// src/stores/clientStore.js
// ============================================


export const useClientStore = create((set, get) => ({
  clients: [],
  selectedClient: null,
  analytics: null,
  loading: false,

  setClients: (clients) => set({ clients }),

  setSelectedClient: (client) => set({ selectedClient: client }),

  addClient: (client) => {
    set((state) => ({
      clients: [...state.clients, client],
    }));
  },

  updateClient: (clientId, updates) => {
    set((state) => ({
      clients: state.clients.map((client) =>
        client.id === clientId ? { ...client, ...updates } : client
      ),
    }));
  },

  removeClient: (clientId) => {
    set((state) => ({
      clients: state.clients.filter((client) => client.id !== clientId),
    }));
  },

  setAnalytics: (analytics) => set({ analytics }),

  setLoading: (loading) => set({ loading }),
}));

// ============================================
// 5. Progress Store
// src/stores/progressStore.js
// ============================================


export const useProgressStore = create((set, get) => ({
  weightData: [],
  measurements: {},
  progressPhotos: [],
  achievements: [],
  streak: 0,

  setWeightData: (data) => set({ weightData: data }),

  addWeightEntry: (entry) => {
    set((state) => ({
      weightData: [...state.weightData, entry],
    }));
  },

  setMeasurements: (measurements) => set({ measurements }),

  addProgressPhoto: (photo) => {
    set((state) => ({
      progressPhotos: [...state.progressPhotos, photo],
    }));
  },

  setAchievements: (achievements) => set({ achievements }),

  unlockAchievement: (achievement) => {
    set((state) => ({
      achievements: [...state.achievements, achievement],
    }));
  },

  updateStreak: (streak) => set({ streak }),

  incrementStreak: () => {
    set((state) => ({
      streak: state.streak + 1,
    }));
  },
}));

// ============================================
// 6. Calendar Store
// src/stores/calendarStore.js
// ============================================


export const useCalendarStore = create((set, get) => ({
  events: [],
  selectedDate: new Date(),
  workoutDays: [],
  restDays: [],

  setEvents: (events) => set({ events }),

  addEvent: (event) => {
    set((state) => ({
      events: [...state.events, event],
    }));
  },

  updateEvent: (eventId, updates) => {
    set((state) => ({
      events: state.events.map((event) =>
        event.id === eventId ? { ...event, ...updates } : event
      ),
    }));
  },

  deleteEvent: (eventId) => {
    set((state) => ({
      events: state.events.filter((event) => event.id !== eventId),
    }));
  },

  setSelectedDate: (date) => set({ selectedDate: date }),

  setWorkoutDays: (days) => set({ workoutDays: days }),

  setRestDays: (days) => set({ restDays: days }),
}));

// ============================================
// 7. Video Store (for Trainers)
// src/stores/videoStore.js
// ============================================


export const useVideoStore = create((set, get) => ({
  videos: [],
  categories: [
    "Training Tips",
    "Exercise Tutorials",
    "Vlogs",
    "Nutrition",
    "Motivation",
  ],
  selectedCategory: "All",
  loading: false,

  setVideos: (videos) => set({ videos }),

  addVideo: (video) => {
    set((state) => ({
      videos: [...state.videos, video],
    }));
  },

  updateVideo: (videoId, updates) => {
    set((state) => ({
      videos: state.videos.map((video) =>
        video.id === videoId ? { ...video, ...updates } : video
      ),
    }));
  },

  deleteVideo: (videoId) => {
    set((state) => ({
      videos: state.videos.filter((video) => video.id !== videoId),
    }));
  },

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  setLoading: (loading) => set({ loading }),
}));

// ============================================
// 8. Plans Store (for Trainers)
// src/stores/plansStore.js
// ============================================


export const usePlansStore = create((set, get) => ({
  workoutPlans: [],
  nutritionPlans: [],
  templates: [],
  selectedPlan: null,
  loading: false,

  setWorkoutPlans: (plans) => set({ workoutPlans: plans }),

  setNutritionPlans: (plans) => set({ nutritionPlans: plans }),

  addWorkoutPlan: (plan) => {
    set((state) => ({
      workoutPlans: [...state.workoutPlans, plan],
    }));
  },

  addNutritionPlan: (plan) => {
    set((state) => ({
      nutritionPlans: [...state.nutritionPlans, plan],
    }));
  },

  updatePlan: (planId, updates) => {
    set((state) => ({
      workoutPlans: state.workoutPlans.map((plan) =>
        plan.id === planId ? { ...plan, ...updates } : plan
      ),
    }));
  },

  deletePlan: (planId) => {
    set((state) => ({
      workoutPlans: state.workoutPlans.filter((plan) => plan.id !== planId),
    }));
  },

  setSelectedPlan: (plan) => set({ selectedPlan: plan }),

  setTemplates: (templates) => set({ templates }),

  setLoading: (loading) => set({ loading }),
}));

