import React, { useState } from 'react';
import { Play, Plus, Search, Upload, Eye, ThumbsUp, MessageSquare, Edit, Trash2, Filter, Video, Clock, Users, BarChart } from 'lucide-react';
import { toast } from 'react-toastify';

// ============================================
// Main Videos Page
// ============================================
const TrainerVideos = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const videos = [
    {
      id: 1,
      title: 'Perfect Squat Form Tutorial',
      description: 'Learn the correct technique for performing squats safely and effectively',
      category: 'Exercise Tutorials',
      thumbnail: 'https://via.placeholder.com/400x225/3c3c3c/f7bb17?text=Squat+Tutorial',
      duration: '8:45',
      views: 1240,
      likes: 98,
      comments: 24,
      uploadDate: '2024-01-20',
      status: 'published',
    },
    {
      id: 2,
      title: 'My Morning Routine - Vlog',
      description: 'Follow along with my daily morning routine for optimal productivity',
      category: 'Vlogs',
      thumbnail: 'https://via.placeholder.com/400x225/3c3c3c/f7bb17?text=Morning+Routine',
      duration: '12:30',
      views: 2150,
      likes: 186,
      comments: 45,
      uploadDate: '2024-01-18',
      status: 'published',
    },
    {
      id: 3,
      title: 'Nutrition Basics for Muscle Gain',
      description: 'Essential nutrition principles to maximize your muscle building results',
      category: 'Nutrition',
      thumbnail: 'https://via.placeholder.com/400x225/3c3c3c/f7bb17?text=Nutrition+Guide',
      duration: '15:20',
      views: 980,
      likes: 72,
      comments: 18,
      uploadDate: '2024-01-15',
      status: 'published',
    },
    {
      id: 4,
      title: 'Advanced Deadlift Techniques',
      description: 'Take your deadlift to the next level with these advanced tips',
      category: 'Exercise Tutorials',
      thumbnail: 'https://via.placeholder.com/400x225/3c3c3c/f7bb17?text=Deadlift+Guide',
      duration: '10:15',
      views: 1560,
      likes: 124,
      comments: 31,
      uploadDate: '2024-01-12',
      status: 'published',
    },
    {
      id: 5,
      title: 'Stay Motivated - My Fitness Journey',
      description: 'Sharing my personal story and tips for staying motivated',
      category: 'Motivation',
      thumbnail: 'https://via.placeholder.com/400x225/3c3c3c/f7bb17?text=Motivation',
      duration: '6:40',
      views: 3200,
      likes: 285,
      comments: 67,
      uploadDate: '2024-01-10',
      status: 'published',
    },
    {
      id: 6,
      title: 'Home Workout - No Equipment Needed',
      description: 'Effective full body workout you can do anywhere',
      category: 'Training Tips',
      thumbnail: 'https://via.placeholder.com/400x225/3c3c3c/f7bb17?text=Home+Workout',
      duration: '18:00',
      views: 4500,
      likes: 412,
      comments: 89,
      uploadDate: '2024-01-08',
      status: 'published',
    },
    {
      id: 7,
      title: 'Meal Prep Sunday - Full Week',
      description: 'Prepare a week worth of healthy meals in 2 hours',
      category: 'Nutrition',
      thumbnail: 'https://via.placeholder.com/400x225/3c3c3c/f7bb17?text=Meal+Prep',
      duration: '22:15',
      views: 1890,
      likes: 156,
      comments: 42,
      uploadDate: '2024-01-05',
      status: 'published',
    },
    {
      id: 8,
      title: 'Behind the Scenes - Photoshoot Day',
      description: 'A day in the life during a fitness photoshoot',
      category: 'Vlogs',
      thumbnail: 'https://via.placeholder.com/400x225/3c3c3c/f7bb17?text=Photoshoot+BTS',
      duration: '14:30',
      views: 2780,
      likes: 234,
      comments: 56,
      uploadDate: '2024-01-02',
      status: 'published',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Videos', icon: Video },
    { id: 'Exercise Tutorials', name: 'Exercise Tutorials', icon: Play },
    { id: 'Training Tips', name: 'Training Tips', icon: BarChart },
    { id: 'Nutrition', name: 'Nutrition', icon: Users },
    { id: 'Vlogs', name: 'Vlogs', icon: Video },
    { id: 'Motivation', name: 'Motivation', icon: ThumbsUp },
  ];

  const filteredVideos = videos.filter((video) => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          video.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalViews = videos.reduce((sum, video) => sum + video.views, 0);
  const totalLikes = videos.reduce((sum, video) => sum + video.likes, 0);
  const totalComments = videos.reduce((sum, video) => sum + video.comments, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 md:p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <VideosHeader />

        {/* Stats Overview */}
        <StatsOverview 
          totalVideos={videos.length} 
          totalViews={totalViews} 
          totalLikes={totalLikes} 
          totalComments={totalComments}
        />

        {/* Categories */}
        <CategoriesFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Search and Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Videos Grid */}
        <VideosGrid videos={filteredVideos} viewMode={viewMode} />
      </div>
    </div>
  );
};

// ============================================
// Videos Header Component
// ============================================
const VideosHeader = () => {
  const handleUpload = () => {
    toast.info('Upload video functionality coming soon!');
  };

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">Video Library</h1>
        <p className="text-gray-400 text-sm md:text-base">Share tutorials, vlogs, and training content</p>
      </div>
      <button
        onClick={handleUpload}
        className="w-full sm:w-auto bg-primary hover:bg-primary-light text-black font-bold px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
      >
        <Upload size={20} />
        <span>Upload Video</span>
      </button>
    </div>
  );
};

// ============================================
// Stats Overview Component
// ============================================
const StatsOverview = ({ totalVideos, totalViews, totalLikes, totalComments }) => {
  const stats = [
    { label: 'Total Videos', value: totalVideos, icon: Video, color: 'primary' },
    { label: 'Total Views', value: totalViews.toLocaleString(), icon: Eye, color: 'blue-500' },
    { label: 'Total Likes', value: totalLikes.toLocaleString(), icon: ThumbsUp, color: 'green-500' },
    { label: 'Total Comments', value: totalComments, icon: MessageSquare, color: 'purple-500' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-gray-800 border border-gray-700 rounded-xl p-4 md:p-5 hover:border-primary/50 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-xs md:text-sm text-gray-400 mb-1 truncate">{stat.label}</div>
                <div className="text-xl md:text-3xl font-bold text-white truncate">{stat.value}</div>
              </div>
              <div className={`w-10 h-10 md:w-14 md:h-14 bg-${stat.color}/20 rounded-lg flex items-center justify-center shrink-0`}>
                <Icon className={`text-${stat.color}`} size={20} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

// ============================================
// Categories Filter Component
// ============================================
const CategoriesFilter = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 space-x-2 md:space-x-3 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center space-x-2 px-3 md:px-5 py-2 md:py-3 rounded-lg font-semibold whitespace-nowrap transition-all duration-300 text-sm md:text-base ${
              selectedCategory === category.id
                ? 'btn bg-primary text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-400 hover:text-black border border-gray-700'
            }`}
          >
            <Icon size={18} className="shrink-0" />
            <span className="hidden sm:inline">{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};

// ============================================
// Search and Filters Component
// ============================================
const SearchAndFilters = ({ searchQuery, setSearchQuery, viewMode, setViewMode }) => {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-4">
      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search videos..."
          className="w-full bg-gray-800 text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-primary transition-all duration-300"
        />
      </div>

      {/* View Mode Toggle */}
      <div className="flex space-x-2">
        <button
          onClick={() => setViewMode('grid')}
          className={`flex-1 md:flex-initial px-4 py-3 rounded-lg transition-all duration-300 font-semibold ${
            viewMode === 'grid'
              ? 'bg-primary text-black'
              : 'bg-gray-800 text-gray-200 border border-gray-700'
          }`}
        >
          Grid
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`flex-1 md:flex-initial px-4 py-3 rounded-lg transition-all duration-300 font-semibold ${
            viewMode === 'list'
              ? 'bg-primary text-black'
              : 'bg-gray-800 text-gray-200 border border-gray-700'
          }`}
        >
          List
        </button>
      </div>
    </div>
  );
};

// ============================================
// Videos Grid Component
// ============================================
const VideosGrid = ({ videos, viewMode }) => {
  if (videos.length === 0) {
    return (
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 md:p-12 text-center">
        <Video className="mx-auto text-gray-600 mb-4" size={48} />
        <h3 className="text-lg md:text-xl font-bold text-white mb-2">No videos found</h3>
        <p className="text-sm md:text-base text-gray-400">Try adjusting your search or filters</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {videos.map((video) => (
          <VideoListItem key={video.id} video={video} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

// ============================================
// Video Card Component
// ============================================
const VideoCard = ({ video }) => {
  const handlePlay = () => {
    toast.info(`Playing: ${video.title}`);
  };

  const handleEdit = () => {
    toast.info(`Editing: ${video.title}`);
  };

  const handleDelete = () => {
    toast.error(`Deleting: ${video.title}`);
  };

  return (
    <div className="bg-gray-800 border border-white/50  rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 transform hover:scale-105">
      {/* Thumbnail */}
      <div className="relative group cursor-pointer" onClick={handlePlay}>
        <img src={video.thumbnail} alt={video.title} className="w-full h-40 sm:h-48 object-cover" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center">
            <Play className="text-black ml-1" size={24} />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-semibold text-white">
          {video.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs font-semibold rounded">
            {video.category}
          </span>
        </div>
        <h3 className="text-base md:text-lg font-bold text-white mb-2 line-clamp-2">{video.title}</h3>
        <p className="text-xs md:text-sm text-gray-400 mb-4 line-clamp-2">{video.description}</p>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs md:text-sm text-gray-400 mb-4">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="flex items-center space-x-1">
              <Eye size={14} />
              <span className="hidden sm:inline">{video.views.toLocaleString()}</span>
              <span className="sm:hidden">{(video.views / 1000).toFixed(1)}K</span>
            </div>
            <div className="flex items-center space-x-1">
              <ThumbsUp size={14} />
              <span>{video.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageSquare size={14} />
              <span>{video.comments}</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className="flex-1 bg-primary hover:bg-primary-light text-black font-semibold py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <Edit size={16} />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="bg-black/50 hover:bg-red-500/20 text-red-400 p-2 rounded-lg border border-gray-700 hover:border-red-500/50 transition-all duration-300"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// Video List Item Component
// ============================================
const VideoListItem = ({ video }) => {
  const handlePlay = () => {
    toast.info(`Playing: ${video.title}`);
  };

  const handleEdit = () => {
    toast.info(`Editing: ${video.title}`);
  };

  const handleDelete = () => {
    toast.error(`Deleting: ${video.title}`);
  };

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300">
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-64 md:w-72 cursor-pointer group shrink-0" onClick={handlePlay}>
          <img src={video.thumbnail} alt={video.title} className="w-full h-48 sm:h-full object-cover" />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Play className="text-black ml-1" size={24} />
            </div>
          </div>
          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs font-semibold text-white">
            {video.duration}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-5">
          <div className="flex flex-col gap-3">
            <div>
              <div className="mb-2">
                <span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs font-semibold rounded">
                  {video.category}
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-2">{video.title}</h3>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{video.description}</p>
            </div>

            {/* Stats and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs md:text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <Eye size={16} />
                  <span>{video.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ThumbsUp size={16} />
                  <span>{video.likes} likes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageSquare size={16} />
                  <span>{video.comments} comments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock size={16} />
                  <span className="hidden lg:inline">{new Date(video.uploadDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleEdit}
                  className="flex-1 sm:flex-initial bg-primary hover:bg-primary-light text-black font-semibold px-4 py-2 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button
                  onClick={handleDelete}
                  className="bg-black/50 hover:bg-red-500/20 text-red-400 p-2 rounded-lg border border-gray-700 hover:border-red-500/50 transition-all duration-300"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainerVideos;