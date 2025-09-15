import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ChevronDown, CheckCircle, XCircle, Users, TrendingUp, Clock, Download, Star, ArrowRight, Menu, X, Mail, Home } from 'lucide-react';
import companyLogo from './assets/logo.png'; 

// Mock logo component since we can't import external assets
const CompanyLogo = () => (
  <img src={companyLogo} alt="Company Logo" className="w-10 h-10" />
);

// Header component that works across routes
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A092B]/95 backdrop-blur-sm border-b border-[#4A63FF]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <CompanyLogo />
            <span className="text-xl font-bold bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] bg-clip-text text-transparent">
              Opulion
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-[#4A63FF] transition-colors">Home</Link>

            <Link to="/newsletter" className="hover:text-[#4A63FF] transition-colors">Newsletter</Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/#download" className="bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] hover:from-[#C33BFF] hover:to-[#4A63FF] px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
              Get Free Blueprint
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#0A092B] border-t border-[#4A63FF]/20">
          <nav className="px-4 py-4 space-y-4">
            <Link to="/#about" className="block hover:text-[#4A63FF] transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/#services" className="block hover:text-[#4A63FF] transition-colors" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link to="/#track-record" className="block hover:text-[#4A63FF] transition-colors" onClick={() => setIsMenuOpen(false)}>Track Record</Link>
            <Link to="/#testimonials" className="block hover:text-[#4A63FF] transition-colors" onClick={() => setIsMenuOpen(false)}>Testimonials</Link>
            <Link to="/newsletter" className="block hover:text-[#4A63FF] transition-colors" onClick={() => setIsMenuOpen(false)}>Newsletter</Link>
            <Link to="/#download" className="block bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] px-4 py-2 rounded-lg font-semibold text-center" onClick={() => setIsMenuOpen(false)}>
              Get Free Blueprint
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

// Footer component
const Footer = () => {
  const handleStrategyCallClick = () => {
    window.open('https://calendly.com/opulion/free_strategy_call', '_blank');
  };

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#4A63FF]/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-20 h-20 flex items-center justify-center">
                <CompanyLogo />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] bg-clip-text text-transparent">
                Opulion
              </span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Helping ambitious capital allocators break the $50M plateau and compete with institutional architecture—without institutional bureaucracy.
            </p>
            <div className="text-sm text-gray-400">
              <p>At $50M, more capital doesn't move the needle.</p>
              <p className="font-semibold text-[#4A63FF]">Architecture does.</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#4A63FF]">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-[#4A63FF] transition-colors">Home</Link></li>
              <li><Link to="/newsletter" className="hover:text-[#4A63FF] transition-colors">Newsletter</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-[#C33BFF]">Break Your Ceiling</h4>
            <div className="space-y-3">
              <button
                onClick={handleStrategyCallClick}
                className="block bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] hover:from-[#C33BFF] hover:to-[#4A63FF] px-6 py-2 rounded-lg font-semibold text-sm text-center transition-all duration-300"
              >
                Blueprint Call
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-[#4A63FF]/20 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Opulion. All rights reserved. |
            <span className="text-[#4A63FF] ml-1">Ready to Break the $75M Barrier?</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main Landing Page Component
const LandingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute('href');
      const targetId = href.replace('#', '');
      const elem = document.getElementById(targetId);
      elem?.scrollIntoView({
        behavior: 'smooth'
      });
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleScroll);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleScroll);
      });
    };
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      setSubmitMessage('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);

    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzUc0d7KFsqzlsk6AjeRjIKBllj-MMZ8G89ZNG3XN9eIZJgNXzVJbGhHlurDVu1PSSj/exec';

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
          source: 'Landing Page Newsletter Signup'
        })
      });

      setIsSubmitted(true);
      setSubmitMessage('Success!');

    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStrategyCallClick = () => {
    window.open('https://calendly.com/opulion/free_strategy_call', '_blank');
  };

  return (
    <div className="bg-[#0A092B] text-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                The $50M Real Estate Ceiling
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#61D9FB] to-[#C33BFF] bg-clip-text text-transparent">
              You Don't Run a Real Estate Firm.
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#C33BFF]">
              You *Are* the Real Estate Firm. And That's Why You're Stuck.
            </h2>
            
            {/* The Brutal Truth Section */}
            <div className="bg-gradient-to-r from-[#4A63FF]/20 to-[#C33BFF]/20 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-[#61D9FB]">The Brutal Truth You Already Know</h3>
              <p className="text-lg text-gray-200 mb-6">
                You've got $8M–$40M AUM. Enough to impress your local meetup. Not enough to sit at the real table.
              </p>
              <p className="text-lg text-gray-200 mb-6">
                You close a strip mall deal and LinkedIn claps. Family offices ask about your "technology stack" and you die a little inside. Brokers send you scraps while institutions get first look at everything.
              </p>
              <p className="text-lg text-gray-200 font-semibold">
                Your firm? It's you, an analyst, some QuickBooks entries, and spreadsheets held together with caffeine. 
                <span className="text-red-400"> If you disappeared tomorrow, it collapses in 60 days.</span>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#services" className="bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] hover:from-[#C33BFF] hover:to-[#4A63FF] px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#4A63FF]/25">
                Break Through the $50M Ceiling
              </a>
              <a href="#about" className="border-2 border-[#4A63FF] hover:bg-[#4A63FF]/20 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The $50M Ceiling Problem */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A092B] to-[#1A1B4B]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-red-400">The $50M Ceiling in Real Estate</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8">
              85% of real estate operators plateau between $5M–$50M. Not because they can't find deals. 
              Not because they can't raise equity. But because they never build 
              <span className="text-[#C33BFF] font-semibold"> institutional real estate systems.</span>
            </p>
          </div>
         
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-[#4A63FF]/10 to-[#C33BFF]/10 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-[#4A63FF] text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-4">Capital Stacks</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span className="text-gray-300">You run equity + debt</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span className="text-gray-300">Institutions stack 7 layers of capital</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#C33BFF]/10 to-[#61D9FB]/10 backdrop-blur-sm border border-[#C33BFF]/30 rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-[#C33BFF] text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-4">Deal Flow</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span className="text-gray-300">You chase marketed deals</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span className="text-gray-300">Institutions <strong>manufacture</strong> off-market pipelines</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#61D9FB]/10 to-[#4A63FF]/10 backdrop-blur-sm border border-[#61D9FB]/30 rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="text-[#61D9FB] text-4xl mb-4">🏗️</div>
              <h3 className="text-xl font-bold mb-4">Operations</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span className="text-gray-300">You manage units</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  <span className="text-gray-300">Institutions build <strong>platforms</strong> that scale past people</span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-red-400">The Reality</h3>
              <p className="text-lg text-gray-200">
                You're playing small-shop real estate. They're playing institutional real estate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Pain Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              The Pain You Already Feel
            </h2>
          </div>
         
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#4A63FF]/10 to-[#C33BFF]/10 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8">
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <div className="text-red-400 mr-3 mt-1 text-2xl">•</div>
                  <span>300 units, but treated like a hobbyist.</span>
                </li>
                <li className="flex items-start">
                  <div className="text-red-400 mr-3 mt-1 text-2xl">•</div>
                  <span>Outperforming $500M funds, but still losing LPs.</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#C33BFF]/10 to-[#61D9FB]/10 backdrop-blur-sm border border-[#C33BFF]/30 rounded-2xl p-8">
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start">
                  <div className="text-red-400 mr-3 mt-1 text-2xl">•</div>
                  <span>Net worth "on paper," but cash flow stress every month.</span>
                </li>
                <li className="flex items-start">
                  <div className="text-red-400 mr-3 mt-1 text-2xl">•</div>
                  <span>2 to 4 deals a month, while institutions close twelve.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Framework */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A092B] to-[#1A1B4B]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              The Breakthroughs That Shatter the Ceiling
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Breakthrough 1 */}
            <div className="bg-gradient-to-br from-[#4A63FF]/20 to-[#0A092B] border border-[#4A63FF]/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#4A63FF]/20 transition-all duration-300">
              <div className="text-[#4A63FF] text-4xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold mb-4 text-[#4A63FF]">From Operator to Platform</h3>
              <p className="text-gray-300 mb-4">
                Systematize acquisitions, asset management, and reporting so you stop being the bottleneck.
              </p>
            </div>

            {/* Breakthrough 2 */}
            <div className="bg-gradient-to-br from-[#C33BFF]/20 to-[#0A092B] border border-[#C33BFF]/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#C33BFF]/20 transition-all duration-300">
              <div className="text-[#C33BFF] text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-4 text-[#C33BFF]">Institutional Capital Stacks</h3>
              <p className="text-gray-300 mb-4">
                Go beyond debt + equity. Use mezzanine, preferred equity, seller finance, rescue capital.
              </p>
            </div>

            {/* Breakthrough 3 */}
            <div className="bg-gradient-to-br from-[#61D9FB]/20 to-[#0A092B] border border-[#61D9FB]/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#61D9FB]/20 transition-all duration-300">
              <div className="text-[#61D9FB] text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-[#61D9FB]">Deal Origination Systems</h3>
              <p className="text-gray-300 mb-4">
                Stop waiting for brokers. Build proprietary pipelines that deliver off-market deals at scale.
              </p>
            </div>

            {/* Breakthrough 4 */}
            <div className="bg-gradient-to-br from-[#D9D0FF]/20 to-[#0A092B] border border-[#D9D0FF]/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#D9D0FF]/20 transition-all duration-300">
              <div className="text-[#D9D0FF] text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4 text-[#D9D0FF]">Identity Evolution</h3>
              <p className="text-gray-300 mb-4">
                You're not just a syndicator or fund manager. You're an allocator. Institutions treat you differently when you operate differently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Proof From Real Estate Operators Like You
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-[#4A63FF]/10 to-[#C33BFF]/10 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "I ran $22M AUM for 6 years and felt perpetually small. Within 8 months, Opulion's blueprint unlocked $40M in new capacity."
              </p>
              <div className="text-[#4A63FF] font-semibold">— Fund Manager, now $62M AUM</div>
            </div>

            <div className="bg-gradient-to-br from-[#C33BFF]/10 to-[#61D9FB]/10 backdrop-blur-sm border border-[#C33BFF]/30 rounded-2xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "At $15M net worth, I was tired of being treated like retail. Now we're structuring $20M+ deals with family office credibility."
              </p>
              <div className="text-[#C33BFF] font-semibold">— HNWI, now $30M</div>
            </div>

            <div className="bg-gradient-to-br from-[#61D9FB]/10 to-[#4A63FF]/10 backdrop-blur-sm border border-[#61D9FB]/30 rounded-2xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "I thought 300 units was my ceiling. Opulion's origination system got us 12 off-market deals in 60 days. We're at 850+ units today."
              </p>
              <div className="text-[#61D9FB] font-semibold">— Syndicator</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A092B] to-[#1A1B4B]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              About Opulion
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              We help ambitious real estate operators break the $50M plateau and finally compete with institutional architecture—without institutional bureaucracy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#4A63FF]">Our Mission</h3>
              <p className="text-lg text-gray-300 mb-6">
                To transform ambitious real estate operators between $5M-$50M AUM into institutional-grade allocators who can compete with family offices and institutional capital.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-green-400">
                  <CheckCircle className="mr-3 flex-shrink-0" size={20} />
                  <span>Institutional systems without the bloat</span>
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="mr-3 flex-shrink-0" size={20} />
                  <span>Multi-layer capital stacks that unlock hidden funding</span>
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="mr-3 flex-shrink-0" size={20} />
                  <span>Deal origination systems that eliminate competition</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#4A63FF]/10 to-[#C33BFF]/10 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8">
              <h4 className="text-xl font-bold mb-4 text-[#C33BFF]">Track Record</h4>
              <div className="grid grid-cols-1 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#4A63FF] mb-2">$500M+</div>
                  <p className="text-sm text-gray-300">in institutional deals analyzed</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#C33BFF] mb-2">$50M+</div>
                  <p className="text-sm text-gray-300">in transactions engineered</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#61D9FB] mb-2">87%</div>
                  <p className="text-sm text-gray-300">of partners scaled past $50M within 9 months</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy Call Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The Institutional Blueprint Call
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            This isn't a discovery call. It's the same $10,000+ blueprint institutional consultants deliver—free to qualified operators.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#4A63FF]/10 to-[#0A092B] border border-[#4A63FF]/30 rounded-2xl p-6">
              <div className="text-[#4A63FF] text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2 text-[#4A63FF]">Diagnose your ceiling in real estate</h3>
            </div>
            <div className="bg-gradient-to-br from-[#C33BFF]/10 to-[#0A092B] border border-[#C33BFF]/30 rounded-2xl p-6">
              <div className="text-[#C33BFF] text-3xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2 text-[#C33BFF]">Expose the blind spots institutions exploit</h3>
            </div>
            <div className="bg-gradient-to-br from-[#61D9FB]/10 to-[#0A092B] border border-[#61D9FB]/30 rounded-2xl p-6">
              <div className="text-[#61D9FB] text-3xl mb-4">🗺️</div>
              <h3 className="text-lg font-semibold mb-2 text-[#61D9FB]">Build your custom roadmap past $75M AUM</h3>
            </div>
          </div>

          <div className="mb-8">
            <p className="text-lg text-yellow-400 font-semibold mb-2">⚠️ Only for real estate operators with $5M+ AUM and a proven track record.</p>
          </div>

          <button
            onClick={handleStrategyCallClick}
            className="inline-flex items-center bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] hover:from-[#C33BFF] hover:to-[#4A63FF] px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#4A63FF]/25"
          >
            Apply for Your Blueprint Call
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </section>

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          to="/newsletter"
          className="bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] hover:from-[#C33BFF] hover:to-[#4A63FF] px-6 py-3 rounded-full font-bold shadow-lg shadow-[#4A63FF]/25 transition-all duration-300 transform hover:scale-110 flex items-center"
        >
          Newsletter
          <ArrowRight className="ml-2" size={18} />
        </Link>
      </div>
    </div>
  );
};

// Newsletter Page Component
const NewsletterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.company) {
      setSubmitMessage('Please fill in all required fields.');
      return;
    }
    setIsSubmitting(true);

    const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbzUc0d7KFsqzlsk6AjeRjIKBllj-MMZ8G89ZNG3XN9eIZJgNXzVJbGhHlurDVu1PSSj/exec';

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
          source: 'Newsletter Page Signup'
        })
      });

      setIsSubmitted(true);
      setSubmitMessage('Success!');

    } catch (error) {
      console.error('Error:', error);
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-[#0A092B] text-white min-h-screen">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <a href="#" className="inline-flex items-center text-[#4A63FF] hover:text-[#C33BFF] transition-colors mb-6">
              <Home className="mr-2" size={20} />
              Back to Home
            </a>
          </div>
          
          <div className="bg-gradient-to-br from-[#4A63FF]/20 to-[#C33BFF]/20 backdrop-blur-sm border border-[#4A63FF]/30 rounded-3xl p-12">
            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
              The Only Real Estate Newsletter That Exposes the 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4A63FF] to-[#C33BFF]"> Institutional Playbook</span>
            </h1>

            {/* Opening Hook */}
            <div className="text-left mb-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-[#4A63FF]">You've Built Something Real.</h2>
              
              <p className="text-lg text-gray-300 mb-6">
                $5M–$50M AUM. Enough to impress your peers. Not enough to get respect in the rooms you want to be in.
              </p>

              <p className="text-lg text-gray-300 mb-6">
                Brokers feed you leftovers. Family offices ask about your "technology stack" and you scramble for answers. 
                Investors clap for your returns… but still wire to bigger funds.
              </p>

              <div className="text-center py-6">
                <p className="text-xl font-semibold text-gray-200 mb-2">You're not failing.</p>
                <p className="text-2xl font-bold text-red-400">You're plateaued.</p>
              </div>
            </div>

            {/* Why This Newsletter Exists */}
            <div className="text-left mb-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-[#4A63FF]">Why This Newsletter Exists</h2>
              
              <p className="text-lg text-gray-300 mb-6">
                92% of real estate operators never break $75M. Not because they lack deals, returns, or hustle. 
                But because they're missing what institutions take for granted: <span className="font-bold text-white">architecture.</span>
              </p>

              <p className="text-lg text-gray-300 mb-8">
                Every week, <span className="font-bold text-[#4A63FF]">The Opulion Brief</span> gives you:
              </p>

              <div className="space-y-6">
                <div className="bg-[#0A092B]/50 rounded-lg p-6 border border-[#4A63FF]/20">
                  <div className="flex items-start">
                    <span className="text-[#4A63FF] mr-4 text-2xl">📊</span>
                    <div>
                      <h3 className="text-lg font-bold text-[#4A63FF] mb-2">Capital Stack Secrets</h3>
                      <p className="text-gray-300">How institutions layer mezz, pref, seller finance, and rescue capital to scale faster.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A092B]/50 rounded-lg p-6 border border-[#C33BFF]/20">
                  <div className="flex items-start">
                    <span className="text-[#C33BFF] mr-4 text-2xl">🔍</span>
                    <div>
                      <h3 className="text-lg font-bold text-[#C33BFF] mb-2">Deal Origination Systems</h3>
                      <p className="text-gray-300">How they manufacture deal flow while everyone else fights over broker scraps.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A092B]/50 rounded-lg p-6 border border-[#61D9FB]/20">
                  <div className="flex items-start">
                    <span className="text-[#61D9FB] mr-4 text-2xl">⚡</span>
                    <div>
                      <h3 className="text-lg font-bold text-[#61D9FB] mb-2">Platform Shifts</h3>
                      <p className="text-gray-300">How to stop being the bottleneck and start running like an institutional platform.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A092B]/50 rounded-lg p-6 border border-yellow-400/20">
                  <div className="flex items-start">
                    <span className="text-yellow-400 mr-4 text-2xl">💬</span>
                    <div>
                      <h3 className="text-lg font-bold text-yellow-400 mb-2">Institutional Scripts</h3>
                      <p className="text-gray-300">The exact language LPs and family offices listen for—and how to deliver it with confidence.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Who This Is For */}
            <div className="text-left mb-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-[#4A63FF]">Who This Is For</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-300">Real estate operators managing $5M–$50M AUM.</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-300">Syndicators with 100–500 units who feel capped.</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-300">Fund managers who outperform $500M shops but still lose LPs.</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <span className="text-gray-300">High-net-worth investors tired of being treated like retail.</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#4A63FF]/20 to-[#C33BFF]/20 backdrop-blur-sm border border-[#4A63FF]/30 rounded-lg p-6 text-center">
                <p className="text-lg text-gray-300 mb-2">If you've ever thought:</p>
                <p className="text-xl font-bold text-white italic">"I'm doing everything right—so why do I still feel small?"</p>
                <p className="text-lg text-[#4A63FF] font-semibold mt-2">This newsletter was written for you.</p>
              </div>
            </div>

            {/* Subscribe Section */}
            <div className="border-t border-[#4A63FF]/30 pt-12">
              <h2 className="text-3xl font-bold mb-4 text-center">Subscribe Free</h2>
              <p className="text-lg text-gray-300 mb-8 text-center">
                No fluff. No spam. Just the institutional playbook, stripped bare.
              </p>

              {!isSubmitted ? (
                <div className="max-w-lg mx-auto">
                  <div className="grid gap-4 mb-6">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Full Name"
                      className="w-full px-6 py-4 bg-[#0A092B]/50 border border-[#4A63FF]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4A63FF] focus:ring-2 focus:ring-[#4A63FF]/25"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your Email Address"
                      className="w-full px-6 py-4 bg-[#0A092B]/50 border border-[#4A63FF]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4A63FF] focus:ring-2 focus:ring-[#4A63FF]/25"
                      required
                    />
                    <input
                      type="url"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Portfolio/Fund Website"
                      className="w-full px-6 py-4 bg-[#0A092B]/50 border border-[#4A63FF]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4A63FF] focus:ring-2 focus:ring-[#4A63FF]/25"
                      required
                    />
                  </div>
                  {submitMessage && (
                    <div className="mb-4 text-center">
                      <p className={`text-sm ${isSubmitted ? 'text-green-400' : 'text-red-400'}`}>
                        {submitMessage}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={handleFormSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] hover:from-[#C33BFF] hover:to-[#4A63FF] px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#4A63FF]/25 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      'Subscribing...'
                    ) : (
                      <>
                        Subscribe Now
                        <ArrowRight className="ml-2" size={20} />
                      </>
                    )}
                  </button>
                  <p className="text-sm text-gray-400 mt-4 text-center">
                    No spam. Unsubscribe anytime.
                  </p>
                </div>
              ) : (
                <div className="max-w-md mx-auto text-center">
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 mb-6">
                    <CheckCircle className="text-green-400 mx-auto mb-4" size={48} />
                    <h3 className="text-xl font-bold text-green-400 mb-2">Welcome to The Opulion Brief!</h3>
                    <p className="text-gray-300">
                      You're now part of an exclusive community. Your first institutional playbook arrives soon.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', company: '' });
                      setSubmitMessage('');
                    }}
                    className="text-[#4A63FF] hover:underline"
                  >
                    Subscribe another email?
                  </button>
                </div>
              )}

              {/* Final Warning/CTA */}
              <div className="mt-8 p-6 bg-red-500/20 rounded-lg border border-red-500/30">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-red-400 mb-2">⚠️ 92% of operators never break $75M.</h4>
                  <p className="text-gray-300">
                    Not because they lack talent or capital—but because they keep playing by retail rules in an institutional game.
                  </p>
                  <p className="text-white font-bold mt-2">Don't let that be you.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};


// Main App Component
const App = () => {
  return (
    <Router>
      <div className="bg-[#0A092B] text-white min-h-screen">
        <Header />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;