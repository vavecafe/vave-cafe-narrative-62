
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useInView } from '../lib/animations';
import { Link } from 'react-router-dom';

interface ResourceCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  delay: number;
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  category,
  image,
  link,
  delay,
}) => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`glass-card overflow-hidden transition-all duration-500 transform ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm text-vave-blue">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-medium text-vave-blue mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        
        <Link 
          to={link}
          className="inline-flex items-center gap-1 text-vave-blue font-medium hover:text-vave-cyan transition-colors"
        >
          Read more <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

const Resources = () => {
  const resources = [
    {
      title: "Guide to Implementing AI in Small Businesses",
      description: "A comprehensive guide on how small businesses can leverage AI without breaking the bank.",
      category: "Guide",
      image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=500&h=300",
      link: "/resources/ai-implementation-guide",
    },
    {
      title: "Case Study: How a Retail SMB Increased Sales by 35%",
      description: "Learn how a small retail business used our AI solutions to significantly boost their sales.",
      category: "Case Study",
      image: "https://images.unsplash.com/photo-1556740758-90de374c12ad?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=500&h=300",
      link: "/resources/retail-case-study",
    },
    {
      title: "The Future of Customer Service Automation",
      description: "Explore how AI is transforming customer service and what this means for businesses of all sizes.",
      category: "White Paper",
      image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&w=500&h=300",
      link: "/resources/customer-service-automation",
    },
  ];

  return (
    <section className="section-container">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <span className="inline-block px-4 py-1.5 bg-vave-cyan/10 rounded-full text-vave-blue font-medium text-sm mb-4">
          Resources
        </span>
        
        <h2 className="text-3xl md:text-4xl font-medium text-vave-blue mb-6">
          Knowledge to Power Your Business
        </h2>
        
        <p className="text-lg text-gray-600">
          Explore our collection of guides, case studies, and white papers to help you 
          make informed decisions about implementing AI in your business.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {resources.map((resource, index) => (
          <ResourceCard
            key={index}
            title={resource.title}
            description={resource.description}
            category={resource.category}
            image={resource.image}
            link={resource.link}
            delay={0.1 * index}
          />
        ))}
      </div>
      
      <div className="text-center">
        <Link 
          to="/resources"
          className="button-secondary"
        >
          View All Resources
        </Link>
      </div>
    </section>
  );
};

export default Resources;
