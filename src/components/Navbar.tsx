
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-4 bg-white/80 backdrop-blur-md shadow-sm'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="text-vave-blue font-medium text-xl tracking-tight"
            >
              <span className="font-bold">VAVE</span>cafe.agency
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/approach" className="nav-link">Our Approach</Link>
            <Link to="/services" className="nav-link">Services</Link>
            <Link to="/resources" className="nav-link">Resources</Link>
            <Link to="/news" className="nav-link">News</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
          </nav>

          <div className="hidden md:block">
            <Link 
              to="/contact"
              className="button-primary text-sm"
            >
              Book a Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-vave-blue focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen bg-white shadow-lg' : 'max-h-0'
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-4">
          <Link 
            to="/" 
            className="block py-2 text-vave-blue"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/approach" 
            className="block py-2 text-vave-blue"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Our Approach
          </Link>
          <Link 
            to="/services" 
            className="block py-2 text-vave-blue"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Services
          </Link>
          <Link 
            to="/resources" 
            className="block py-2 text-vave-blue"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Resources
          </Link>
          <Link 
            to="/news" 
            className="block py-2 text-vave-blue"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            News
          </Link>
          <Link 
            to="/contact" 
            className="block py-2 text-vave-blue"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/contact"
            className="button-primary block text-center w-full mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Book a Consultation
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
