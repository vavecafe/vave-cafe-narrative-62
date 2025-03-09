
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, ChevronLeft, ChevronRight, X } from 'lucide-react';

type StorySlide = {
  id: number;
  title: string;
  description: string;
  imageBg: string;
};

const storyData: StorySlide[] = [
  {
    id: 1,
    title: "Once only available to kings...",
    description: "Throughout history, access to data and insights was restricted to those with power and resources.",
    imageBg: "bg-gradient-to-br from-vave-blue to-vave-blue/70",
  },
  {
    id: 2,
    title: "Then only for corporate giants...",
    description: "In the early digital era, only large corporations could afford enterprise data systems and analytics.",
    imageBg: "bg-gradient-to-br from-vave-blue/90 to-vave-cyan/70",
  },
  {
    id: 3,
    title: "Now democratized through AI...",
    description: "AI has leveled the playing field, making advanced insights accessible to businesses of all sizes.",
    imageBg: "bg-gradient-to-br from-vave-cyan/80 to-vave-lavender/60",
  },
  {
    id: 4,
    title: "Edge technology for everyone...",
    description: "Today's AI solutions bring cutting-edge capabilities to the fingertips of small and medium businesses.",
    imageBg: "bg-gradient-to-br from-vave-lavender/70 to-vave-coral/50",
  },
  {
    id: 5,
    title: "Let VAVE help you harness this power...",
    description: "We translate complex AI capabilities into practical, accessible solutions for your business needs.",
    imageBg: "bg-gradient-to-br from-vave-coral/60 to-vave-yellow/60",
  },
];

const StoryMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMascotVisible, setIsMascotVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  useEffect(() => {
    if (!isOpen || !scrollContainerRef.current) return;
    
    const scrollToCurrentSlide = () => {
      const container = scrollContainerRef.current;
      if (!container) return;
      
      container.scrollTo({
        top: currentSlide * window.innerHeight,
        behavior: 'smooth'
      });
    };
    
    scrollToCurrentSlide();
  }, [currentSlide, isOpen]);
  
  const openStory = () => {
    setCurrentSlide(0);
    setIsOpen(true);
    setIsMascotVisible(false);
  };
  
  const closeStory = () => {
    setIsOpen(false);
    
    // Show mascot again after a delay
    setTimeout(() => {
      setIsMascotVisible(true);
    }, 500);
  };
  
  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    if (currentSlide < storyData.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      closeStory();
    }
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  const prevSlide = () => {
    if (isAnimating || currentSlide === 0) return;
    
    setIsAnimating(true);
    setCurrentSlide(currentSlide - 1);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };
  
  // Handle touch events for swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isSignificantSwipe = Math.abs(distance) > 50;
    
    if (isSignificantSwipe) {
      if (distance > 0) {
        // Swiped up
        nextSlide();
      } else {
        // Swiped down
        prevSlide();
      }
    }
    
    // Reset values
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  // Handle scroll events for snap scrolling
  const handleScroll = () => {
    if (isScrolling || !scrollContainerRef.current) return;
    
    setIsScrolling(true);
    
    // Debounce scroll event
    setTimeout(() => {
      const container = scrollContainerRef.current;
      if (!container) {
        setIsScrolling(false);
        return;
      }
      
      const scrollPosition = container.scrollTop;
      const viewportHeight = window.innerHeight;
      const newSlideIndex = Math.round(scrollPosition / viewportHeight);
      
      if (newSlideIndex !== currentSlide && newSlideIndex >= 0 && newSlideIndex < storyData.length) {
        setCurrentSlide(newSlideIndex);
      }
      
      setIsScrolling(false);
    }, 100);
  };

  // Handle wheel events for better scrolling control
  const handleWheel = (e: React.WheelEvent) => {
    if (isScrolling) return;
    
    e.preventDefault();
    
    setIsScrolling(true);
    
    if (e.deltaY > 0) {
      // Scrolling down
      nextSlide();
    } else {
      // Scrolling up
      prevSlide();
    }
    
    setTimeout(() => {
      setIsScrolling(false);
    }, 500);
  };

  return (
    <>
      {/* Floating Mascot */}
      {isMascotVisible && (
        <div 
          className="fixed bottom-20 right-6 z-40 animate-float cursor-pointer transform transition-transform hover:scale-105"
          onClick={openStory}
        >
          <div className="relative">
            {/* Speech bubble */}
            <div className="absolute -top-16 right-0 bg-white rounded-xl shadow-md p-3 min-w-[140px] mb-2">
              <p className="text-sm text-vave-blue font-medium">Click for our story!</p>
              <div className="absolute -bottom-2 right-4 w-4 h-4 bg-white transform rotate-45"></div>
            </div>
            
            {/* Mascot */}
            <div className="w-14 h-14 bg-vave-cyan rounded-full flex items-center justify-center shadow-lg">
              <div className="w-8 h-8 text-white">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L6 6V18L12 22L18 18V6L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 22V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M18 6L12 10L6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 10V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Small Story Trigger */}
      <button 
        onClick={openStory}
        className="fixed z-40 bottom-6 right-6 flex items-center justify-center w-12 h-12 rounded-full bg-vave-blue shadow-lg text-white"
        aria-label="Open Story"
      >
        <MessageCircle size={20} />
      </button>
      
      {/* Full-screen Story Mode */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 z-[60] w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white hover:bg-black/40 transition-colors"
          onClick={closeStory}
        >
          <X size={20} />
        </button>
        
        {/* Progress Indicators */}
        <div className="absolute top-4 left-0 right-0 flex justify-center z-[60]">
          <div className="flex space-x-1">
            {storyData.map((_, index) => (
              <div 
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'w-10 bg-white' : 'w-4 bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>
        
        {/* Navigation Buttons */}
        <button 
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 text-white z-[60] transition-opacity ${
            currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          onClick={prevSlide}
        >
          <ChevronLeft size={24} />
        </button>
        
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 text-white z-[60]"
          onClick={nextSlide}
        >
          <ChevronRight size={24} />
        </button>
        
        {/* Vertical Snap Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="h-full w-full overflow-y-auto overscroll-y-contain snap-y snap-mandatory"
          onScroll={handleScroll}
          onWheel={handleWheel}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ scrollSnapType: 'y mandatory' }}
        >
          {storyData.map((slide, index) => (
            <div 
              key={slide.id}
              className={`h-screen w-full flex items-center justify-center ${slide.imageBg} snap-start snap-always`}
            >
              <div className="max-w-md mx-auto text-white text-center px-8">
                <h2 
                  className={`text-3xl sm:text-4xl font-bold mb-6 animate-fade-in`}
                  style={{ animationDelay: '0.2s' }}
                >
                  {slide.title}
                </h2>
                
                <p 
                  className="text-lg sm:text-xl animate-fade-in"
                  style={{ animationDelay: '0.4s' }}
                >
                  {slide.description}
                </p>
                
                {index === storyData.length - 1 && (
                  <button
                    className="mt-8 px-6 py-3 bg-white text-vave-blue rounded-full font-medium shadow-lg transform transition-transform hover:scale-105 animate-fade-in"
                    style={{ animationDelay: '0.6s' }}
                    onClick={() => window.location.href = '/services'}
                  >
                    Explore Our Solutions
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default StoryMode;
