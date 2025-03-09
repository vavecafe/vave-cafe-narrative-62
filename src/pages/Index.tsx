
import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import StoryMode from '../components/StoryMode';
import Approach from '../components/Approach';
import Services from '../components/Services';
import Resources from '../components/Resources';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Approach />
        <Services />
        <Resources />
        <Contact />
        <StoryMode />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
