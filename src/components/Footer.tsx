
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Rotating quotes about transparency and collaboration
  const quotes = [
    "Transparency builds trust.",
    "Collaboration creates value.",
    "Innovation through co-creation.",
    "Ethical AI for everyone.",
    "Building the future together.",
  ];
  
  // Use a random quote from the array
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <footer className="bg-vave-blue text-white">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2">
            <Link to="/" className="text-white text-xl font-medium tracking-tight mb-4 inline-block">
              <span className="font-bold">VAVE</span>cafe.agency
            </Link>
            
            <p className="text-white/80 mt-4 mb-6 max-w-md">
              Empowering small and medium-sized businesses with ethical AI solutions 
              that drive growth and efficiency.
            </p>
            
            <div className="flex items-center">
              <span className="text-white/90 italic">&ldquo;{randomQuote}&rdquo;</span>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/approach" className="text-white/70 hover:text-white transition-colors">
                  Our Approach
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/70 hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-white/70 hover:text-white transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/resources/guides" className="text-white/70 hover:text-white transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/resources/case-studies" className="text-white/70 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link to="/resources/white-papers" className="text-white/70 hover:text-white transition-colors">
                  White Papers
                </Link>
              </li>
              <li>
                <Link to="/resources/blog" className="text-white/70 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-medium mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:hello@vavecafe.agency" className="text-white/70 hover:text-white transition-colors">
                  hello@vavecafe.agency
                </a>
              </li>
              <li>
                <a href="tel:+15551234567" className="text-white/70 hover:text-white transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors">
                  Contact Form
                </Link>
              </li>
              <li>
                <a 
                  href="https://vave.cafe" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-white/70 hover:text-white transition-colors"
                >
                  vave.cafe
                  <ExternalLink size={14} />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <hr className="border-white/10 my-8" />
        
        <div className="flex flex-col md:flex-row gap-4 md:justify-between items-center">
          <p className="text-white/70 text-sm">
            &copy; {currentYear} VAVE Cafe Agency. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <Link to="/privacy" className="text-white/70 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-white/70 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
