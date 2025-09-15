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
              <li><Link to="/#about" className="hover:text-[#4A63FF] transition-colors">About</Link></li>
              <li><Link to="/#services" className="hover:text-[#4A63FF] transition-colors">Services</Link></li>
              <li><Link to="/#track-record" className="hover:text-[#4A63FF] transition-colors">Track Record</Link></li>
              <li><Link to="/#testimonials" className="hover:text-[#4A63FF] transition-colors">Testimonials</Link></li>
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
                Break Through the $50M Ceiling
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#61D9FB] to-[#C33BFF] bg-clip-text text-transparent">
              You Don't Have a Capital Problem
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#C33BFF]">
              You Have an Architecture Problem
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              You've built $5M-$50M through talent and determination. But 92% never break $75M—not from lack of skill, but lack of institutional architecture.
            </p>
            <div className="bg-gradient-to-r from-[#4A63FF]/20 to-[#C33BFF]/20 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-[#61D9FB]">The $50M Plateau Truth</h3>
              <p className="text-lg text-gray-200 mb-4">
                Institutions don't outperform you because they're smarter. They outperform you because they're <span className="text-[#C33BFF] font-semibold">structured differently.</span>
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-[#0A092B]/50 rounded-lg p-4">
                  <p className="text-[#4A63FF] font-semibold">While you use 2 capital sources</p>
                  <p className="text-gray-300">They stack 7</p>
                </div>
                <div className="bg-[#0A092B]/50 rounded-lg p-4">
                  <p className="text-[#4A63FF] font-semibold">While you chase marketed deals</p>
                  <p className="text-gray-300">They create opportunities</p>
                </div>
                <div className="bg-[#0A092B]/50 rounded-lg p-4">
                  <p className="text-[#4A63FF] font-semibold">While you scale operations</p>
                  <p className="text-gray-300">They evolve identity</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#download" className="bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] hover:from-[#C33BFF] hover:to-[#4A63FF] px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#4A63FF]/25">
                Get Institutional Architecture Blueprint
              </a>
              <a href="#about" className="border-2 border-[#4A63FF] hover:bg-[#4A63FF]/20 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A092B] to-[#1A1B4B]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              <span className="text-red-400">The $50M Graveyard</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Successful capital allocators across segments face the same unified frustration:
              <span className="text-[#C33BFF] font-semibold"> "I'm doing everything right. So why do I feel small?"</span>
            </p>
          </div>
         
          <div className="grid md:grid-cols-3 gap-8">
            {/* High Net Worth Individuals */}
            <div className="bg-gradient-to-br from-[#4A63FF]/10 to-[#C33BFF]/10 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <Users className="text-[#4A63FF] mr-3" size={32} />
                <h3 className="text-xl font-bold">HNWIs ($5M-$25M)</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  Wealth advisor charges 1% for 7% returns while institutions pull 15%+
                </li>
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  Locked out of institutional deals requiring $1M+ minimums
                </li>
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  "I have the capital, why don't I have the access?"
                </li>
              </ul>
            </div>

            {/* Fund Managers */}
            <div className="bg-gradient-to-br from-[#C33BFF]/10 to-[#61D9FB]/10 backdrop-blur-sm border border-[#C33BFF]/30 rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <TrendingUp className="text-[#C33BFF] mr-3" size={32} />
                <h3 className="text-xl font-bold">Fund Managers ($8M-$40M AUM)</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  Outperforming $500M funds but still losing LPs
                </li>
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  Perpetually "the small fund" in the room
                </li>
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  "I outperform them, why do they get all the opportunities?"
                </li>
              </ul>
            </div>

            {/* Syndicators */}
            <div className="bg-gradient-to-br from-[#61D9FB]/10 to-[#4A63FF]/10 backdrop-blur-sm border border-[#61D9FB]/30 rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <Clock className="text-[#61D9FB] mr-3" size={32} />
                <h3 className="text-xl font-bold">Syndicators (100-500 units)</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  Proven track record, yet treated like retail operators
                </li>
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  Velocity capped at 2-4 deals per year, competing for scraps
                </li>
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  "I can execute, why can't I access institutional opportunities?"
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4 text-red-400">The Unifying Truth</h3>
              <p className="text-lg text-gray-200">
                You're all successful by every normal metric. But you're playing checkers while institutions play 3D chess.
                The gap isn't capital—it's architecture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Framework */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              The 4 Institutional Breakthroughs
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The gap between $50M and $500M isn't scale. It's <span className="text-[#4A63FF] font-semibold">structure.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <div className="bg-gradient-to-br from-[#4A63FF]/20 to-[#0A092B] border border-[#4A63FF]/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#4A63FF]/20 transition-all duration-300">
              <div className="text-[#4A63FF] text-4xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold mb-4 text-[#4A63FF]">Architecture Over Scale</h3>
              <p className="text-gray-300 mb-4">
                Retail thinking caps out at $50M. Institutional frameworks demolish ceilings.
              </p>
              <div className="bg-[#0A092B]/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Transform from operator to platform using systems that free 15+ hours weekly</p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-gradient-to-br from-[#C33BFF]/20 to-[#0A092B] border border-[#C33BFF]/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#C33BFF]/20 transition-all duration-300">
              <div className="text-[#C33BFF] text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-4 text-[#C33BFF]">Capital Stack Surgery</h3>
              <p className="text-gray-300 mb-4">
                While you use debt + equity, institutions orchestrate 7 capital layers.
              </p>
              <div className="bg-[#0A092B]/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Unlock mezzanine, preferred equity, seller financing, and rescue capital</p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-gradient-to-br from-[#61D9FB]/20 to-[#0A092B] border border-[#61D9FB]/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#61D9FB]/20 transition-all duration-300">
              <div className="text-[#61D9FB] text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-[#61D9FB]">Deal Creation vs. Deal Chasing</h3>
              <p className="text-gray-300 mb-4">
                Brokers distribute deals. Institutions manufacture opportunities.
              </p>
              <div className="bg-[#0A092B]/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Build proprietary origination systems that eliminate competition</p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-gradient-to-br from-[#D9D0FF]/20 to-[#0A092B] border border-[#D9D0FF]/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#D9D0FF]/20 transition-all duration-300">
              <div className="text-[#D9D0FF] text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4 text-[#D9D0FF]">The Identity Evolution</h3>
              <p className="text-gray-300 mb-4">
                Scaling past $75M requires becoming something fundamentally different.
              </p>
              <div className="bg-[#0A092B]/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">From wealth preservation to creation, operator to allocator, boutique to institutional</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Track Record */}
      <section id="track-record" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A092B] to-[#1A1B4B]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Proven Results Across Segments
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our partners aren't beginners stuck at $5M. They're seasoned operators who felt capped at $50M. We helped them engineer their next evolution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-gradient-to-br from-[#4A63FF]/10 to-[#C33BFF]/10 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8">
              <div className="text-4xl font-bold text-[#4A63FF] mb-2">$500M+</div>
              <p className="text-lg text-gray-300">in institutional deals analyzed</p>
            </div>
            <div className="bg-gradient-to-br from-[#C33BFF]/10 to-[#61D9FB]/10 backdrop-blur-sm border border-[#C33BFF]/30 rounded-2xl p-8">
              <div className="text-4xl font-bold text-[#C33BFF] mb-2">$180M+</div>
              <p className="text-lg text-gray-300">in transactions engineered</p>
            </div>
            <div className="bg-gradient-to-br from-[#61D9FB]/10 to-[#4A63FF]/10 backdrop-blur-sm border border-[#61D9FB]/30 rounded-2xl p-8">
              <div className="text-4xl font-bold text-[#61D9FB] mb-2">87%</div>
              <p className="text-lg text-gray-300">of partners scaled past $75M within 18 months</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Breaking Through the Ceiling
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
                "I managed $22M for 6 years and felt perpetually 'small.' Opulion showed me the institutional architecture I was missing. Within 8 months, we unlocked $40M in new capacity using capital sources I didn't even know existed."
              </p>
              <div className="text-[#4A63FF] font-semibold">— Fund Manager, Now $62M AUM</div>
            </div>

            <div className="bg-gradient-to-br from-[#C33BFF]/10 to-[#61D9FB]/10 backdrop-blur-sm border border-[#C33BFF]/30 rounded-2xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "At $15M net worth, I was tired of being treated like retail. The blueprint Opulion gave us didn't just change our deal flow—it changed how institutions see us. We're now structuring $20M+ opportunities with family office credibility."
              </p>
              <div className="text-[#C33BFF] font-semibold">— HNWI, Portfolio Now $30M</div>
            </div>

            <div className="bg-gradient-to-br from-[#61D9FB]/10 to-[#4A63FF]/10 backdrop-blur-sm border border-[#61D9FB]/30 rounded-2xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "300 units felt like my ceiling after 5 years. I was chasing broker scraps while watching institutions get first look at everything. Opulion's origination system got us 12 off-market deals in 60 days. Game changer."
              </p>
              <div className="text-[#61D9FB] font-semibold">— Syndicator, Now 850+ Units</div>
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
              We help ambitious capital allocators, fund managers, and syndicators break the $50M plateau and finally compete with institutional architecture—without institutional bureaucracy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#4A63FF]">The Questions That Drive Us</h3>
              <div className="space-y-4 text-gray-300">
                <p>"I'm doing everything right. Why do I feel stuck at $50M?"</p>
                <p>"I have the capital and track record. Why don't I have institutional access?"</p>
                <p>"I'm outperforming bigger funds. So why do institutions still win?"</p>
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-[#4A63FF]/20 to-[#C33BFF]/20 rounded-lg border border-[#4A63FF]/30">
                <p className="text-lg font-semibold text-[#61D9FB] mb-2">The answer isn't more capital. It isn't better performance. It isn't even more experience.</p>
                <p className="text-xl font-bold text-white">It's institutional architecture.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#4A63FF]/10 to-[#C33BFF]/10 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8">
              <h4 className="text-xl font-bold mb-4 text-[#C33BFF]">Our Mission</h4>
              <p className="text-gray-300 mb-6">
                To arm ambitious operators between $5M-$50M with institutional frameworks and capital architecture so they can break the $75M barrier that stops 92% of investors, access opportunities once reserved for family offices, and compete on a playing field institutions aren't prepared for.
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
          </div>
        </div>
      </section>

      {/* Quick Newsletter CTA on Landing Page */}
      {/* <section id="download" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-[#4A63FF]/20 to-[#C33BFF]/20 backdrop-blur-sm border border-[#4A63FF]/30 rounded-3xl p-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Get The Institutional Blueprint
            </h2>
           
            <p className="text-xl text-gray-300 mb-8">
              Join 1,400+ capital allocators who get exclusive weekly insights into the institutional frameworks that separate $50M operators from $500M platforms.
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
                    'Joining...'
                  ) : (
                    <>
                      <Mail className="mr-2" size={20} />
                      Get The Institutional Blueprint
                      <ArrowRight className="ml-2" size={20} />
                    </>
                  )}
                </button>
                <p className="text-sm text-gray-400 mt-4">
                  No spam. Unsubscribe anytime. Join the 8% who break the $75M barrier.
                </p>
              </div>
            ) : (
              <div className="max-w-md mx-auto text-center">
                <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 mb-6">
                  <CheckCircle className="text-green-400 mx-auto mb-4" size={48} />
                  <h3 className="text-xl font-bold text-green-400 mb-2">Welcome to the Inner Circle!</h3>
                  <p className="text-gray-300">
                    You're now part of an exclusive community of operators breaking through the $75M ceiling.
                    Your first institutional architecture breakdown arrives today.
                  </p>
                </div>
                <Link to="/newsletter" className="text-[#4A63FF] hover:underline">
                  View full newsletter details →
                </Link>
              </div>
            )}

            <div className="mt-8 p-6 bg-[#0A092B]/30 rounded-lg border border-yellow-500/30">
              <h4 className="text-lg font-semibold text-yellow-400 mb-2">The $75M Window is Closing</h4>
              <p className="text-gray-300">
                Market consolidation and institutional competition are creating a 24-month window.
                Those who upgrade their architecture now will dominate the next decade.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Strategy Call Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A092B] to-[#1A1B4B]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The Institutional Blueprint Call
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            This isn't a discovery call or sales pitch. It's what top consultancies charge $10,000-$15,000 for—and we're giving it away free to qualified operators.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#4A63FF]/10 to-[#0A092B] border border-[#4A63FF]/30 rounded-2xl p-6">
              <div className="text-[#4A63FF] text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2 text-[#4A63FF]">Diagnose Your Ceiling</h3>
              <p className="text-gray-300 text-sm">Identify the exact architectural gap keeping you plateaued at $50M</p>
            </div>
            <div className="bg-gradient-to-br from-[#C33BFF]/10 to-[#0A092B] border border-[#C33BFF]/30 rounded-2xl p-6">
              <div className="text-[#C33BFF] text-3xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2 text-[#C33BFF]">Expose Blind Spots</h3>
              <p className="text-gray-300 text-sm">Show you where institutions play an entirely different game</p>
            </div>
            <div className="bg-gradient-to-br from-[#61D9FB]/10 to-[#0A092B] border border-[#61D9FB]/30 rounded-2xl p-6">
              <div className="text-[#61D9FB] text-3xl mb-4">🗺️</div>
              <h3 className="text-lg font-semibold mb-2 text-[#61D9FB]">Build Your Roadmap</h3>
              <p className="text-gray-300 text-sm">Custom institutional architecture blueprint for your specific business</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#4A63FF]/20 to-[#C33BFF]/20 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold mb-4 text-[#61D9FB]">You'll leave with:</h3>
            <p className="text-lg text-gray-200">
              The exact playbook to scale past $75M AUM and compete with institutional architecture, not just institutional capital.
            </p>
          </div>

          <div className="mb-8">
            <p className="text-lg text-yellow-400 font-semibold mb-2">⚠️ Limited to Qualified Operators Only</p>
            <p className="text-gray-300">
              This call is reserved for operators with $5M+ AUM and proven track records. We turn away 70% of applicants.
            </p>
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
            <Link to="/" className="inline-flex items-center text-[#4A63FF] hover:text-[#C33BFF] transition-colors mb-6">
              <Home className="mr-2" size={20} />
              Back to Home
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-[#4A63FF]/20 to-[#C33BFF]/20 backdrop-blur-sm border border-[#4A63FF]/30 rounded-3xl p-12">
            <div className="text-6xl mb-6">📈</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-6">
              The Scale Trap Newsletter
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              For Real Estate Investors + Fund Managers in the $5M–$50M Range Who Want to Break the Ceiling
            </p>

            {/* Newsletter Value Props */}
            <div className="text-left mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center text-[#4A63FF]">Let's Be Honest</h2>
              <p className="text-lg text-gray-300 mb-6">
                Most investors in the $5M–$50M range hit the same wall.
              </p>

              <div className="space-y-6 mb-8">
                <div className="bg-[#0A092B]/50 rounded-lg p-6 border border-[#4A63FF]/20">
                  <h3 className="text-lg font-semibold text-[#4A63FF] mb-3">Fund Managers:</h3>
                  <p className="text-gray-300">You're managing $5M–$45M AUM with a lean team, but reporting, compliance, and LP pressure eat your week.</p>
                </div>

                <div className="bg-[#0A092B]/50 rounded-lg p-6 border border-[#C33BFF]/20">
                  <h3 className="text-lg font-semibold text-[#C33BFF] mb-3">Syndicators:</h3>
                  <p className="text-gray-300">You've proven you can execute deals, but velocity caps you at 2–4 per year. Brokers treat you like "small time."</p>
                </div>

                <div className="bg-[#0A092B]/50 rounded-lg p-6 border border-[#61D9FB]/20">
                  <h3 className="text-lg font-semibold text-[#61D9FB] mb-3">HNWI Investors:</h3>
                  <p className="text-gray-300">You've built real wealth, but you're locked out of institutional-grade opportunities and stuck with "retail" structures that keep you dependent on advisors.</p>
                </div>
              </div>

              <div className="text-center mb-8">
                <p className="text-lg text-gray-300 mb-2">Different profiles.</p>
                <p className="text-xl font-bold text-red-400">Same frustration: everything that got you here won't get you past $50M–$75M.</p>
                <p className="text-2xl font-bold text-[#C33BFF] mt-4">That's the Scale Trap.</p>
              </div>
            </div>

            {/* What You'll Get */}
            <div className="text-left mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center text-[#4A63FF]">What You'll Get</h2>
              <p className="text-lg text-gray-300 mb-6">Every issue gives you one no-fluff playbook to:</p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <span className="text-[#4A63FF] mr-3">📊</span>
                  <div>
                    <span className="font-semibold text-[#4A63FF]">Cut Operational Drag</span>
                    <span className="text-gray-300"> – Free 10–15 hours a week by fixing reporting and workflow chaos.</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-[#C33BFF] mr-3">📈</span>
                  <div>
                    <span className="font-semibold text-[#C33BFF]">Own Your Deal Flow</span>
                    <span className="text-gray-300"> – Stop chasing marketed scraps. Build predictable origination pipelines.</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-[#61D9FB] mr-3">🤝</span>
                  <div>
                    <span className="font-semibold text-[#61D9FB]">Upgrade Investor Credibility</span>
                    <span className="text-gray-300"> – Deliver institutional-grade reporting and communication without adding bureaucracy.</span>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-yellow-400 mr-3">🔍</span>
                  <div>
                    <span className="font-semibold text-yellow-400">See Real Case Studies</span>
                    <span className="text-gray-300"> – How investors stuck at $20M–$40M broke through and scaled past $75M+.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Listen to Us */}
            <div className="text-left mb-12">
              <h2 className="text-2xl font-bold mb-6 text-center text-[#4A63FF]">Why Listen to Us?</h2>
              <p className="text-lg text-gray-300 mb-6">At Opulion, we've helped ambitious investors and funds:</p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="bg-[#0A092B]/50 rounded-lg p-4 text-center border border-[#4A63FF]/20">
                  <div className="text-2xl font-bold text-[#4A63FF] mb-2">Analyze</div>
                  <div className="text-lg text-white">$500M in deals</div>
                </div>
                <div className="bg-[#0A092B]/50 rounded-lg p-4 text-center border border-[#C33BFF]/20">
                  <div className="text-2xl font-bold text-[#C33BFF] mb-2">Restructure</div>
                  <div className="text-lg text-white">$180M+ in transactions</div>
                </div>
                <div className="bg-[#0A092B]/50 rounded-lg p-4 text-center border border-[#61D9FB]/20">
                  <div className="text-2xl font-bold text-[#61D9FB] mb-2">Break through</div>
                  <div className="text-lg text-white">the $50M plateau 87% of the time</div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg text-gray-300 mb-2">We're not selling "passive income" myths.</p>
                <p className="text-xl font-bold text-[#4A63FF]">We're giving you the same frameworks we use in the trenches — free.</p>
              </div>
            </div>

            {/* Reader Testimonials */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-8 text-center text-[#4A63FF]">What Readers Say</h2>
              <div className="space-y-6">
                <blockquote className="bg-[#0A092B]/50 rounded-lg p-6 border-l-4 border-[#4A63FF]">
                  <p className="text-gray-300 italic mb-3">
                    "I thought I needed more capital. This showed me I needed better architecture. One framework saved me 12 hours a month in reporting."
                  </p>
                  <cite className="text-[#4A63FF] font-semibold">— Fund Manager, $32M AUM</cite>
                </blockquote>

                <blockquote className="bg-[#0A092B]/50 rounded-lg p-6 border-l-4 border-[#C33BFF]">
                  <p className="text-gray-300 italic mb-3">
                    "Finally, someone talking about scaling without the corporate fat. It's like insider playbooks for breaking ceilings."
                  </p>
                  <cite className="text-[#C33BFF] font-semibold">— Syndicator, 450 Units</cite>
                </blockquote>

                <blockquote className="bg-[#0A092B]/50 rounded-lg p-6 border-l-4 border-[#61D9FB]">
                  <p className="text-gray-300 italic mb-3">
                    "This newsletter is the first time I've seen real estate explained at an institutional level without the noise. It made me rethink how I deploy my portfolio."
                  </p>
                  <cite className="text-[#61D9FB] font-semibold">— HNWI Investor, $18M Net Worth</cite>
                </blockquote>
              </div>
            </div>

            {/* Subscribe Section */}
            <div className="border-t border-[#4A63FF]/30 pt-12">
              <h2 className="text-3xl font-bold mb-4 text-center">Subscribe Free</h2>
              <p className="text-lg text-gray-300 mb-8 text-center">
                No hype. No fluff. No gurus.<br />
                Just one insight a week to help you break through the $50M ceiling.
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
                      'Joining...'
                    ) : (
                      <>
                        Get the Newsletter
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
                    <h3 className="text-xl font-bold text-green-400 mb-2">Welcome to The Scale Trap!</h3>
                    <p className="text-gray-300">
                      You're now part of an exclusive community. Your first institutional architecture breakdown arrives today.
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

              <div className="mt-8 p-6 bg-red-500/20 rounded-lg border border-red-500/30">
                <h4 className="text-lg font-semibold text-red-400 mb-2">⚠️ 92% of investors never break $75M.</h4>
                <p className="text-gray-300">
                  Not because they lack capital — but because they stay stuck in the Scale Trap.<br />
                  <span className="font-bold text-white">Don't let that be you.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Newsletter Content */}
      {/* <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A092B] to-[#1A1B4B]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              🚀 Break the $50M Ceiling and Start Playing Like an Institution
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              You've built $5M–$50M in real estate through grit, intelligence, and relentless work.<br />
              But here's the truth you already feel:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#4A63FF]/10 to-[#0A092B] border border-[#4A63FF]/30 rounded-2xl p-8">
              <div className="text-[#4A63FF] text-3xl mb-4">👉</div>
              <p className="text-gray-300">You've outgrown the scrappy systems that got you here.</p>
            </div>
            <div className="bg-gradient-to-br from-[#C33BFF]/10 to-[#0A092B] border border-[#C33BFF]/30 rounded-2xl p-8">
              <div className="text-[#C33BFF] text-3xl mb-4">👉</div>
              <p className="text-gray-300">You're too sophisticated to be "retail," but not resourced like an institution.</p>
            </div>
            <div className="bg-gradient-to-br from-[#61D9FB]/10 to-[#0A092B] border border-[#61D9FB]/30 rounded-2xl p-8">
              <div className="text-[#61D9FB] text-3xl mb-4">👉</div>
              <p className="text-gray-300">You know you should be playing bigger — but the ceiling feels real.</p>
            </div>
          </div>

          <div className="text-center mb-12">
            <p className="text-lg text-gray-300 mb-4">
              And no matter how hard you work, you still feel "small" compared to the players you know you should be competing with.
            </p>
            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-sm border border-red-500/30 rounded-lg p-6 max-w-2xl mx-auto">
              <p className="text-lg text-gray-200 mb-2">This isn't a performance problem.</p>
              <p className="text-xl font-bold text-red-400">It's an identity problem.</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#4A63FF]/20 to-[#C33BFF]/20 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-[#4A63FF]">The Scale Trap</h3>
            <p className="text-lg text-gray-300 mb-6">
              Most investors stall between $25M–$75M. Not because they lack capital. Not because they lack talent.
              But because they keep running their business like an operator — when the next level requires them to step into the role of an allocator.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-300">You know you're capable of $100M+.</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-300">But you're stuck inside the very machine you built.</span>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                <span className="text-gray-300">And institutions keep pulling away, not because they're smarter — but because they're structured differently.</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold mb-6 text-[#C33BFF]">What Changes When You Build Like an Institution</h3>
            <p className="text-lg text-gray-300 mb-8">
              At Opulion, we help ambitious real estate investors in the $5M–$50M range:
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start text-left">
                  <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-semibold text-[#4A63FF]">Free 15+ Hours a Week</span>
                    <span className="text-gray-300"> – By installing frameworks that eliminate founder drag.</span>
                  </div>
                </div>
                <div className="flex items-start text-left">
                  <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-semibold text-[#C33BFF]">Unlock Hidden Capital Sources</span>
                    <span className="text-gray-300"> – So you stop playing with two tools while institutions play with seven.</span>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="flex items-start text-left">
                  <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-semibold text-[#61D9FB]">Create Proprietary Deal Flow</span>
                    <span className="text-gray-300"> – Systems that put you at the table first, not last.</span>
                  </div>
                </div>
                <div className="flex items-start text-left">
                  <CheckCircle className="text-green-400 mr-3 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <span className="font-semibold text-yellow-400">Upgrade Investor Credibility</span>
                    <span className="text-gray-300"> – Reporting that earns respect from bigger checks.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-[#0A092B]/50 rounded-lg">
              <p className="text-lg text-gray-300 mb-2">We don't sell "hacks."</p>
              <p className="text-xl font-bold text-[#4A63FF]">We build the architecture that gets you past the plateau.</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Call to Action */}
      {/* <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#4A63FF]/20 to-[#C33BFF]/20 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-[#4A63FF]">Ready to Break Your Ceiling?</h2>
            <p className="text-lg text-gray-300 mb-6">
              Don't stay stuck in the Scale Trap. Join the 8% who make it past $75M.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/#download"
                className="bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] hover:from-[#C33BFF] hover:to-[#4A63FF] px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#4A63FF]/25"
              >
                Get Free Blueprint
              </Link>
              <Link
                to="/"
                className="border-2 border-[#4A63FF] hover:bg-[#4A63FF]/20 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </section> */}
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