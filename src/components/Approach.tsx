
import React from 'react';
import { ExternalLink, Heart, Shield, Users, Key, Lightbulb } from 'lucide-react';
import { useInView } from '../lib/animations';
import { Link } from 'react-router-dom';

const Approach = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  const approachItems = [
    {
      icon: <Key className="w-6 h-6 text-vave-blue" />,
      title: "Transparency",
      description: "We provide full visibility into how we build, price, and implement our solutions."
    },
    {
      icon: <Users className="w-6 h-6 text-vave-blue" />,
      title: "Co-Creation",
      description: "We develop solutions alongside our clients, not for them, ensuring alignment at every step."
    },
    {
      icon: <Heart className="w-6 h-6 text-vave-blue" />,
      title: "Ethical AI",
      description: "Our commitment to responsible AI development ensures solutions that respect privacy and fairness."
    },
    {
      icon: <Shield className="w-6 h-6 text-vave-blue" />,
      title: "Equity Sharing",
      description: "We offer flexible partnership models, including equity sharing for long-term collaboration."
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-vave-blue" />,
      title: "Innovation Focus",
      description: "We continuously explore emerging AI technologies to bring cutting-edge solutions to our clients."
    }
  ];

  return (
    <section 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="section-container"
      id="approach"
    >
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 bg-vave-lavender/30 rounded-full text-vave-blue font-medium text-sm mb-4">
          Our Approach
        </span>
        
        <h2 className="text-3xl md:text-4xl font-medium text-vave-blue mb-6">
          Guided by Ethics and Principles
        </h2>
        
        <p className="text-lg text-gray-600">
          Every solution we build is rooted in transparency and co-creation. 
          We believe in building AI that empowers rather than replaces, guided by 
          principles that put your business needs first.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {approachItems.map((item, index) => (
          <div 
            key={index}
            className={`glass-card p-6 transition-all duration-500 transform ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className="w-12 h-12 rounded-full bg-vave-lavender/30 flex items-center justify-center mb-4">
              {item.icon}
            </div>
            
            <h3 className="text-xl font-medium text-vave-blue mb-2">
              {item.title}
            </h3>
            
            <p className="text-gray-600">
              {item.description}
            </p>
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <a 
          href="https://vave.cafe" 
          target="_blank" 
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-vave-blue font-medium hover:text-vave-cyan transition-colors"
        >
          Learn more about our ethos at vave.cafe
          <ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
};

export default Approach;
