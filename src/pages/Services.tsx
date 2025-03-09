
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SolutionsFilter from '../components/SolutionsFilter';
import SolutionsList from '../components/SolutionsList';
import { useInView } from '../lib/animations';

const Services = () => {
  const { ref: titleRef, isInView: isTitleInView } = useInView({ threshold: 0.2 });
  const { ref: subtitleRef, isInView: isSubtitleInView } = useInView({ threshold: 0.2 });
  
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 
              ref={titleRef as React.RefObject<HTMLHeadingElement>} 
              className={`text-4xl md:text-5xl font-medium mb-6 transition-all duration-700 ${
                isTitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Solutions Discovery
            </h1>
            <p 
              ref={subtitleRef as React.RefObject<HTMLParagraphElement>}
              className={`text-lg text-muted-foreground transition-all duration-700 delay-300 ${
                isSubtitleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              Explore our range of AI solutions and find the perfect fit for your business. 
              Filter by your needs, goals, and resources to discover how we can help you grow.
            </p>
          </div>

          <SolutionsFilter />
          <SolutionsList />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
