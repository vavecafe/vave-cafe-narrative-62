
import React from 'react';
import { useInView, useCountUp } from '../lib/animations';
import { Link } from 'react-router-dom';

interface ServiceCardProps {
  title: string;
  description: string;
  status: 'active' | 'in-development' | 'planned';
  icon: React.ReactNode;
  delay: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  status,
  icon,
  delay,
}) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const getStatusDetails = () => {
    switch (status) {
      case 'active':
        return {
          label: 'Available Now',
          color: 'bg-vave-green',
          progress: 100,
        };
      case 'in-development':
        return {
          label: 'In Development',
          color: 'bg-vave-yellow',
          progress: 75,
        };
      case 'planned':
        return {
          label: 'Coming Soon',
          color: 'bg-vave-grey-dark',
          progress: 25,
        };
    }
  };
  
  const statusDetails = getStatusDetails();
  const displayProgress = isInView ? statusDetails.progress : 0;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`glass-card relative overflow-hidden transition-all duration-500 transform ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="absolute top-0 left-0 h-1 w-full bg-gray-200">
        <div 
          className={`h-full ${statusDetails.color} transition-all duration-1000 ease-out`}
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="w-12 h-12 rounded-full bg-vave-blue/10 flex items-center justify-center">
            {icon}
          </div>
          
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            status === 'active' 
              ? 'bg-vave-green/20 text-vave-green' 
              : status === 'in-development'
                ? 'bg-vave-yellow/20 text-vave-yellow'
                : 'bg-vave-grey-dark/20 text-vave-grey-dark'
          }`}>
            {statusDetails.label}
          </span>
        </div>
        
        <h3 className="text-xl font-medium text-vave-blue mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        
        {status === 'active' ? (
          <Link 
            to="/services" 
            className="text-vave-blue font-medium hover:text-vave-cyan transition-colors"
          >
            Learn more
          </Link>
        ) : status === 'in-development' ? (
          <button className="text-vave-blue font-medium hover:text-vave-cyan transition-colors">
            Notify me
          </button>
        ) : (
          <button className="text-vave-blue font-medium hover:text-vave-cyan transition-colors">
            Vote for this
          </button>
        )}
      </div>
    </div>
  );
};

const Services = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  
  const clientCount = useCountUp(85, 0, 2000, 'easeOut');
  const projectCount = useCountUp(120, 0, 2000, 'easeOut');
  const satisfactionRate = useCountUp(98, 0, 2000, 'easeOut');
  
  const services = [
    {
      title: "AI Agents for Customer Support",
      description: "Intelligent assistants that handle customer inquiries, significantly reducing response times.",
      status: 'active' as const,
      icon: (
        <svg className="w-6 h-6 text-vave-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      ),
    },
    {
      title: "Automation Kits",
      description: "Pre-built automation solutions for common business processes like invoicing and scheduling.",
      status: 'active' as const,
      icon: (
        <svg className="w-6 h-6 text-vave-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: "Voice Assistants for SMBs",
      description: "Customizable voice assistants designed specifically for small and medium-sized businesses.",
      status: 'in-development' as const,
      icon: (
        <svg className="w-6 h-6 text-vave-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
    },
    {
      title: "Predictive Analytics Tools",
      description: "AI-powered analytics that help predict customer behavior and business trends.",
      status: 'in-development' as const,
      icon: (
        <svg className="w-6 h-6 text-vave-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      title: "Customizable Chatbots",
      description: "Fully customizable chatbots that can be tailored to your brand and customer needs.",
      status: 'planned' as const,
      icon: (
        <svg className="w-6 h-6 text-vave-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
        </svg>
      ),
    },
    {
      title: "Industry-Specific AI Solutions",
      description: "AI solutions specially designed for specific industries like retail, healthcare, and education.",
      status: 'planned' as const,
      icon: (
        <svg className="w-6 h-6 text-vave-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-vave-grey-light/50">
      <div className="section-container">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-vave-blue/10 rounded-full text-vave-blue font-medium text-sm mb-4">
            Our Services
          </span>
          
          <h2 className="text-3xl md:text-4xl font-medium text-vave-blue mb-6">
            AI Solutions That Scale With Your Business
          </h2>
          
          <p className="text-lg text-gray-600">
            From ready-to-deploy solutions to concepts in development, we're constantly 
            evolving our offerings to meet the needs of small and medium-sized businesses.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              status={service.status}
              icon={service.icon}
              delay={0.1 * index}
            />
          ))}
        </div>
        
        <div 
          ref={ref as React.RefObject<HTMLDivElement>}
          className="glass-card p-8 md:p-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                value: clientCount,
                label: "Happy Clients",
                suffix: "+",
              },
              {
                value: projectCount,
                label: "Projects Delivered",
                suffix: "+",
              },
              {
                value: satisfactionRate,
                label: "Satisfaction Rate",
                suffix: "%",
              },
            ].map((stat, index) => (
              <div 
                key={index}
                className="text-center"
              >
                <h3 className="text-4xl md:text-5xl font-bold text-vave-blue">
                  {isInView && (
                    <>
                      {stat.value}
                      <span className="text-vave-cyan">{stat.suffix}</span>
                    </>
                  )}
                </h3>
                <p className="text-gray-600 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
