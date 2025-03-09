
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
  const slideRef = useRef<HTMLDivElement>(null);
  
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
    if (isOpen && slideRef.current) {
      slideRef.current.scrollTop = 0;
    }
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
      
      {/* Story Modal */}
      <div 
        className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeStory}></div>
        
        <div 
          className="relative z-10 w-full max-w-lg max-h-full h-[80vh] overflow-hidden rounded-xl shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
            onClick={closeStory}
          >
            <X size={18} />
          </button>
          
          {/* Story Content */}
          <div 
            ref={slideRef}
            className={`w-full h-full ${storyData[currentSlide].imageBg} p-8 flex flex-col items-center justify-center text-white overflow-auto`}
          >
            <div className="max-w-md mx-auto space-y-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold animate-fade-in">
                {storyData[currentSlide].title}
              </h2>
              
              <p className="text-lg sm:text-xl animate-fade-in animation-delay-200">
                {storyData[currentSlide].description}
              </p>
            </div>
          </div>
          
          {/* Story Progress Indicators */}
          <div className="absolute top-4 left-4 right-4 flex justify-center z-10">
            <div className="flex space-x-1">
              {storyData.map((_, index) => (
                <div 
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'w-8 bg-white' : 'w-4 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button 
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 text-white z-10 transition-opacity ${
              currentSlide === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/20 text-white z-10"
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </>
  );
};

export default StoryMode;
