import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade, Parallax } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import img1 from '../../assets/imges/HomeSlider/img1.jpg';
import img2 from '../../assets/imges/HomeSlider/img2.jpg';
import img3 from '../../assets/imges/HomeSlider/img3.jpg';
import img4 from '../../assets/imges/HomeSlider/img4.jpg';
import img5 from '../../assets/imges/HomeSlider/img5.jpg';
import img6 from '../../assets/imges/HomeSlider/img6.jpg';
import img7 from '../../assets/imges/HomeSlider/img7.jpg';
import img8 from '../../assets/imges/HomeSlider/img8.jpg';
import img9 from '../../assets/imges/HomeSlider/img9.jpg';

export default function HomeSlider() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const swiperRef = useRef(null);
  
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const slides = [
    { 
      id: 1, 
      title: 'Prove Yourself', 
      subtitle: 'Push beyond your limits',
      img: img1,
      gradient: 'from-blue-600/80 via-purple-600/70 to-transparent'
    },
    { 
      id: 2, 
      title: 'Improve Your Skills', 
      subtitle: 'Master your craft every day',
      img: img2,
      gradient: 'from-emerald-600/80 via-teal-600/70 to-transparent'
    },
    { 
      id: 3, 
      title: 'Control Yourself', 
      subtitle: 'Discipline is freedom',
      img: img3,
      gradient: 'from-orange-600/80 via-red-600/70 to-transparent'
    },
    { 
      id: 4, 
      title: 'Go Forward', 
      subtitle: 'Never look back',
      img: img4,
      gradient: 'from-indigo-600/80 via-blue-600/70 to-transparent'
    },
    { 
      id: 5, 
      title: 'Change Your Body', 
      subtitle: 'Transform yourself',
      img: img5,
      gradient: 'from-pink-600/80 via-rose-600/70 to-transparent'
    },
    { 
      id: 6, 
      title: 'Use Easy Ways', 
      subtitle: 'Smart training, better results',
      img: img6,
      gradient: 'from-cyan-600/80 via-blue-600/70 to-transparent'
    },
    { 
      id: 7, 
      title: 'Make It Easy', 
      subtitle: 'Simplify your journey',
      img: img7,
      gradient: 'from-violet-600/80 via-purple-600/70 to-transparent'
    },
    { 
      id: 8, 
      title: 'Achieve Your Goal', 
      subtitle: 'Success is a journey',
      img: img8,
      gradient: 'from-amber-600/80 via-yellow-600/70 to-transparent'
    },
    { 
      id: 9, 
      title: 'Practice More', 
      subtitle: 'Excellence through repetition',
      img: img9,
      gradient: 'from-green-600/80 via-emerald-600/70 to-transparent'
    },
  ];

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', 1 - progress);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  const togglePlayPause = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      if (isPlaying) {
        swiperRef.current.swiper.autoplay.stop();
      } else {
        swiperRef.current.swiper.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSlideChange = (swiper) => {
    setCurrentSlide(swiper.activeIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!swiperRef.current?.swiper) return;
      
      if (e.key === 'ArrowLeft') {
        swiperRef.current.swiper.slidePrev();
      } else if (e.key === 'ArrowRight') {
        swiperRef.current.swiper.slideNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying]);

  return (
    <div 
      className="relative h-[70vh] min-h-[500px] bg-gray-900 text-white overflow-hidden group rounded"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-br from-blue-500 via-purple-500 to-pink-500 animate-pulse"></div>
      </div>

      <Swiper
        ref={swiperRef}
        spaceBetween={0}
        centeredSlides
        speed={1000}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        }}
        parallax={true}
        effect="fade"
        fadeEffect={{
          crossFade: true
        }}
        modules={[Autoplay, Pagination, Navigation, EffectFade, Parallax]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        onSlideChange={handleSlideChange}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className="relative overflow-hidden"
          >
            {/* Background Image with Parallax */}
            <div 
              className="absolute inset-0 bg-cover bg-center transform scale-110 transition-transform duration-1000"
              style={{ 
                backgroundImage: `url(${slide.img})`,
                transform: isHovered ? 'scale(105%)' : 'scale(110%)'
              }}
              data-swiper-parallax="-300"
            />
            
            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-linear-to-r ${slide.gradient}`} />
            
            {/* Dark Vignette */}
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-black/30" />

            {/* Content Container */}
            <div className="relative h-full flex items-center justify-center px-6 md:px-12">
              <div className="max-w-4xl text-center space-y-6" data-swiper-parallax="-400">
                {/* Slide Number Indicator */}
                <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-4 animate-fadeIn">
                  {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
                </div>

                {/* Main Title with Animation */}
                <h2 
                  className="text-5xl md:text-7xl font-black uppercase tracking-tight text-white drop-shadow-2xl animate-slideUp"
                  data-swiper-parallax="-200"
                  style={{
                    textShadow: '0 4px 30px rgba(0,0,0,0.7), 0 0 60px rgba(255,187,23,0.3)'
                  }}
                >
                  {slide.title}
                </h2>

                {/* Subtitle */}
                <p 
                  className="text-xl md:text-2xl text-gray-200 font-light tracking-wide max-w-2xl mx-auto animate-slideUp delay-100"
                  data-swiper-parallax="-100"
                >
                  {slide.subtitle}
                </p>

                {/* CTA Button */}
                <div className="pt-6 animate-slideUp delay-200" data-swiper-parallax="-50">
                  <button className="group/btn relative px-8 py-4 bg-yellow text-black font-bold text-lg rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow/50">
                    <span className="relative z-10 flex items-center gap-2">
                      Get Started
                      <svg 
                        className="w-5 h-5 transition-transform duration-300 group-hover/btn:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-linear-to-r from-yellow to-yellow-400 transform scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t-4 border-l-4 border-white/30 animate-pulse" />
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b-4 border-r-4 border-white/30 animate-pulse delay-500" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
        aria-label={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Progress Circle Timer */}
      <div className="absolute right-6 bottom-6 z-20 w-16 h-16 flex items-center justify-center font-bold text-white">
        <svg
          ref={progressCircle}
          viewBox="0 0 48 48"
          className="absolute w-full h-full -rotate-90"
          style={{
            strokeDasharray: 125.6,
            strokeDashoffset: 'calc(125.6px * (1 - var(--progress)))',
          }}
        >
          <circle
            cx="24"
            cy="24"
            r="20"
            className="fill-none stroke-yellow stroke-3"
            style={{
              filter: 'drop-shadow(0 0 8px rgba(247, 187, 23, 0.5))'
            }}
          />
        </svg>
        <span 
          ref={progressContent}
          className="text-sm font-bold text-white drop-shadow-lg"
        />
      </div>

      {/* Slide Counter */}
      <div className="absolute left-6 bottom-6 z-20 text-white">
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-4 py-3 rounded-full">
          <span className="text-2xl font-bold text-yellow">
            {String(currentSlide + 1).padStart(2, '0')}
          </span>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-400">
            {String(slides.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="absolute top-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg text-xs text-gray-300 space-y-1">
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/10 rounded text-[10px]">←</kbd>
            <kbd className="px-2 py-1 bg-white/10 rounded text-[10px]">→</kbd>
            <span>Navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="px-2 py-1 bg-white/10 rounded text-[10px]">Space</kbd>
            <span>Play/Pause</span>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-slideUp {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        /* Custom Pagination Styles */
        :global(.swiper-pagination-bullet) {
          background: white;
          opacity: 0.5;
          width: 12px;
          height: 12px;
          transition: all 0.3s ease;
        }

        :global(.swiper-pagination-bullet-active) {
          opacity: 1;
          background: #f7bb17;
          transform: scale(1.3);
          box-shadow: 0 0 20px rgba(247, 187, 23, 0.6);
        }

        :global(.swiper-pagination) {
          bottom: 30px !important;
        }
      `}</style>
    </div>
  );
}