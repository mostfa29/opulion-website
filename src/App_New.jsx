import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Zap, TrendingUp, Clock, Users, Menu, X, AlertTriangle, Target, BarChart3, CheckCircle, Mail, MapPin } from 'lucide-react';
import CompanyLogo from './assets/logo.png'; // Adjust path as needed


// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
        />
        
        {/* Modal Content */}
        <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl p-8 text-left align-middle shadow-xl transition-all duration-300 scale-100 opacity-100"
             style={{ background: 'linear-gradient(135deg, #0A092A 0%, #1a1850 100%)', border: '1px solid rgba(44, 251, 255, 0.3)' }}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
          >
            <X size={24} />
          </button>
          {children}
        </div>
      </div>
    </div>
  );
};

// Lead Magnet Form Component
const LeadMagnetForm = ({ title, description, downloadUrl, source, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      setSubmitMessage('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage('');

    // Updated Google Apps Script URL - make sure this is deployed as a web app
    const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbya7WzvCMXRlbE1vmvb-Ke5AloIu_HOFYBDOCC7YAXbXBwZ7CRcL25tBVYy3XZwzZWQ/exec"

    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          timestamp: new Date().toISOString(),
          source: source || 'Lead Magnet Download'
        })
      });

      // Since we're using no-cors, we can't read the response
      // but if we get here without error, it likely succeeded
      setIsSubmitted(true);
      setSubmitMessage('Success! Redirecting to your download...');
      
      // Redirect to download after 2 seconds
      setTimeout(() => {
        if (downloadUrl) {
          window.open(downloadUrl, '_blank');
        }
        if (onClose) {
          onClose();
        }
      }, 2000);

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('Something went wrong. Please try again or contact support.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="text-4xl text-green-300 mb-4 animate-bounce">✓</div>
        <h3 className="text-xl font-bold text-white mb-2">Success!</h3>
        <p className="text-gray-300">{submitMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
      <p className="text-gray-300 mb-6">{description}</p>
      
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name *"
            required
            className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email *"
            required
            className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          />
        </div>
        
        <div>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company Website *"
            required
            className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          />
        </div>
        
        {submitMessage && !isSubmitted && (
          <p className="text-red-300 text-sm">{submitMessage}</p>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 text-gray-900 font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(45deg, #2CFBFF 0%, #E547FF 100%)' }}
        >
          {isSubmitting ? 'Submitting...' : 'Get Instant Access'}
        </button>
      </form>
    </div>
  );
};
const StrategySessionForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    portfolioSize: '',
    primaryChallenge: '',
    additionalInfo: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      setSubmitMessage('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);
    setSubmitMessage('');

    // Updated Google Apps Script URL - make sure this is deployed as a web app
    const GOOGLE_SHEETS_URL ="https://script.google.com/macros/s/AKfycbya7WzvCMXRlbE1vmvb-Ke5AloIu_HOFYBDOCC7YAXbXBwZ7CRcL25tBVYy3XZwzZWQ/exec"
    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          portfolioSize: formData.portfolioSize,
          primaryChallenge: formData.primaryChallenge,
          additionalInfo: formData.additionalInfo,
          timestamp: new Date().toISOString(),
          source: 'Strategy Session Request'
        })
      });

      // Since we're using no-cors, we can't read the response
      // but if we get here without error, it likely succeeded
      setIsSubmitted(true);
      setSubmitMessage('Success! Our founder will reach out to you personally within 24 hours.');

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('Something went wrong. Please try again or contact support directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <div className="text-4xl text-green-300 mb-4 animate-bounce">✓</div>
        <h3 className="text-xl font-bold text-white mb-2">Request Received!</h3>
        <p className="text-gray-300 mb-4">{submitMessage}</p>
        <button
          onClick={onClose}
          className="px-6 py-2 text-gray-900 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
          style={{ background: 'linear-gradient(45deg, #2CFBFF 0%, #E547FF 100%)' }}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-4">Request Your Strategy Session</h3>
      <p className="text-gray-300 mb-6">Get your custom infrastructure blueprint in a 30-minute strategic session.</p>
      
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name *"
            required
            className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          />
        </div>
        
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email *"
            required
            className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          />
        </div>
        
        <div>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            placeholder="Company Website *"
            required
            className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          />
        </div>

        <div>
          <select
            name="portfolioSize"
            value={formData.portfolioSize}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <option value="" style={{ background: '#1a1850', color: 'white' }}>Select Portfolio Size</option>
            <option value="Under $5M AUM" style={{ background: '#1a1850', color: 'white' }}>Under $5M AUM</option>
            <option value="$5M - $25M AUM" style={{ background: '#1a1850', color: 'white' }}>$5M - $25M AUM</option>
            <option value="$25M - $100M AUM" style={{ background: '#1a1850', color: 'white' }}>$25M - $100M AUM</option>
            <option value="$100M+ AUM" style={{ background: '#1a1850', color: 'white' }}>$100M+ AUM</option>
            <option value="Family Office/HNWI" style={{ background: '#1a1850', color: 'white' }}>Family Office/HNWI</option>
          </select>
        </div>

        <div>
          <select
            name="primaryChallenge"
            value={formData.primaryChallenge}
            onChange={handleInputChange}
            className="w-full px-4 py-3 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          >
            <option value="" style={{ background: '#1a1850', color: 'white' }}>Primary Challenge (Optional)</option>
            <option value="Manual processes limiting growth" style={{ background: '#1a1850', color: 'white' }}>Manual processes limiting growth</option>
            <option value="Need better investor reporting" style={{ background: '#1a1850', color: 'white' }}>Need better investor reporting</option>
            <option value="Portfolio performance optimization" style={{ background: '#1a1850', color: 'white' }}>Portfolio performance optimization</option>
            <option value="Scaling operations efficiently" style={{ background: '#1a1850', color: 'white' }}>Scaling operations efficiently</option>
            <option value="Technology integration strategy" style={{ background: '#1a1850', color: 'white' }}>Technology integration strategy</option>
            <option value="Capital raising preparation" style={{ background: '#1a1850', color: 'white' }}>Capital raising preparation</option>
          </select>
        </div>
        
        <div>
          <textarea
            name="additionalInfo"
            value={formData.additionalInfo}
            onChange={handleInputChange}
            placeholder="Additional context about your goals or challenges (Optional)"
            rows="3"
            className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200 resize-vertical"
            style={{ background: 'rgba(255, 255, 255, 0.1)' }}
          />
        </div>
        
        {submitMessage && !isSubmitted && (
          <p className="text-red-300 text-sm">{submitMessage}</p>
        )}
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 px-6 text-gray-900 font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: 'linear-gradient(45deg, #2CFBFF 0%, #E547FF 100%)' }}
        >
          {isSubmitting ? 'Submitting Request...' : 'Request Strategy Session'}
        </button>
      </form>
    </div>
  );
};


const Footer = () => {
  const [emailSignup, setEmailSignup] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const location = useLocation();


  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!emailSignup) return;
    
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setSubmitMessage('Subscribed successfully!');
      setEmailSignup('');
      setIsSubmitting(false);
      setTimeout(() => setSubmitMessage(''), 3000);
    }, 1500);
  };

  const currentYear = new Date().getFullYear();

  const navigateToPage = (path) => {
    // In a real app, you'd use router navigation here
    console.log(`Navigate to: ${path}`);
  };

  return (
    <footer className="relative" style={{ background: 'linear-gradient(135deg, #0A092A 0%, #1a1850 100%)' }}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-20 left-20 w-64 h-64 rounded-full opacity-5 animate-pulse" 
          style={{ background: 'radial-gradient(circle, #2CFBFF 0%, transparent 70%)' }}
        />
        <div 
          className="absolute bottom-20 right-20 w-48 h-48 rounded-full opacity-10 animate-ping" 
          style={{ background: 'radial-gradient(circle, #E547FF 0%, transparent 70%)' }}
        />
      </div>

      <div className="relative z-10">
        {/* CTA Section Above Footer */}


        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Company Info */}
            <div className="lg:col-span-1">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-30">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            <img src={CompanyLogo} className="h-30 w-auto" alt="Opulion" />
          </Link>
 
        </div>
      </div>
             
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                We build the systems that let under-$100M AUM CRE operators scale beyond cycles. 
                Strategic infrastructure partnership for serious operators.
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-400">
                  <MapPin size={16} />
                  <span className="text-sm">Global Operations</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-400">
                  <Mail size={16} />
                  <a href="mailto:amin29199@gmail.com" className="text-sm hover:text-cyan-300 transition-colors">
                    Founder contact info: amin29199@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">Services</h3>
              <div className="space-y-3">
                {[
                  { name: 'AI Underwriting Pipeline', path: '/ai-underwriting' },
                  { name: 'Liquidity Systems', path: '/liquidity-systems' },
                  { name: 'Information Velocity', path: '/information-velocity' },
                  { name: 'Strategy Sessions', path: '/strategy-session' }
                ].map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`text-white hover:text-cyan-300 transition-colors duration-200 font-medium flex items-center h-16 ${
                        location.pathname ===item.path ? 'text-cyan-300' : ''
                      }`}
                    >
                      {item.name}
                    </Link>

                ))}
              </div>
            </div>

            {/* Company */}
            {/* <div>
              <h3 className="text-lg font-semibold text-white mb-6">Company</h3>
              <div className="space-y-3">
                {[
                  { name: 'About', path: '/about' },
                  { name: 'Newsletter', path: '/newsletter' },
                  { name: 'Case Studies', path: '/case-studies' },
                  { name: 'Contact', path: '/contact' }
                ].map((link) => (
                  <button
                    key={link.path}
                    onClick={() => navigateToPage(link.path)}
                    className="block text-gray-300 hover:text-cyan-300 transition-colors duration-200 text-left"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div> */}

            {/* Newsletter Signup */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-6">The Infrastructure Edge</h3>
              <p className="text-gray-300 text-sm mb-4">
                Market intelligence for operators who build systems, not spreadsheets.
              </p>
              
              <div className="space-y-3">
                <div className="flex">
                  <input
                    type="email"
                    value={emailSignup}
                    onChange={(e) => setEmailSignup(e.target.value)}
                    placeholder="Your email"
                    className="flex-1 px-4 py-2 rounded-l-lg text-white placeholder-gray-400 border border-gray-600 border-r-0 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  />
                  <button
                    onClick={handleEmailSubmit}
                    disabled={isSubmitting}
                    className="px-4 py-2 rounded-r-lg text-gray-900 font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50"
                    style={{ background: 'linear-gradient(45deg, #2CFBFF 0%, #E547FF 100%)' }}
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
                {submitMessage && (
                  <p className="text-green-300 text-sm">{submitMessage}</p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © {currentYear} Opulion. All rights reserved.
              </div>
              
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => navigateToPage('/privacy')} 
                  className="text-gray-400 hover:text-cyan-300 text-sm transition-colors"
                >
                  Privacy Policy
                </button>
                <button 
                  onClick={() => navigateToPage('/terms')} 
                  className="text-gray-400 hover:text-cyan-300 text-sm transition-colors"
                >
                  Terms of Service
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};



// Navigation Component
const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'AI Underwriting', path: '/ai-underwriting' },
    { name: 'Liquidity Systems', path: '/liquidity-systems' },
    { name: 'Information Velocity', path: '/information-velocity' },
    { name: 'About', path: '/about' },
    { name: 'Newsletter', path: '/newsletter' }
  ];

  return (
    <nav className="fixed top-0 w-full z-40 bg-opacity-90 backdrop-blur-md" style={{ backgroundColor: 'rgba(10, 9, 42, 0.9)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/"
            className="flex items-center cursor-pointer transition-transform duration-200 hover:scale-105"
          >
            <img src={CompanyLogo} className="h-20 w-auto" alt="Opulion" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-white hover:text-cyan-300 transition-colors duration-200 font-medium flex items-center h-16 ${
                  location.pathname === item.path ? 'text-cyan-300' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <Link
              to="/strategy-session"
              className="border border-pink-400 text-pink-400 px-4 py-2 rounded-lg hover:bg-pink-400 hover:text-gray-900 transition-all duration-200 flex items-center"
            >
              Strategy Session
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-white hover:text-cyan-300 px-3 py-2 text-base font-medium w-full text-left ${
                  location.pathname === item.path ? 'text-cyan-300' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/strategy-session"
              onClick={() => setMobileMenuOpen(false)}
              className="block border border-pink-400 text-pink-400 px-3 py-2 rounded-lg hover:bg-pink-400 hover:text-gray-900 transition-all duration-200 mx-3 mt-4 text-center"
            >
              Strategy Session
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

// Home Page Component
const HomePage = () => {
  const navigate = useNavigate();
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0A092A 0%, #1a1850 100%)' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20 animate-pulse" 
            style={{ background: 'radial-gradient(circle, #2CFBFF 0%, transparent 70%)' }}
          ></div>
          <div 
            className="absolute top-40 right-20 w-32 h-32 rounded-full opacity-30 animate-ping" 
            style={{ background: 'radial-gradient(circle, #E547FF 0%, transparent 70%)' }}
          ></div>
          <div 
            className="absolute bottom-20 left-1/3 w-48 h-48 rounded-full opacity-15 animate-pulse" 
            style={{ background: 'radial-gradient(circle, #6A4CFF 0%, transparent 70%)' }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-20">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              We build the systems that let <br />
              <span 
                className="bg-gradient-to-r from-cyan-300 to-pink-400 bg-clip-text text-transparent"
              >
                under-$100M AUM CRE operators
              </span> <br />
              scale beyond cycles
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              While others add people to problems, we architect infrastructure that eliminates complexity
            </p>
            
            <button
              onClick={() => setStrategyModalOpen(true)}
              className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ background: 'linear-gradient(45deg, #2CFBFF 0%, #E547FF 100%)' }}
            >
              Get Your Infrastructure Blueprint
              <ArrowRight className="ml-2" size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* The Brutal Truth Section */}
      <div className="py-20" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Brutal Truth</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              CRE Operators under $100M AUM don't fail because they can't find deals or raise equity. They fail because they never build systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Capital Gets Trapped",
                description: "3-10 year lock-ups while opportunities pass by",
                icon: <Clock className="w-8 h-8 text-cyan-300" />
              },
              {
                title: "Deals Move Too Slow", 
                description: "Weeks of analysis while competitors close in hours",
                icon: <TrendingUp className="w-8 h-8 text-pink-300" />
              },
              {
                title: "Reporting Lags by Quarters",
                description: "Stale data when markets move daily", 
                icon: <Zap className="w-8 h-8 text-purple-300" />
              },
              {
                title: "One Founder = Whole Firm",
                description: "Everything stops when you're not there",
                icon: <Users className="w-8 h-8 text-blue-300" />
              }
            ].map((item, index) => (
              <div key={index} className="p-8 rounded-2xl animate-slide-up transition-all duration-300 hover:scale-105" 
                   style={{ 
                     background: 'rgba(255, 255, 255, 0.05)', 
                     border: '1px solid rgba(255, 255, 255, 0.1)',
                     animationDelay: `${index * 0.1}s`
                   }}>
                <div className="flex items-center mb-4">
                  {item.icon}
                  <h3 className="text-xl font-bold text-white ml-3">{item.title}</h3>
                </div>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in">
            <p className="text-xl text-gray-300">
              That's fragility. Hustle can't fix it. We built Opulion to erase it.
            </p>
          </div>
        </div>
      </div>

      {/* What We Build Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What We Build</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Opulion is not a consultancy. It's not a fund. It's a strategic infrastructure partner for serious operators in the messy middle — too big for spreadsheets, too small for billion-dollar overhead.
            </p>
          </div>

          <div className="space-y-12">
            {[
              {
                title: "AI Underwriting Pipelines",
                description: "Deals processed in milliseconds, not weeks. Machine learning models that analyze market data, financial projections, and risk factors faster than any analyst team. Your competition is still reading executive summaries while you're already moving to close.",
                gradient: "from-cyan-300 to-blue-400",
                link: "/ai-underwriting"
              },
              {
                title: "Liquidity Systems", 
                description: "Tokenization & SMA rails that turn illiquid capital into live streams. Break the 7-10 year lock-up prison. Investors see exits when they need them, not when the market decides. Fractional ownership that scales without regulatory nightmares.",
                gradient: "from-pink-300 to-purple-400",
                link: "/liquidity-systems"
              },
              {
                title: "Information Velocity",
                description: "From quarterly lag to real-time dashboards. Live P&L updates, occupancy tracking, maintenance alerts, cash flow projections. Your LPs see performance metrics before you finish your morning coffee.",
                gradient: "from-purple-300 to-indigo-400",
                link: "/information-velocity"
              }
            ].map((system, index) => (
              <div key={index} className="p-8 rounded-2xl animate-slide-up transition-all duration-300 hover:scale-105" 
                   style={{ 
                     background: 'rgba(255, 255, 255, 0.05)', 
                     border: '1px solid rgba(255, 255, 255, 0.1)',
                     animationDelay: `${index * 0.2}s`
                   }}>
                <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${system.gradient} bg-clip-text text-transparent`}>
                  {system.title}
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">{system.description}</p>
                <Link 
                  to={system.link}
                  className="inline-flex items-center text-cyan-300 hover:text-cyan-100 transition-colors duration-200"
                >
                  Learn More <ArrowRight className="ml-2" size={16} />
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in">
            <p className="text-xl font-bold text-white">
              We don't throw people at problems. We delete the problems.
            </p>
          </div>
        </div>
      </div>

      {/* The Bet Section */}
      <div className="py-20" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Bet We're Making</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              The largest wealth transfer in history is underway. $84 trillion moving from Boomers to Millennials over the next 20 years. The new money doesn't care about your track record or your golf game. They care about transparency, liquidity, and systems that scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="p-8 rounded-2xl animate-slide-in-left" 
                 style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <h3 className="text-2xl font-bold text-red-300 mb-6">Old Model</h3>
              <div className="space-y-3">
                <p className="text-gray-300">• Relationship-driven</p>
                <p className="text-gray-300">• Quarterly reporting</p>
                <p className="text-gray-300">• 7-year lock-ups</p>
                <p className="text-gray-300">• Excel-based operations</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl animate-slide-in-right" 
                 style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
              <h3 className="text-2xl font-bold text-green-300 mb-6">New Model</h3>
              <div className="space-y-3">
                <p className="text-gray-300">• Data-driven</p>
                <p className="text-gray-300">• Real-time transparency</p>
                <p className="text-gray-300">• Liquid alternatives</p>
                <p className="text-gray-300">• AI-powered infrastructure</p>
              </div>
            </div>
          </div>

          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-8">Timeline</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  period: "2025-2027",
                  title: "Early adopters establish competitive moats",
                  color: "cyan"
                },
                {
                  period: "2027-2030", 
                  title: "Industry standard shifts. Investors refuse operators lacking real-time transparency",
                  color: "pink"
                },
                {
                  period: "2030+",
                  title: "Winner-take-most dynamics. Best systems capture disproportionate market share",
                  color: "purple"
                }
              ].map((phase, index) => (
                <div key={index} className="p-6 rounded-xl text-center" 
                     style={{ background: `rgba(${phase.color === 'cyan' ? '44, 251, 255' : phase.color === 'pink' ? '229, 71, 255' : '106, 76, 255'}, 0.1)`, 
                             border: `1px solid rgba(${phase.color === 'cyan' ? '44, 251, 255' : phase.color === 'pink' ? '229, 71, 255' : '106, 76, 255'}, 0.3)` }}>
                  <h4 className={`text-lg font-bold mb-3 text-${phase.color}-300`}>{phase.period}</h4>
                  <p className="text-gray-300 text-sm">{phase.title}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12 animate-fade-in">
            <p className="text-xl text-gray-300">
              The question isn't whether this transformation happens. The question is whether you lead it or get left behind.
            </p>
          </div>
        </div>
      </div>

      {/* Track Record Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Track Record</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                metric: "$50M+",
                description: "CRE transactions engineered",
                detail: "Real deals, real closings, real profits. Not theoretical models."
              },
              {
                metric: "$30M+", 
                description: "capital raised through automation",
                detail: "Investor matching algorithms that work. Partner operators who've eliminated fundraising friction."
              },
              {
                metric: "~12%",
                description: "more liquidity unlocked",
                detail: "Tokenization and SMA structures creating exit opportunities without forced sales."
              }
            ].map((stat, index) => (
              <div key={index} className="p-8 rounded-2xl text-center animate-slide-up transition-all duration-300 hover:scale-105" 
                   style={{ 
                     background: 'rgba(255, 255, 255, 0.05)', 
                     border: '1px solid rgba(255, 255, 255, 0.1)',
                     animationDelay: `${index * 0.1}s`
                   }}>
                <h3 className="text-3xl font-bold text-cyan-300 mb-2">{stat.metric}</h3>
                <h4 className="text-lg font-semibold text-white mb-4">{stat.description}</h4>
                <p className="text-gray-300 text-sm">{stat.detail}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12 animate-fade-in">
            <p className="text-xl font-bold text-white">
              When systems replace hustle, results compound.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div 
        className="py-20" 
        style={{ background: 'linear-gradient(135deg, rgba(44, 251, 255, 0.1) 0%, rgba(229, 71, 255, 0.1) 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 animate-slide-up">
            Ready to build the infrastructure that scales beyond cycles?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              "Book a strategy session → We analyze your current operations and identify highest-impact improvements",
              "Receive your custom blueprint → Detailed roadmap for transforming from founder-dependent to system-driven", 
              "Deploy your infrastructure → From spreadsheets to enterprise systems. From quarterly reports to real-time dashboards."
            ].map((step, index) => (
              <div key={index} className="p-6 rounded-xl animate-slide-up" 
                   style={{ 
                     background: 'rgba(255, 255, 255, 0.05)',
                     animationDelay: `${index * 0.1}s`
                   }}>
                <div className="text-2xl font-bold text-cyan-300 mb-3">{index + 1}</div>
                <p className="text-gray-300">{step}</p>
              </div>
            ))}
          </div>

          <div className="mb-8 animate-fade-in">
            <p className="text-lg text-gray-300 mb-2">No long-term contracts. No upfront risk. Results guaranteed.</p>
          </div>

          <button
            onClick={() => setStrategyModalOpen(true)}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: 'linear-gradient(45deg, #2CFBFF 0%, #E547FF 100%)' }}
          >
            Get Your Infrastructure Blueprint
            <ArrowRight className="ml-2" size={20} />
          </button>

          <div className="text-center mt-8 animate-fade-in">
            <p className="text-xl font-bold text-white">
              Systems first. Growth follows. That's the future. That's Opulion.
            </p>
          </div>
        </div>
      </div>

      {/* Strategy Session Modal */}
      <Modal isOpen={strategyModalOpen} onClose={() => setStrategyModalOpen(false)}>
        <StrategySessionForm onClose={() => setStrategyModalOpen(false)} />
      </Modal>
    </div>
  );
};


// Systems Free Page (for lead magnet redirects)
const SystemsFreePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0A092A 0%, #1a1850 100%)' }}>
      <div className="max-w-4xl mx-auto px-4 text-center animate-fade-in">
        <div className="p-12 rounded-2xl" 
             style={{ background: 'rgba(44, 251, 255, 0.1)', border: '1px solid rgba(44, 251, 255, 0.3)' }}>
          <div className="text-6xl text-cyan-300 mb-8 animate-bounce">🎉</div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Download is Ready!
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Check your email for your systematic advantage blueprint. Your competitive edge starts now.
          </p>
          <div className="space-y-4 text-left max-w-2xl mx-auto mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-cyan-300 flex items-center justify-center text-gray-900 font-bold">1</div>
              <p className="text-gray-300">Download and review your systematic framework</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-pink-300 flex items-center justify-center text-gray-900 font-bold">2</div>
              <p className="text-gray-300">Identify immediate implementation opportunities</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-purple-300 flex items-center justify-center text-gray-900 font-bold">3</div>
              <p className="text-gray-300">Book a strategy session to architect your complete transformation</p>
            </div>
          </div>
          <Link
            to="/"
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: 'linear-gradient(45deg, #2CFBFF 0%, #E547FF 100%)' }}
          >
            Return to Opulion
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

// Main App Component with Router
const App = () => {
  useEffect(() => {
    // Add custom CSS animations
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fade-in {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      
      @keyframes slide-up {
        from { 
          opacity: 0; 
          transform: translateY(30px); 
        }
        to { 
          opacity: 1; 
          transform: translateY(0); 
        }
      }
      
      @keyframes slide-in-left {
        from { 
          opacity: 0; 
          transform: translateX(-50px); 
        }
        to { 
          opacity: 1; 
          transform: translateX(0); 
        }
      }
      
      @keyframes slide-in-right {
        from { 
          opacity: 0; 
          transform: translateX(50px); 
        }
        to { 
          opacity: 1; 
          transform: translateX(0); 
        }
      }
      
      .animate-fade-in {
        animation: fade-in 0.8s ease-out forwards;
      }
      
      .animate-slide-up {
        animation: slide-up 0.8s ease-out forwards;
      }
      
      .animate-slide-in-left {
        animation: slide-in-left 0.8s ease-out forwards;
      }
      
      .animate-slide-in-right {
        animation: slide-in-right 0.8s ease-out forwards;
      }
      
      /* Stagger animations */
      .animate-slide-up:nth-child(1) { animation-delay: 0.1s; }
      .animate-slide-up:nth-child(2) { animation-delay: 0.2s; }
      .animate-slide-up:nth-child(3) { animation-delay: 0.3s; }
      .animate-slide-up:nth-child(4) { animation-delay: 0.4s; }
      .animate-slide-up:nth-child(5) { animation-delay: 0.5s; }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen" style={{ background: '#0A092A' }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ai-underwriting" element={<AIUnderwritingPage />} />
          <Route path="/liquidity-systems" element={<LiquiditySystemsPage />} />
          <Route path="/information-velocity" element={<InformationVelocityPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/strategy-session" element={<StrategySessionPage />} />
          <Route path="/systems-free" element={<SystemsFreePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};



const AIUnderwritingPage = () => {
  const [leadMagnetModalOpen, setLeadMagnetModalOpen] = useState(false);
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0A092A 0%, #1a1850 100%)' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-32 left-16 w-96 h-96 rounded-full opacity-10 animate-pulse" 
            style={{ background: 'radial-gradient(circle, #2CFBFF 0%, transparent 70%)' }}
          />
          <div 
            className="absolute bottom-32 right-16 w-64 h-64 rounded-full opacity-20 animate-ping" 
            style={{ background: 'radial-gradient(circle, #3A8BFF 0%, transparent 70%)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
                AI Underwriting Pipeline
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto font-semibold">
              While your competition analyzes 20 deals quarterly, you'll process 500+ monthly
            </p>
          </div>
        </div>
      </div>

      {/* The Problem Section */}
      <div className="py-20" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Problem We Solve</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="p-8 rounded-2xl" 
                 style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <h3 className="text-2xl font-bold text-red-300 mb-6">Your Current Reality</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-300 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Deal analysis takes 40-60 hours per property</p>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-300 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">You're reviewing the same 15 assumptions manually every time</p>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-300 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">By the time you finish your underwriting, three other groups already submitted offers</p>
                </div>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-300 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Your "market research" is calling brokers and checking comparable sales from six months ago</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-2xl" 
                   style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)' }}>
                <h3 className="text-2xl font-bold text-red-300 mb-6">The Brutal Math</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Average deal analysis:</span>
                    <span className="text-red-300 font-bold">50 hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Annual deal capacity:</span>
                    <span className="text-red-300 font-bold">50-75 properties max</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Decision accuracy:</span>
                    <span className="text-red-300 font-bold">31% (industry average)</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Time to offer:</span>
                    <span className="text-red-300 font-bold">2-3 weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Opportunities missed:</span>
                    <span className="text-red-300 font-bold">Countless</span>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl" 
                   style={{ background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)' }}>
                <h3 className="text-2xl font-bold text-red-300 mb-4">What This Actually Costs You</h3>
                <p className="text-gray-300 leading-relaxed">
                  If your blended team cost is $150/hour, manual underwriting costs <span className="text-red-300 font-bold">$7,500 per deal</span>. 
                  Multiply by 50 deals annually = <span className="text-red-300 font-bold text-xl">$375,000 in analysis costs alone</span>.
                </p>
                <p className="text-gray-300 mt-4 font-semibold">
                  Plus the opportunity cost of deals you never see or lose to faster competitors.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What We Build Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What We Build</h2>
            <h3 className="text-2xl font-bold text-cyan-300 mb-8">The System Architecture:</h3>
          </div>

          <div className="space-y-12">
            {[
              {
                number: "1",
                title: "Market Intelligence Layer",
                icon: <TrendingUp className="w-8 h-8" />,
                points: [
                  "Real-time monitoring of 2,400+ listings across all platforms",
                  "Courthouse record scraping for distress signals",
                  "Economic indicator integration predicting market shifts 6-12 months ahead",
                  "Comparable transaction database updated daily, not quarterly"
                ]
              },
              {
                number: "2",
                title: "AI Analysis Engine", 
                icon: <Zap className="w-8 h-8" />,
                points: [
                  "73-criteria evaluation framework processing financial, market, and operational factors",
                  "Machine learning models trained on 1,000+ historical deal outcomes",
                  "Automated sensitivity analysis across multiple economic scenarios",
                  "Risk scoring algorithms with 73% prediction accuracy vs. 31% manual"
                ]
              },
              {
                number: "3",
                title: "Decision Support System",
                icon: <Target className="w-8 h-8" />,
                points: [
                  "Investment thesis generation with supporting documentation",
                  "Capital requirements and financing optimization recommendations",
                  "Timeline and resource allocation planning with critical path identification",
                  "Portfolio fit analysis considering diversification and strategic objectives"
                ]
              }
            ].map((system, index) => (
              <div key={index} className="p-8 rounded-2xl relative overflow-hidden" 
                   style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(44, 251, 255, 0.3)' }}>
                <div className="flex items-start space-x-6">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-gray-900 flex-shrink-0"
                    style={{ background: 'linear-gradient(45deg, #2CFBFF 0%, #3A8BFF 100%)' }}
                  >
                    {system.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="text-cyan-300">{system.icon}</div>
                      <h3 className="text-2xl font-bold text-cyan-300">{system.title}</h3>
                    </div>
                    <div className="space-y-3">
                      {system.points.map((point, pointIndex) => (
                        <div key={pointIndex} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-cyan-300 mt-1 flex-shrink-0" />
                          <p className="text-gray-300">{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Results Section */}
      <div className="py-20" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Results</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="space-y-8">
              <div className="p-8 rounded-2xl" 
                   style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                <div className="flex items-center space-x-3 mb-6">
                  <Clock className="w-8 h-8 text-green-300" />
                  <h3 className="text-2xl font-bold text-green-300">Speed Transformation</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-green-300/20">
                    <span className="text-gray-300">Analysis time:</span>
                    <span className="text-green-300 font-bold">4 hours vs. 40-60 hours (90% reduction)</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-green-300/20">
                    <span className="text-gray-300">Decision timeline:</span>
                    <span className="text-green-300 font-bold">Same day vs. 2-3 weeks</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-green-300/20">
                    <span className="text-gray-300">Deal capacity:</span>
                    <span className="text-green-300 font-bold">500+ monthly vs. 50-75 annually (10x increase)</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Market coverage:</span>
                    <span className="text-green-300 font-bold">Every relevant opportunity</span>
                  </div>
                </div>
              </div>

              <div className="p-8 rounded-2xl" 
                   style={{ background: 'rgba(44, 251, 255, 0.1)', border: '1px solid rgba(44, 251, 255, 0.3)' }}>
                <div className="flex items-center space-x-3 mb-6">
                  <BarChart3 className="w-8 h-8 text-cyan-300" />
                  <h3 className="text-2xl font-bold text-cyan-300">Accuracy Improvement</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-cyan-300/20">
                    <span className="text-gray-300">Prediction accuracy:</span>
                    <span className="text-cyan-300 font-bold">73% vs. 31% industry average</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-cyan-300/20">
                    <span className="text-gray-300">Opportunity identification:</span>
                    <span className="text-cyan-300 font-bold">23% more profitable deals</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-cyan-300/20">
                    <span className="text-gray-300">Risk assessment:</span>
                    <span className="text-cyan-300 font-bold">31% volatility reduction</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-300">Investment returns:</span>
                    <span className="text-cyan-300 font-bold">2-4% additional performance</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl" 
                 style={{ background: 'rgba(229, 71, 255, 0.1)', border: '1px solid rgba(229, 71, 255, 0.3)' }}>
              <h3 className="text-2xl font-bold text-pink-300 mb-6">Competitive Advantage</h3>
              <div className="space-y-6">
                {[
                  {
                    title: "First-mover advantage on opportunities",
                    description: "Systematic monitoring identifies deals before they hit the broader market"
                  },
                  {
                    title: "Systematic evaluation eliminating emotional bias",
                    description: "Consistent criteria application across all opportunities removes human inconsistency"
                  },
                  {
                    title: "Scalable analysis capacity without adding staff",
                    description: "Process 10x more deals without proportional team expansion"
                  },
                  {
                    title: "Institutional-quality underwriting attracting sophisticated capital",
                    description: "Professional-grade analysis infrastructure signals operational maturity to investors"
                  }
                ].map((advantage, advIndex) => (
                  <div key={advIndex} className="pb-4 border-b border-pink-300/20 last:border-b-0">
                    <h4 className="text-lg font-semibold text-pink-200 mb-2">{advantage.title}</h4>
                    <p className="text-gray-300 text-sm">{advantage.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Case Study: Midwest Industrial Operator</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl" 
                 style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <h3 className="text-xl font-bold text-red-300 mb-4">Challenge</h3>
              <p className="text-gray-300 leading-relaxed">
                Regional operator stuck analyzing 40 deals annually. Missing opportunities due to slow analysis. 
                Inconsistent evaluation quality across team members.
              </p>
            </div>

            <div className="p-8 rounded-2xl" 
                 style={{ background: 'rgba(44, 251, 255, 0.1)', border: '1px solid rgba(44, 251, 255, 0.3)' }}>
              <h3 className="text-xl font-bold text-cyan-300 mb-4">Solution</h3>
              <p className="text-gray-300 leading-relaxed">
                Deployed AI underwriting pipeline with market intelligence integration and automated analysis workflows.
              </p>
            </div>

            <div className="p-8 rounded-2xl" 
                 style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
              <h3 className="text-xl font-bold text-green-300 mb-4">Results in 8 Months</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-300">Deal analysis capacity:</span>
                  <span className="text-green-300 font-bold">40 to 380 properties</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Analysis time:</span>
                  <span className="text-green-300 font-bold">45h to 3.5h per property</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Opportunity identification:</span>
                  <span className="text-green-300 font-bold">34% increase</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Portfolio performance:</span>
                  <span className="text-green-300 font-bold">2.8% improvement</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Team productivity:</span>
                  <span className="text-green-300 font-bold">85% reduction in manual time</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Free Download Section */}
      <div 
        className="py-20" 
        style={{ background: 'linear-gradient(135deg, rgba(44, 251, 255, 0.1) 0%, rgba(58, 139, 255, 0.1) 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            FREE DOWNLOAD: "The Complete AI Underwriting Framework"
          </h2>
          <p className="text-xl text-gray-300 mb-8">What You Get:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              "73-Point Analysis Checklist → The exact criteria our AI uses to evaluate every deal",
              "Risk Scoring Matrix → How to systematically assess and rank investment risks", 
              "Market Intelligence Sources → 47 data sources most operators never know exist",
              "Implementation Timeline → 90-day roadmap for systematizing your underwriting",
              "ROI Calculator → Calculate exact savings from systematic vs. manual analysis"
            ].map((item, index) => (
              <div key={index} className="p-6 rounded-xl text-left" style={{ 
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(44, 251, 255, 0.2)'
              }}>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-cyan-300 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">{item}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <p className="text-lg text-gray-300 mb-2">
              <span className="line-through">Normally $4,975.</span> <span className="text-cyan-300 font-bold text-xl">Yours free.</span>
            </p>
            <p className="text-sm text-gray-400 italic">
              Why we give this away: We're betting you'll see the systematic advantage and want us to build the infrastructure that executes it. 
              The framework shows you what's possible. Implementation makes it real.
            </p>
          </div>

          <button
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg mb-8"
            style={{ background: 'linear-gradient(45deg, #2CFBFF 0%, #3A8BFF 100%)' }}
            onClick={() => setLeadMagnetModalOpen(true)}
          >
            Download The Framework
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Process Deals at AI Speed?
          </h2>
          <p className="text-lg text-gray-300 mb-6">
            Book your Infrastructure Assessment. We'll analyze your current underwriting process and show you exactly 
            how systematic analysis transforms your deal capacity and accuracy.
          </p>
          <p className="text-gray-400 mb-8 font-medium">No cost. No commitment. Just systematic truth about what's possible.</p>

          <button
            onClick={() => setStrategyModalOpen(true)}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: 'linear-gradient(45deg, #2CFBFF 0%, #E547FF 100%)' }}
          >
            Book Assessment
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={leadMagnetModalOpen} onClose={() => setLeadMagnetModalOpen(false)}>
        <LeadMagnetForm onClose={() => setLeadMagnetModalOpen(false)} />
      </Modal>

      <Modal isOpen={strategyModalOpen} onClose={() => setStrategyModalOpen(false)}>
        <StrategySessionForm onClose={() => setStrategyModalOpen(false)} />
      </Modal>
    </div>
  );
};

// Liquidity Systems Page
// Liquidity Systems Page
const LiquiditySystemsPage = () => {
  const [leadMagnetModalOpen, setLeadMagnetModalOpen] = useState(false);
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0A092A 0%, #1a1850 100%)' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-32 right-16 w-96 h-96 rounded-full opacity-10 animate-pulse" 
            style={{ background: 'radial-gradient(circle, #E547FF 0%, transparent 70%)' }}
          ></div>
          <div 
            className="absolute bottom-32 left-16 w-64 h-64 rounded-full opacity-20 animate-ping" 
            style={{ background: 'radial-gradient(circle, #6A4CFF 0%, transparent 70%)' }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-20">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-pink-300 to-purple-400 bg-clip-text text-transparent">
                Liquidity Systems
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Break the 3-10 year lock-up prison. Turn illiquid real estate into liquid opportunity streams.
            </p>
          </div>
        </div>
      </div>

      {/* The Prison Most Operators Accept Section */}
      <div className="py-20" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Prison Most Operators Accept</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="p-8 rounded-2xl animate-slide-in-left" 
                 style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <h3 className="text-2xl font-bold text-red-300 mb-6">The Standard Model</h3>
              <div className="space-y-3">
                <p className="text-gray-300">• 7-10 year lock-ups with no exit options</p>
                <p className="text-gray-300">• Capital trapped while new opportunities arise</p>
                <p className="text-gray-300">• Investors demanding liquidity you can't provide</p>
                <p className="text-gray-300">• Refinancing cycles controlling your timeline</p>
                <p className="text-gray-300">• Value creation invisible until final exit</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl animate-slide-in-right" 
                 style={{ background: 'rgba(229, 71, 255, 0.1)', border: '1px solid rgba(229, 71, 255, 0.3)' }}>
              <h3 className="text-2xl font-bold text-pink-300 mb-6">What This Actually Costs</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-pink-200 mb-2">Opportunity Cost</h4>
                  <p className="text-gray-300">Missing better deals because capital is locked</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-pink-200 mb-2">Investor Relations</h4>
                  <p className="text-gray-300">Losing sophisticated capital that demands liquidity options</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-pink-200 mb-2">Portfolio Optimization</h4>
                  <p className="text-gray-300">Can't rebalance when market conditions change</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-pink-200 mb-2">Growth Limitations</h4>
                  <p className="text-gray-300">New acquisitions waiting for old assets to mature</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-pink-200 mb-2">Valuation Discount</h4>
                  <p className="text-gray-300">Illiquid assets trade at 20-30% discount to liquid alternatives</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center animate-fade-in">
            <div className="p-8 rounded-2xl max-w-4xl mx-auto" 
                 style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <p className="text-xl font-bold text-white">
                The Brutal Reality: Your competition with liquidity systems is accessing capital while you're stuck explaining why investors must wait 7 years to see their money.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What We Build Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What We Build</h2>
            <h3 className="text-2xl font-bold text-pink-300 mb-8">The Systematic Liberation Architecture</h3>
          </div>

          <div className="space-y-12">
            {[
              {
                title: "1. Tokenization Infrastructure",
                points: [
                  "Smart contract development for asset fractionalization",
                  "Regulatory compliance frameworks (SEC, state securities laws)",
                  "Blockchain integration for transparent ownership records",
                  "Secondary market creation for token trading"
                ]
              },
              {
                title: "2. SMA (Separately Managed Account) Rails",
                points: [
                  "Individual account structures maintaining direct ownership",
                  "Automated rebalancing and portfolio optimization",
                  "Tax-efficient exit mechanisms through systematic management",
                  "Liquidity provision without forced asset sales"
                ]
              },
              {
                title: "3. Alternative Capital Structures",
                points: [
                  "Flexible hold periods aligned with investor preferences",
                  "Rolling fund structures enabling continuous liquidity",
                  "Preferred equity arrangements with systematic exit triggers",
                  "Sale-leaseback and partial monetization strategies"
                ]
              },
              {
                title: "4. Market-Making Infrastructure",
                points: [
                  "Automated buyer-seller matching for secondary transactions",
                  "Pricing algorithms based on real-time asset performance",
                  "Liquidity pools enabling immediate exit opportunities",
                  "Professional market-making partnerships"
                ]
              }
            ].map((system, index) => (
              <div key={index} className="p-8 rounded-2xl animate-slide-up" 
                   style={{ 
                     background: 'rgba(255, 255, 255, 0.05)', 
                     border: '1px solid rgba(255, 255, 255, 0.1)',
                     animationDelay: `${index * 0.2}s`
                   }}>
                <h3 className="text-2xl font-bold text-pink-300 mb-6">{system.title}</h3>
                <div className="space-y-3">
                  {system.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start space-x-3">
                      <div className="text-pink-300 text-lg mt-1">•</div>
                      <p className="text-gray-300">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Results Section */}
      <div className="py-20" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Results</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <div className="space-y-8">
              <div className="p-8 rounded-2xl animate-slide-in-left" 
                   style={{ background: 'rgba(229, 71, 255, 0.1)', border: '1px solid rgba(229, 71, 255, 0.3)' }}>
                <h3 className="text-2xl font-bold text-pink-300 mb-6">Liquidity Transformation</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">• Exit optionality: Quarterly vs. 7-year lock-ups</p>
                  <p className="text-gray-300">• Investor satisfaction: 89% retention vs. 52% industry average</p>
                  <p className="text-gray-300">• Capital deployment: 40% faster due to flexible structures</p>
                  <p className="text-gray-300">• Portfolio optimization: Real-time rebalancing vs. periodic restructuring</p>
                </div>
              </div>

              <div className="p-8 rounded-2xl animate-slide-in-left" 
                   style={{ background: 'rgba(106, 76, 255, 0.1)', border: '1px solid rgba(106, 76, 255, 0.3)' }}>
                <h3 className="text-2xl font-bold text-purple-300 mb-6">Capital Access Enhancement</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">• Investor base expansion: 300% increase in qualified prospects</p>
                  <p className="text-gray-300">• Commitment size increase: 45% larger average investments</p>
                  <p className="text-gray-300">• Institutional access: Qualification for pension fund and insurance company capital</p>
                  <p className="text-gray-300">• Repeat investment rate: 78% vs. 34% for traditional lock-up structures</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl animate-slide-in-right" 
                 style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
              <h3 className="text-2xl font-bold text-green-300 mb-6">Performance Improvement</h3>
              <div className="space-y-3">
                <p className="text-gray-300">• Portfolio returns: 12% liquidity premium through systematic optimization</p>
                <p className="text-gray-300">• Risk management: 31% volatility reduction through flexible positioning</p>
                <p className="text-gray-300">• Tax efficiency: 23% improvement through systematic exit planning</p>
                <p className="text-gray-300">• Market timing: Ability to capture opportunities regardless of asset maturity</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Case Study: Southeast Family Office</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="p-8 rounded-2xl animate-slide-up" 
                 style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <h3 className="text-xl font-bold text-red-300 mb-4">Challenge</h3>
              <p className="text-gray-300">
                $150M family office wanting real estate exposure but demanding liquidity for other opportunities. Traditional 7-year lock-ups unacceptable for multi-generational planning.
              </p>
            </div>

            <div className="p-8 rounded-2xl animate-slide-up" 
                 style={{ background: 'rgba(229, 71, 255, 0.1)', border: '1px solid rgba(229, 71, 255, 0.3)' }}>
              <h3 className="text-xl font-bold text-pink-300 mb-4">Solution</h3>
              <p className="text-gray-300">
                Implemented tokenization structure with quarterly liquidity windows and automated market-making for secondary transactions.
              </p>
            </div>

            <div className="p-8 rounded-2xl animate-slide-up" 
                 style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
              <h3 className="text-xl font-bold text-green-300 mb-4">Results in 18 Months</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">• Liquidity events: Generated 28% partial exit ahead of planned timeline</p>
                <p className="text-gray-300">• Reinvestment velocity: Redeployed proceeds into 3 additional opportunities</p>
                <p className="text-gray-300">• Performance improvement: 15% better returns through systematic optimization</p>
                <p className="text-gray-300">• Family satisfaction: Enhanced confidence enabling 85% increase in real estate allocation</p>
                <p className="text-gray-300">• Market access: Created template attracting 12 additional family office relationships</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Free Download Section */}
      <div 
        className="py-20" 
        style={{ background: 'linear-gradient(135deg, rgba(229, 71, 255, 0.1) 0%, rgba(106, 76, 255, 0.1) 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            FREE DOWNLOAD: "The Liquidity Liberation Playbook"
          </h2>
          <p className="text-lg text-gray-300 mb-8">What You Get:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              "Tokenization Legal Framework → Step-by-step regulatory compliance roadmap",
              "SMA Structure Templates → Ready-to-use legal documents for flexible ownership", 
              "Secondary Market Design → How to create trading infrastructure for your assets",
              "Tax Optimization Strategies → Systematic approaches minimizing liquidity friction",
              "Investor Communication Scripts → How to explain liquidity advantages to prospects"
            ].map((item, index) => (
              <div key={index} className="p-4 rounded-lg text-left animate-slide-up" style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                animationDelay: `${index * 0.1}s`
              }}>
                <p className="text-gray-300">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-lg text-gray-300 mb-6">
            <span className="line-through">Normally $6,978.</span> <span className="text-pink-300 font-bold">Yours free.</span>
          </p>

          <button
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg mb-6"
            style={{ background: 'linear-gradient(45deg, #E547FF 0%, #6A4CFF 100%)' }}
            onClick={() => setLeadMagnetModalOpen(true)}
          >
            Download The Playbook
            <ArrowRight className="ml-2" size={20} />
          </button>

          <p className="text-sm text-gray-400">
            Why this matters: 73% of institutional investors now require liquidity options for real estate investments. 
            This playbook positions you ahead of that demand.
          </p>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-slide-up">
            Ready to Break Free from Lock-Up Prison?
          </h2>
          <p className="text-lg text-gray-300 mb-8 animate-fade-in">
            Book your Liquidity Architecture Session. We'll analyze your current capital structure and design systematic 
            liquidity solutions that attract institutional capital while preserving operational control.
          </p>
          <p className="text-gray-400 mb-8">15-minute commitment. Lifetime competitive advantage.</p>

          <button
            onClick={() => setStrategyModalOpen(true)}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: 'linear-gradient(45deg, #E547FF 0%, #2CFBFF 100%)' }}
          >
            Book Session
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={leadMagnetModalOpen} onClose={() => setLeadMagnetModalOpen(false)}>
        <LeadMagnetForm 
          title="Liquidity Liberation Playbook"
          description="Get instant access to our complete systematic liquidity blueprint that transforms illiquid capital into flexible opportunity streams."
          downloadUrl="/systems-free"
          source="Liquidity Liberation Playbook Download"
          onClose={() => setLeadMagnetModalOpen(false)}
        />
      </Modal>

      <Modal isOpen={strategyModalOpen} onClose={() => setStrategyModalOpen(false)}>
        <StrategySessionForm onClose={() => setStrategyModalOpen(false)} />
      </Modal>
    </div>
  );
};

// Information Velocity Page
const InformationVelocityPage = () => {
  const [leadMagnetModalOpen, setLeadMagnetModalOpen] = useState(false);
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0A092A 0%, #1a1850 100%)' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-32 left-16 w-96 h-96 rounded-full opacity-10 animate-pulse" 
            style={{ background: 'radial-gradient(circle, #6A4CFF 0%, transparent 70%)' }}
          ></div>
          <div 
            className="absolute bottom-32 right-16 w-64 h-64 rounded-full opacity-20 animate-ping" 
            style={{ background: 'radial-gradient(circle, #3A8BFF 0%, transparent 70%)' }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-20">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-300 to-indigo-400 bg-clip-text text-transparent">
                Information Velocity
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              From quarterly reports to real-time intelligence. Your LPs know performance before you finish your morning coffee.
            </p>
          </div>
        </div>
      </div>

      {/* The Quarterly Lag That's Killing You Section */}
      <div className="py-20" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Quarterly Lag That's Killing You</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <div className="p-8 rounded-2xl animate-slide-in-left" 
                 style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <h3 className="text-2xl font-bold text-red-300 mb-6">Your Current Speed</h3>
              <div className="space-y-3">
                <p className="text-gray-300">• Performance reports: 90 days after quarter-end</p>
                <p className="text-gray-300">• Problem identification: When it's too late to fix</p>
                <p className="text-gray-300">• Investor updates: Stale data nobody trusts</p>
                <p className="text-gray-300">• Decision making: Based on 6-month-old information</p>
                <p className="text-gray-300">• Competitive intelligence: What everyone already knows</p>
              </div>
            </div>

            <div className="p-8 rounded-2xl animate-slide-in-right" 
                 style={{ background: 'rgba(106, 76, 255, 0.1)', border: '1px solid rgba(106, 76, 255, 0.3)' }}>
              <h3 className="text-2xl font-bold text-purple-300 mb-6">The Real Cost of Slow Information</h3>
              <div className="space-y-3">
                <p className="text-gray-300">• <strong>Operational Inefficiency:</strong> Team time consumed by manual reporting vs. strategic activities</p>
              </div>
            </div>
          </div>

          <div className="text-center animate-fade-in">
            <p className="text-xl font-bold text-white max-w-4xl mx-auto">
              Market Reality: Institutional investors now expect real-time portfolio visibility. Quarterly PDFs are startup-level infrastructure masquerading as professional management.
            </p>
          </div>
        </div>
      </div>

      {/* What We Build Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What We Build</h2>
            <h3 className="text-2xl font-bold text-purple-300 mb-8">The Real-Time Intelligence Architecture:</h3>
          </div>

          <div className="space-y-12">
            {[
              {
                title: "1. Live Data Integration",
                points: [
                  "API connections with property management systems",
                  "Banking integration for real-time cash flow monitoring",
                  "Market data feeds providing instant comparable analysis",
                  "Automated transaction processing and categorization"
                ]
              },
              {
                title: "2. Performance Dashboards",
                points: [
                  "Real-time P&L updates across entire portfolio",
                  "Property-level metrics with occupancy and maintenance tracking",
                  "Cash flow projections with scenario analysis",
                  "Risk indicators with early warning systems"
                ]
              },
              {
                title: "3. Investor Portals",
                points: [
                  "24/7 access to portfolio performance and property details",
                  "Interactive dashboards with drill-down capability",
                  "Automated monthly reporting with personalized insights",
                  "Direct communication channels with notification systems"
                ]
              },
              {
                title: "4. Predictive Analytics",
                points: [
                  "Market condition monitoring with trend identification",
                  "Performance forecasting based on leading indicators",
                  "Risk assessment with systematic mitigation recommendations",
                  "Opportunity identification through systematic market scanning"
                ]
              }
            ].map((system, index) => (
              <div key={index} className="p-8 rounded-2xl animate-slide-up" 
                   style={{ 
                     background: 'rgba(255, 255, 255, 0.05)', 
                     border: '1px solid rgba(255, 255, 255, 0.1)',
                     animationDelay: `${index * 0.2}s`
                   }}>
                <h3 className="text-2xl font-bold text-purple-300 mb-6">{system.title}</h3>
                <div className="space-y-3">
                  {system.points.map((point, pointIndex) => (
                    <div key={pointIndex} className="flex items-start space-x-3">
                      <div className="text-purple-300 text-lg mt-1">•</div>
                      <p className="text-gray-300">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Results Section */}
      <div className="py-20" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Results</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="p-8 rounded-2xl animate-slide-in-left" 
                   style={{ background: 'rgba(106, 76, 255, 0.1)', border: '1px solid rgba(106, 76, 255, 0.3)' }}>
                <h3 className="text-2xl font-bold text-purple-300 mb-6">Speed Transformation</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">• Reporting time: Real-time vs. 90-day lag</p>
                  <p className="text-gray-300">• Problem identification: Immediate vs. quarterly discovery</p>
                  <p className="text-gray-300">• Decision speed: Hours vs. weeks for comprehensive analysis</p>
                  <p className="text-gray-300">• Investor communication: Continuous vs. periodic updates</p>
                </div>
              </div>

              <div className="p-8 rounded-2xl animate-slide-in-left" 
                   style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                <h3 className="text-2xl font-bold text-green-300 mb-6">Operational Excellence</h3>
                <div className="space-y-3">
                  <p className="text-gray-300">• Administrative time: 85% reduction in manual reporting</p>
                  <p className="text-gray-300">• Data accuracy: 99.7% vs. 73% for manual compilation</p>
                  <p className="text-gray-300">• Team productivity: Strategic focus vs. administrative burden</p>
                  <p className="text-gray-300">• Scalability: Manage 10x portfolio without proportional staff increase</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl animate-slide-in-right" 
                 style={{ background: 'rgba(58, 139, 255, 0.1)', border: '1px solid rgba(58, 139, 255, 0.3)' }}>
              <h3 className="text-2xl font-bold text-blue-300 mb-6">Investor Relations Enhancement</h3>
              <div className="space-y-3">
                <p className="text-gray-300">• Satisfaction scores: 94% vs. 67% industry average</p>
                <p className="text-gray-300">• Capital retention: 91% vs. 78% for quarterly reporting operators</p>
                <p className="text-gray-300">• Referral generation: 340% increase from satisfied investors</p>
                <p className="text-gray-300">• Commitment growth: 67% larger average investments from existing relationships</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Case Study Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Case Study: Texas Mixed-Use Portfolio</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl animate-slide-up" 
                 style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <h3 className="text-xl font-bold text-red-300 mb-4">Challenge</h3>
              <p className="text-gray-300">
                $85M portfolio operator losing investor confidence due to quarterly reporting delays. LPs questioning management competence. Team spending 60% of time on manual report generation.
              </p>
            </div>

            <div className="p-8 rounded-2xl animate-slide-up" 
                 style={{ background: 'rgba(106, 76, 255, 0.1)', border: '1px solid rgba(106, 76, 255, 0.3)' }}>
              <h3 className="text-xl font-bold text-purple-300 mb-4">Solution</h3>
              <p className="text-gray-300">
                Implemented real-time dashboard system with automated reporting and predictive analytics integration.
              </p>
            </div>

            <div className="p-8 rounded-2xl animate-slide-up" 
                 style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
              <h3 className="text-xl font-bold text-green-300 mb-4">Results in 6 Months</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">• Reporting time: 3 weeks to 15 minutes for comprehensive updates</p>
                <p className="text-gray-300">• Investor satisfaction: 23-point increase in quarterly surveys</p>
                <p className="text-gray-300">• Problem resolution: 67% faster issue identification and correction</p>
                <p className="text-gray-300">• Team productivity: 60% time reallocation from reporting to strategic activities</p>
                <p className="text-gray-300">• Capital growth: $31M additional commitments from existing investors impressed by transparency</p>
                <p className="text-gray-300">• Market positioning: Competitive advantage in institutional investor presentations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Free Download Section */}
      <div 
        className="py-20" 
        style={{ background: 'linear-gradient(135deg, rgba(106, 76, 255, 0.1) 0%, rgba(58, 139, 255, 0.1) 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-slide-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            FREE DOWNLOAD: "The Real-Time Advantage Blueprint"
          </h2>
          <p className="text-lg text-gray-300 mb-8">What You Get:</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {[
              "Dashboard Design Templates → 12 essential KPI dashboards for CRE portfolios",
              "Integration Roadmap → Step-by-step guide connecting your existing systems", 
              "Investor Communication Framework → Scripts and templates for real-time engagement",
              "Automation Checklist → 37 manual processes you can systematize immediately",
              "ROI Calculator → Quantify the competitive advantage of real-time intelligence"
            ].map((item, index) => (
              <div key={index} className="p-4 rounded-lg text-left animate-slide-up" style={{ 
                background: 'rgba(255, 255, 255, 0.05)',
                animationDelay: `${index * 0.1}s`
              }}>
                <p className="text-gray-300">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-lg text-gray-300 mb-6">
            <span className="line-through">Normally $3,974.</span> <span className="text-purple-300 font-bold">Yours free.</span>
          </p>

          <button
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg mb-6"
            style={{ background: 'linear-gradient(45deg, #6A4CFF 0%, #3A8BFF 100%)' }}
            onClick={() => setLeadMagnetModalOpen(true)}
          >
            Download The Blueprint
            <ArrowRight className="ml-2" size={20} />
          </button>

          <p className="text-sm text-gray-400">
            The intelligence advantage: Operators with real-time dashboards close deals 43% faster and retain investors 67% longer. 
            This blueprint shows you how.
          </p>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-slide-up">
            Ready to Achieve Information Velocity?
          </h2>
          <p className="text-lg text-gray-300 mb-8 animate-fade-in">
            Book your Intelligence Assessment. We'll audit your current reporting infrastructure and design real-time systems 
            that position you ahead of operators still compiling quarterly spreadsheets.
          </p>
          <p className="text-gray-400 mb-8">30-minute investment. Systematic competitive advantage.</p>

          <button
            onClick={() => setStrategyModalOpen(true)}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: 'linear-gradient(45deg, #6A4CFF 0%, #2CFBFF 100%)' }}
          >
            Book Assessment
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={leadMagnetModalOpen} onClose={() => setLeadMagnetModalOpen(false)}>
        <LeadMagnetForm 
          title="Real-Time Advantage Blueprint"
          description="Get instant access to our complete systematic intelligence blueprint that transforms quarterly lag into real-time competitive advantage."
          downloadUrl="/systems-free"
          source="Real-Time Advantage Blueprint Download"
          onClose={() => setLeadMagnetModalOpen(false)}
        />
      </Modal>

      <Modal isOpen={strategyModalOpen} onClose={() => setStrategyModalOpen(false)}>
        <StrategySessionForm onClose={() => setStrategyModalOpen(false)} />
      </Modal>
    </div>
  );
}

// About Page
const AboutPage = () => {
  const [strategyModalOpen, setStrategyModalOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0A092A 0%, #1a1850 100%)' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-32 right-16 w-96 h-96 rounded-full opacity-10 animate-pulse" 
            style={{ background: 'radial-gradient(circle, #2CFBFF 0%, transparent 70%)' }}
          ></div>
          <div 
            className="absolute bottom-32 left-16 w-64 h-64 rounded-full opacity-20 animate-ping" 
            style={{ background: 'radial-gradient(circle, #E547FF 0%, transparent 70%)' }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-20">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-300 to-pink-400 bg-clip-text text-transparent">
                About Opulion
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              We see the world as systems within systems. Most operators see problems to solve. We see infrastructure to architect.
            </p>
          </div>
        </div>
      </div>

      {/* Our Philosophy Section */}
      <div className="py-20" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Philosophy</h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8 text-lg text-gray-300">
            <p className="animate-fade-in">
              The next decade will separate two types of CRE operators: those who build systematic infrastructure, and those who become footnotes.
            </p>
            
            <p className="animate-fade-in">
              We're not building for today's market conditions. We're building for the generational wealth transfer — $84 trillion moving from Boomers to Millennials over the next 20 years. The new money doesn't care about your track record or your golf game. They demand systematic transparency, technology integration, and liquidity options that traditional CRE structures simply can't provide.
            </p>
            
            <div className="p-8 rounded-2xl animate-slide-up" 
                 style={{ background: 'rgba(44, 251, 255, 0.1)', border: '1px solid rgba(44, 251, 255, 0.3)' }}>
              <p className="text-xl font-bold text-cyan-300 mb-4">Our core belief:</p>
              <p className="text-xl">Institutions don't win because they're smarter. They win because they're systemized.</p>
            </div>
            
            <p className="animate-fade-in">
              Most operators under $100M AUM hit the same ceiling. 92% of them will never break that ceiling not because they can't find deals or raise capital, but because they never escape manual dependence. One person becomes the entire operation. Spreadsheets replace systems. Quarterly reviews substitute for real-time intelligence. Capital gets trapped in illiquid structures.
            </p>
            
            <p className="animate-fade-in font-bold text-white text-xl">
              That's not operational complexity. That's systematic fragility.
            </p>
          </div>
        </div>
      </div>

      {/* Our Vision Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Vision</h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8 text-lg text-gray-300">
            <p className="animate-fade-in">
              We see a different path. The same systematic thinking that enables a 10-person tech team to outperform 100-person competitors applies directly to CRE. The right infrastructure eliminates human bottlenecks, processes opportunities at institutional scale, and creates exponential advantages that compound over time.
            </p>
            
            <div className="p-8 rounded-2xl animate-slide-up" 
                 style={{ background: 'rgba(229, 71, 255, 0.1)', border: '1px solid rgba(229, 71, 255, 0.3)' }}>
              <p className="text-xl font-bold text-pink-300 mb-4">Our vision:</p>
              <p className="text-xl">Build the infrastructure that will power the new institutions of the coming world economy. Not consultancy. Not a fund. Strategic infrastructure partnership for operators who understand that systematic advantage creates generational wealth.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="py-20" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Mission</h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8 text-lg text-gray-300">
            <p className="animate-fade-in">
              Transform serious CRE operators from manual-dependent to system-driven. Replace human bottlenecks with automated intelligence. Convert quarterly lag into real-time velocity. Break illiquid capital into flexible opportunity streams.
            </p>
            
            <div className="p-8 rounded-2xl animate-slide-up" 
                 style={{ background: 'rgba(106, 76, 255, 0.1)', border: '1px solid rgba(106, 76, 255, 0.3)' }}>
              <p className="text-xl font-bold text-purple-300 mb-4">The mission:</p>
              <p className="text-xl">Position serious operators ahead of the largest wealth transfer in history through systematic competitive advantages that compound over cycles.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Thesis Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Our Thesis</h2>
            <h3 className="text-2xl font-bold text-gray-300 mb-8">Three Converging Forces Creating Unprecedented Opportunity:</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                title: "1. Generational Wealth Transfer",
                description: "$84 trillion moving from traditional institutions to tech-native inheritors demanding transparency, liquidity, and systematic operations.",
                color: "cyan"
              },
              {
                title: "2. Technology Maturation",
                description: "AI, blockchain, and automation reaching practical deployment sophistication enabling enterprise-grade systematic advantages for mid-market operators.",
                color: "pink"
              },
              {
                title: "3. Market Dislocation",
                description: "Traditional financing constraints and economic uncertainty creating opportunities for operators with systematic capital access and deployment capability.",
                color: "purple"
              }
            ].map((force, index) => (
              <div key={index} className="p-8 rounded-2xl animate-slide-up" 
                   style={{ 
                     background: `rgba(${force.color === 'cyan' ? '44, 251, 255' : force.color === 'pink' ? '229, 71, 255' : '106, 76, 255'}, 0.1)`, 
                     border: `1px solid rgba(${force.color === 'cyan' ? '44, 251, 255' : force.color === 'pink' ? '229, 71, 255' : '106, 76, 255'}, 0.3)`,
                     animationDelay: `${index * 0.1}s`
                   }}>
                <h3 className={`text-xl font-bold mb-4 text-${force.color}-300`}>{force.title}</h3>
                <p className="text-gray-300">{force.description}</p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="p-8 rounded-2xl" 
                 style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
              <p className="text-xl font-bold text-green-300 mb-4">The Thesis:</p>
              <p className="text-xl text-gray-300">Operators who systematize now capture disproportionate market share as industry standards shift toward institutional infrastructure requirements.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why We're Different Section */}
      <div className="py-20" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Why We're Different</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "We're not consultants",
                description: "Consultants analyze your problems and give you reports. We build the actual systems that solve the problems."
              },
              {
                title: "We're not technology vendors", 
                description: "Tech vendors sell you software and hope you figure out implementation. We deploy complete infrastructure and ensure it works."
              },
              {
                title: "We're not fund managers",
                description: "Fund managers take control of your capital. We give you the infrastructure to deploy your own capital more effectively."
              },
              {
                title: "We're infrastructure partners",
                description: "We build the systematic capabilities that position you for the market transformation ahead."
              }
            ].map((diff, index) => (
              <div key={index} className="p-8 rounded-2xl animate-slide-up" 
                   style={{ 
                     background: 'rgba(255, 255, 255, 0.05)', 
                     border: '1px solid rgba(255, 255, 255, 0.1)',
                     animationDelay: `${index * 0.1}s`
                   }}>
                <h3 className="text-xl font-bold text-cyan-300 mb-4">{diff.title}</h3>
                <p className="text-gray-300">{diff.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* The Founder Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">The Founder</h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-8 text-lg text-gray-300">
            <p className="animate-fade-in text-xl font-bold text-white">
              I've spent the last decade obsessed with one thing: systems.
            </p>
            
            <p className="animate-fade-in">
              Started in tech, building ERP platforms, automations, and machine learning solutions that helped small companies punch way above their weight. Learned early that the right system makes a 10-person team outperform competitors with 100.
            </p>
            
            <p className="animate-fade-in font-bold text-cyan-300 text-xl">
              I see the world as systems within systems.
            </p>
            
            <p className="animate-fade-in">
              Finance came almost by accident. Wasn't going to out-trade Wall Street, so I built systems to exploit DeFi inefficiencies — spotting token price gaps across exchanges, tracking millions of debt positions in real-time. Learned finance by building in it.
            </p>
            
            <p className="animate-fade-in">
              That curiosity pulled me into real estate. Through my tech clients, started working directly with HNWIs and family offices. Together, we built investment systems that delivered:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                "Helped close $50M+ in real estate deals",
                "Raised $30M+ in capital through automation", 
                "Optimized portfolios to unlock ~12% more liquidity"
              ].map((achievement, index) => (
                <div key={index} className="p-6 rounded-xl animate-slide-up" 
                     style={{ 
                       background: 'rgba(44, 251, 255, 0.1)', 
                       border: '1px solid rgba(44, 251, 255, 0.3)',
                       animationDelay: `${index * 0.1}s`
                     }}>
                  <p className="text-cyan-300 font-semibold">• {achievement}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-6 animate-fade-in">
              <h3 className="text-2xl font-bold text-white">The journey:</h3>
              
              <div className="space-y-6">
                {[
                  {
                    title: "Systems Foundation (2014-2018)",
                    description: "At 13, taught myself to code obsessed with systems. By consulting time, wasn't writing scripts — architecting frameworks that automated entire back-office workflows. Every line of code was leverage. Build once, execute infinitely."
                  },
                  {
                    title: "Operational Laboratory (2018-2020)",
                    description: "Built and scaled a six-figure agency betting on operational leverage. While competitors added headcount, I built processes handling 10x client volume without extra staff. Clean exit at 3.2x multiple. Lesson learned: systems scale, people create overhead."
                  },
                  {
                    title: "Cross-Domain Mastery (2021-2024)",
                    description: "Crossed domains — crypto arbitrage, enterprise AI, family office advisory, CRE structuring. Built trading systems exploiting blockchain inefficiencies in milliseconds. Systematic decision infrastructure improved family office hit rates 61%. This is where it clicked: same system-thinking that scaled SMBs could revolutionize boutique funds."
                  }
                ].map((phase, index) => (
                  <div key={index} className="p-6 rounded-xl" 
                       style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                    <h4 className="text-xl font-bold text-pink-300 mb-3">{phase.title}</h4>
                    <p className="text-gray-300">{phase.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="animate-fade-in">
              After a decade of trial, failure, learning, and mastery, I started Opulion. Not as a consultancy. Not as a fund. But as a strategic infrastructure partner for serious operators.
            </p>
            
            <p className="animate-fade-in font-bold text-white text-xl">
              Focus is CRE. That's the bet. Vision is bigger: to build the infrastructure that will power the new institutions of the coming world economy.
            </p>
            
            <p className="animate-fade-in text-xl">
              We're heading into the largest wealth transfer in history. Real estate is the bet. Infrastructure is the edge.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div 
        className="py-20 mt-20" 
        style={{ background: 'linear-gradient(135deg, rgba(44, 251, 255, 0.1) 0%, rgba(229, 71, 255, 0.1) 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-slide-up">
            Ready to Build Systems That Scale?
          </h2>
          <p className="text-lg text-gray-300 mb-8 animate-fade-in">
            The transformation is happening whether you participate or not. The question is whether you lead it or follow it.
          </p>

          <button
            onClick={() => setStrategyModalOpen(true)}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold rounded-xl text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ background: 'linear-gradient(45deg, #2CFBFF 0%, #E547FF 100%)' }}
          >
            Request Your Infrastructure Blueprint
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </div>

      {/* Strategy Session Modal */}
      <Modal isOpen={strategyModalOpen} onClose={() => setStrategyModalOpen(false)}>
        <StrategySessionForm onClose={() => setStrategyModalOpen(false)} />
      </Modal>
    </div>
  );
}

// Newsletter Page
const NewsletterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      setSubmitMessage('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);

    const GOOGLE_SHEETS_URL ="https://script.google.com/macros/s/AKfycbya7WzvCMXRlbE1vmvb-Ke5AloIu_HOFYBDOCC7YAXbXBwZ7CRcL25tBVYy3XZwzZWQ/exec"

    setTimeout(async () => {
      try {
        await fetch(GOOGLE_SHEETS_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            company: formData.company,
            timestamp: new Date().toISOString(),
            source: 'Newsletter Signup'
          })
        });

        setIsSubmitted(true);
        setSubmitMessage('Success! Your first strategic intelligence briefing arrives next Tuesday.');

      } catch (error) {
        console.error('Error:', error);
        setSubmitMessage('Something went wrong. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0A092A 0%, #1a1850 100%)' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-32 left-16 w-96 h-96 rounded-full opacity-10 animate-pulse" 
            style={{ background: 'radial-gradient(circle, #3A8BFF 0%, transparent 70%)' }}
          ></div>
          <div 
            className="absolute bottom-32 right-16 w-64 h-64 rounded-full opacity-20 animate-ping" 
            style={{ background: 'radial-gradient(circle, #E547FF 0%, transparent 70%)' }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-20">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
                The Infrastructure Edge
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              Market intelligence for operators who build systems, not spreadsheets
            </p>
          </div>
        </div>
      </div>

      {/* What You Get Section */}
      <div className="py-20" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">What You Get</h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Every Tuesday, we send systematic analysis that most CRE operators will never see. Not market commentary. 
              Not deal listings. <span className="text-cyan-300 font-semibold">Strategic intelligence that positions serious 
              operators ahead of market shifts.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {[
              {
                title: "Market Cycle Intelligence",
                description: "Economic indicators most operators ignore but that predict CRE opportunities 6-12 months ahead. Interest rate environments, demographic shifts, and capital flows that create systematic advantages for prepared operators.",
                icon: <TrendingUp className="w-8 h-8 text-blue-300" />
              },
              {
                title: "Distressed Opportunity Mapping",
                description: "Early warning signals for market dislocations before they become obvious. Refinancing pressure points, portfolio stress indicators, and systematic acquisition opportunities emerging from market transformation.",
                icon: <Target className="w-8 h-8 text-red-300" />
              },
              {
                title: "Technology Integration Insights",
                description: "How systematic infrastructure creates competitive advantages while manual operations face obsolescence. Implementation strategies, performance improvements, and institutional positioning through technology leadership.",
                icon: <Zap className="w-8 h-8 text-purple-300" />
              },
              {
                title: "Capital Market Intelligence",
                description: "Where institutional money is moving, what operational standards they require, and how systematic infrastructure attracts sophisticated capital. Alternative financing trends and liquidity solutions most operators don't know exist.",
                icon: <BarChart3 className="w-8 h-8 text-green-300" />
              },
              {
                title: "Case Study Breakdowns",
                description: "Real transformations: operators who built systematic infrastructure and the measurable results. Performance improvements, scaling achievements, and competitive advantages through systematic operations.",
                icon: <CheckCircle className="w-8 h-8 text-cyan-300" />
              }
            ].map((item, index) => (
              <div key={index} className="p-8 rounded-2xl animate-slide-up" 
                   style={{ 
                     background: 'rgba(255, 255, 255, 0.05)', 
                     border: '1px solid rgba(255, 255, 255, 0.1)',
                     animationDelay: `${index * 0.1}s`
                   }}>
                <div className="flex items-center mb-4">
                  {item.icon}
                  <h3 className="text-xl font-bold text-white ml-3">{item.title}</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Intelligence Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Recent Intelligence</h2>
          </div>

          <div className="space-y-8">
            {[
              {
                title: "The $2.6 Trillion Credit Crunch: Why Manual Operators Face Systematic Obsolescence",
                description: "Analysis of how interest rate normalization eliminates operators without systematic risk management and alternative capital access.",
                gradient: "from-red-300 to-orange-400"
              },
              {
                title: "Real-Time vs. Quarterly: Performance Attribution Analysis",
                description: "Case study showing 34% return improvement through systematic portfolio optimization vs. periodic review cycles.",
                gradient: "from-cyan-300 to-blue-400"
              },
              {
                title: "Institutional Capital Requirements: Technology Infrastructure as Investment Prerequisite",
                description: "Intelligence on operational standards required for pension fund, insurance company, and sovereign wealth fund access.",
                gradient: "from-purple-300 to-indigo-400"
              },
              {
                title: "The Generational Wealth Transfer Playbook",
                description: "Strategic positioning for the $84 trillion moving from Boomers to tech-native inheritors demanding systematic transparency.",
                gradient: "from-pink-300 to-purple-400"
              }
            ].map((issue, index) => (
              <div key={index} className="p-8 rounded-2xl animate-slide-up" 
                   style={{ 
                     background: 'rgba(255, 255, 255, 0.05)', 
                     border: '1px solid rgba(255, 255, 255, 0.1)',
                     animationDelay: `${index * 0.1}s`
                   }}>
                <h3 className={`text-xl font-bold mb-3 bg-gradient-to-r ${issue.gradient} bg-clip-text text-transparent`}>
                  {issue.title}
                </h3>
                <p className="text-gray-300">{issue.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Who This Is For Section */}
      <div className="py-20" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Who This Is For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl animate-slide-in-left" 
                 style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
              <h3 className="text-2xl font-bold text-green-300 mb-6">Perfect For</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-300 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><strong>Current operators</strong> managing $10M-$100M AUM who recognize manual limitations and want systematic competitive advantages.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-300 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><strong>Family offices and HNWIs</strong> evaluating CRE opportunities and seeking operators with institutional-quality infrastructure.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-300 mt-1 flex-shrink-0" />
                  <p className="text-gray-300"><strong>Industry professionals</strong> who understand that technology integration determines market position during transformation cycles.</p>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-2xl animate-slide-in-right" 
                 style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
              <h3 className="text-2xl font-bold text-red-300 mb-6">Not For</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <X className="w-6 h-6 text-red-300 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Deal chasers looking for property listings.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <X className="w-6 h-6 text-red-300 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Relationship-dependent operators who think technology threatens personal connections.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <X className="w-6 h-6 text-red-300 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">Anyone satisfied with quarterly spreadsheet reviews.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Commitment Section */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 rounded-2xl animate-fade-in" 
               style={{ background: 'rgba(44, 251, 255, 0.1)', border: '1px solid rgba(44, 251, 255, 0.3)' }}>
            <h2 className="text-3xl font-bold text-white mb-8">The Commitment</h2>
            <div className="space-y-6 text-lg text-gray-300">
              <p><strong className="text-cyan-300">No fluff.</strong> No generic market updates you can get anywhere else. Strategic intelligence that positions you for market transformation while competitors remain trapped in traditional thinking.</p>
              <p className="text-xl font-bold text-white">If an issue doesn't provide systematic competitive advantages, we don't send it.</p>
              <p><strong>Weekly cadence. Tuesday delivery. Unsubscribe anytime.</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <div 
        className="py-20" 
        style={{ background: 'linear-gradient(135deg, rgba(58, 139, 255, 0.1) 0%, rgba(229, 71, 255, 0.1) 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 animate-slide-up">
            Join The Infrastructure Edge
          </h2>
          
          {isSubmitted ? (
            <div className="p-8 rounded-xl animate-fade-in" 
                 style={{ background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.4)' }}>
              <h3 className="text-2xl font-bold text-green-300 mb-4">Welcome to The Infrastructure Edge!</h3>
              <p className="text-gray-300">{submitMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name *"
                  required
                  className="w-full px-6 py-4 rounded-xl text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email *"
                  required
                  className="w-full px-6 py-4 rounded-xl text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                />
              </div>
              <div>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company Website *"
                  required
                  className="w-full px-6 py-4 rounded-xl text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                />
              </div>
              {submitMessage && !isSubmitted && (
                <p className="text-red-300 text-sm">{submitMessage}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 text-lg font-semibold rounded-xl text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(45deg, #3A8BFF 0%, #E547FF 100%)' }}
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe to The Infrastructure Edge'}
              </button>
            </form>
          )}

          <p className="text-gray-400 mt-8 text-sm max-w-2xl mx-auto font-medium">
            <span className="text-white">Market transformation rewards the prepared.</span> Position yourself ahead of operators 
            still building spreadsheets while the industry demands systems.
          </p>
        </div>
      </div>
    </div>
  );
};


const StrategySessionPage = ({ setCurrentPage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    portfolioSize: '',
    phone: '',
    primaryChallenge: '',
    additionalInfo: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.company) {
      setSubmitMessage('Please fill in all required fields.');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitMessage('');

    // Google Apps Script URL for form submission
    const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbya7WzvCMXRlbE1vmvb-Ke5AloIu_HOFYBDOCC7YAXbXBwZ7CRcL25tBVYy3XZwzZWQ/exec";
    
    try {
      const response = await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          portfolioSize: formData.portfolioSize,
          phone: formData.phone,
          primaryChallenge: formData.primaryChallenge,
          additionalInfo: formData.additionalInfo,
          timestamp: new Date().toISOString(),
          source: 'Strategy Session Page Request'
        })
      });

      // Since we're using no-cors, we can't read the response
      // but if we get here without error, it likely succeeded
      setIsSubmitted(true);
      setSubmitMessage('Success! Our founder will reach out to you personally within 24 hours to schedule your Infrastructure Blueprint session.');

    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitMessage('Something went wrong. Please try again or contact support directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #0A092A 0%, #1a1850 100%)' }}>
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="p-8 rounded-2xl" 
               style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
            <div className="text-6xl text-green-300 mb-6 animate-bounce">✓</div>
            <h2 className="text-3xl font-bold text-white mb-4">Session Request Submitted</h2>
            <p className="text-lg text-gray-300 mb-6">
              {submitMessage}
            </p>
            <p className="text-sm text-gray-400 mb-6">
              Check your email for confirmation and next steps.
            </p>
            <button
              onClick={() => setCurrentPage('home')}
              className="px-6 py-3 text-gray-900 font-semibold rounded-lg transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(45deg, #2CFBFF 0%, #E547FF 100%)' }}
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #0A092A 0%, #1a1850 100%)' }}>
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute top-32 left-16 w-96 h-96 rounded-full opacity-10 animate-pulse" 
            style={{ background: 'radial-gradient(circle, #2CFBFF 0%, transparent 70%)' }}
          ></div>
          <div 
            className="absolute bottom-32 right-16 w-64 h-64 rounded-full opacity-20 animate-ping" 
            style={{ background: 'radial-gradient(circle, #E547FF 0%, transparent 70%)' }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Get Your <span className="bg-gradient-to-r from-cyan-300 to-pink-400 bg-clip-text text-transparent">
                Infrastructure Blueprint
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-4xl mx-auto">
              90-minute strategic session where we architect your systematic transformation from founder-dependent to market-dominant operations
            </p>
          </div>
        </div>
      </div>

      {/* What Happens in Your Session */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What Happens in Your Session</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                phase: "Phase 1",
                title: "Operational X-Ray",
                duration: "25 minutes",
                description: "We systematically dissect your current operations to identify the exact bottlenecks limiting your scale. Not generic consulting questions — systematic analysis revealing where manual processes are costing you deals, capital, and competitive positioning.",
                color: "#2CFBFF"
              },
              {
                phase: "Phase 2",
                title: "Systematic Advantage Mapping",
                duration: "25 minutes", 
                description: "We show you precisely how systematic operators in your market are capturing deals and capital while manual competitors fall behind. Competitive gap analysis with specific examples of infrastructure advantages you're missing.",
                color: "#E547FF"
              },
              {
                phase: "Phase 3",
                title: "Custom Architecture Design",
                duration: "30 minutes",
                description: "Based on your specific situation, we architect your complete systematic transformation. Prioritized infrastructure deployment with timeline, impact projections, and ROI analysis. This is your actual implementation roadmap.",
                color: "#6A4CFF"
              },
              {
                phase: "Phase 4", 
                title: "Strategic Decision Framework",
                duration: "10 minutes",
                description: "If systematic infrastructure makes sense for your operation, we discuss partnership options. Zero pressure. Just strategic clarity on what systematic transformation requires and delivers.",
                color: "#3A8BFF"
              }
            ].map((phase, index) => (
              <div key={index} className="p-8 rounded-2xl transition-all duration-300 hover:scale-105" 
                   style={{ background: 'rgba(255, 255, 255, 0.05)', border: `1px solid ${phase.color}40` }}>
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-gray-900 mr-4"
                    style={{ backgroundColor: phase.color }}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{phase.title}</h3>
                    <p className="text-sm" style={{ color: phase.color }}>({phase.duration})</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What You Walk Away With */}
      <div className="py-20" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What You Walk Away With</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="p-8 rounded-2xl" 
                 style={{ background: 'rgba(44, 251, 255, 0.05)', border: '1px solid rgba(44, 251, 255, 0.2)' }}>
              <h3 className="text-2xl font-bold text-cyan-300 mb-6">Your Custom Infrastructure Blueprint</h3>
              <div className="space-y-4">
                {[
                  "Detailed analysis of current operational limitations and capacity constraints",
                  "Systematic solution architecture designed for your specific deal flow and capital requirements",
                  "Implementation timeline with priority sequencing and milestone definitions",
                  "ROI projections with specific performance improvements and competitive advantages",
                  "Strategic positioning analysis showing how infrastructure creates market dominance"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-cyan-300 text-lg mt-1">•</div>
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-2xl" 
                 style={{ background: 'rgba(229, 71, 255, 0.05)', border: '1px solid rgba(229, 71, 255, 0.2)' }}>
              <h3 className="text-2xl font-bold text-pink-300 mb-6">Competitive Intelligence Package</h3>
              <div className="space-y-4">
                {[
                  "Analysis of systematic operators in your market and their competitive advantages",
                  "Gap assessment showing where you're vulnerable to systematic competitors",
                  "Market evolution timeline with infrastructure requirements for institutional capital access",
                  "Strategic recommendations for competitive positioning during industry transformation"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="text-pink-300 text-lg mt-1">•</div>
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who This Is For */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Who This Is For</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-green-300 mb-6">Perfect For:</h3>
              <div className="space-y-4">
                {[
                  "Serious operators managing $10M-$100M AUM who recognize manual limitations and want systematic competitive advantages",
                  "Growth-focused teams ready to invest in infrastructure that scales beyond individual capability and geographic constraints",
                  "Strategic thinkers who understand that technology integration determines market position during transformation cycles"
                ].map((item, index) => (
                  <div key={index} className="p-4 rounded-lg" 
                       style={{ background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                    <div className="flex items-start space-x-3">
                      <div className="text-green-300 text-xl">✓</div>
                      <p className="text-gray-300">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-red-300 mb-6">Not For:</h3>
              <div className="space-y-4">
                {[
                  "Operators satisfied with current growth rates",
                  "Deal-chasers focused on individual transactions vs. systematic advantages",
                  "Anyone expecting quick fixes without infrastructure investment"
                ].map((item, index) => (
                  <div key={index} className="p-4 rounded-lg" 
                       style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)' }}>
                    <div className="flex items-start space-x-3">
                      <div className="text-red-300 text-xl">✗</div>
                      <p className="text-gray-300">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* The Investment */}
      <div className="py-20" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">The Investment</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="p-6 rounded-xl" style={{ background: 'rgba(44, 251, 255, 0.1)', border: '1px solid rgba(44, 251, 255, 0.3)' }}>
              <h3 className="text-lg font-bold text-cyan-300 mb-3">Your Time</h3>
              <p className="text-gray-300 text-sm">90 minutes of strategic focus on systematic transformation</p>
            </div>
            <div className="p-6 rounded-xl" style={{ background: 'rgba(229, 71, 255, 0.1)', border: '1px solid rgba(229, 71, 255, 0.3)' }}>
              <h3 className="text-lg font-bold text-pink-300 mb-3">Your Commitment</h3>
              <p className="text-gray-300 text-sm">Openness to contrarian approaches and systematic solutions</p>
            </div>
            <div className="p-6 rounded-xl" style={{ background: 'rgba(106, 76, 255, 0.1)', border: '1px solid rgba(106, 76, 255, 0.3)' }}>
              <h3 className="text-lg font-bold text-purple-300 mb-3">Our Guarantee</h3>
              <p className="text-gray-300 text-sm">You'll see exactly how systematic infrastructure creates competitive advantages, regardless of whether we work together</p>
            </div>
          </div>
        </div>
      </div>

      {/* Client Testimonials */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">What Clients Say About These Sessions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "In 90 minutes, Mostafa identified operational bottlenecks we'd been struggling with for two years and designed systematic solutions that immediately made sense. Even if we hadn't moved forward together, the strategic clarity was worth months of internal planning."
              </p>
              <div className="text-cyan-300 font-semibold">— Regional Industrial Operator, $45M AUM</div>
            </div>

            <div className="p-8 rounded-2xl" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <p className="text-gray-300 mb-6 leading-relaxed">
                "The competitive analysis opened our eyes to how far behind we were falling. Systematic operators were capturing deals and capital we didn't even know we were missing. The infrastructure blueprint gave us exactly what we needed to compete."
              </p>
              <div className="text-pink-300 font-semibold">— Family Office Principal, $120M AUM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Form */}
      <div 
        className="py-20" 
        style={{ background: 'linear-gradient(135deg, rgba(44, 251, 255, 0.1) 0%, rgba(229, 71, 255, 0.1) 100%)' }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Architect Your Systematic Transformation?
            </h2>
            <p className="text-lg text-gray-300 mb-2">Limited to 8 sessions monthly. Serious operators only.</p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white font-medium mb-2">Company Website *</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                  placeholder="yourcompany.com"
                />
              </div>
              <div>
                <label className="block text-white font-medium mb-2">Portfolio Size</label>
                <select
                  name="portfolioSize"
                  value={formData.portfolioSize}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                  style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                >
                  <option value="" style={{ background: '#1a1850', color: 'white' }}>Select Portfolio Size</option>
                  <option value="Under $5M AUM" style={{ background: '#1a1850', color: 'white' }}>Under $5M AUM</option>
                  <option value="$5M - $25M AUM" style={{ background: '#1a1850', color: 'white' }}>$5M - $25M AUM</option>
                  <option value="$25M - $100M AUM" style={{ background: '#1a1850', color: 'white' }}>$25M - $100M AUM</option>
                  <option value="$100M+ AUM" style={{ background: '#1a1850', color: 'white' }}>$100M+ AUM</option>
                  <option value="Family Office/HNWI" style={{ background: '#1a1850', color: 'white' }}>Family Office/HNWI</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="Your phone number"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Primary Challenge</label>
              <select
                name="primaryChallenge"
                value={formData.primaryChallenge}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-lg text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <option value="" style={{ background: '#1a1850', color: 'white' }}>Primary Challenge (Optional)</option>
                <option value="Manual processes limiting growth" style={{ background: '#1a1850', color: 'white' }}>Manual processes limiting growth</option>
                <option value="Need better investor reporting" style={{ background: '#1a1850', color: 'white' }}>Need better investor reporting</option>
                <option value="Portfolio performance optimization" style={{ background: '#1a1850', color: 'white' }}>Portfolio performance optimization</option>
                <option value="Scaling operations efficiently" style={{ background: '#1a1850', color: 'white' }}>Scaling operations efficiently</option>
                <option value="Technology integration strategy" style={{ background: '#1a1850', color: 'white' }}>Technology integration strategy</option>
                <option value="Capital raising preparation" style={{ background: '#1a1850', color: 'white' }}>Capital raising preparation</option>
              </select>
            </div>

            <div>
              <label className="block text-white font-medium mb-2">Additional Context</label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 rounded-lg text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-200 resize-vertical"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
                placeholder="Additional context about your goals or challenges (Optional)"
              />
            </div>

            {submitMessage && !isSubmitted && (
              <p className="text-red-300 text-sm">{submitMessage}</p>
            )}

            <div className="text-center">
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-12 py-4 text-xl font-semibold rounded-xl text-gray-900 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(45deg, #2CFBFF 0%, #E547FF 100%)' }}
              >
                {isSubmitting ? 'Submitting Request...' : 'Book Your Infrastructure Blueprint Session'}
              </button>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-400">
              <span className="font-semibold">The Systematic Reality:</span> While you're reading this, systematic operators are processing hundreds of deals, 
              raising capital in weeks instead of months, and building competitive moats that manual operations cannot cross.
            </p>
            <p className="text-gray-400 mt-4">
              The transformation is happening whether you participate or not. The question is whether you lead it or follow it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};





export default App;