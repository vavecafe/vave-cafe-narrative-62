
import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const sentenceRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    const sentenceElement = sentenceRef.current;
    if (sentenceElement) {
      observer.observe(sentenceElement);
    }
    
    return () => {
      if (sentenceElement) {
        observer.unobserve(sentenceElement);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white via-white to-vave-grey-light" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-vave-cyan/10 blur-3xl animate-spin-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-vave-blue/5 blur-3xl animate-spin-slow" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
            <div className="inline-block px-4 py-1.5 bg-vave-blue/5 rounded-full">
              <span className="text-vave-blue font-medium text-sm">AI Solutions for SMBs</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight text-vave-blue">
              Empower Your Business with Smarter Solutions
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-xl">
              From automating daily tasks to unlocking new opportunities, we make AI work for you—not the other way around.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/services" className="button-primary flex items-center gap-2 group">
                Discover How
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/approach" className="button-secondary">
                Our Approach
              </Link>
            </div>
          </div>
          
          <div 
            ref={sentenceRef}
            className="relative min-h-[500px] p-8"
            // style={{ opacity: 0 }}
          >
            <div className="glass-card p-8 md:p-10 relative overflow-hidden h-full">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-vave-blue to-vave-cyan" />
              
              <h3 className="text-2xl font-medium mb-6 text-vave-blue">What Sets Us Apart</h3>
              
              <ul className="space-y-4">
                {[
                  { title: "Transparency", text: "Full visibility into how we build and price solutions" },
                  { title: "Co-Creation", text: "We develop alongside our clients, not for them" },
                  { title: "Ethical AI", text: "Committed to responsible AI development practices" },
                  { title: "SMB Focus", text: "Solutions designed specifically for small & medium businesses" }
                ].map((item, index) => (
                  <li 
                    key={index} 
                    className="flex items-start gap-4 opacity-0 animate-fade-in"
                    style={{ animationDelay: `${0.6 + index * 0.2}s`, animationFillMode: 'forwards' }}
                  >
                    <div className="w-6 h-6 rounded-full bg-vave-cyan/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-vave-cyan" />
                    </div>
                    <div>
                      <h4 className="font-medium text-vave-blue">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-16 h-16 rounded-full bg-vave-lavender/30 blur-md" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-vave-cyan/20 blur-md" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
