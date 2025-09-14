import React, { useState, useEffect } from 'react';
import { ChevronDown, CheckCircle, XCircle, Users, TrendingUp, Clock, Download, Star, ArrowRight, Menu, X } from 'lucide-react';
import companyLogo from './assets/logo.png'; 

const OpulionLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Smooth scroll animation for anchor links
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
      // Reverting to the 'no-cors' fire-and-forget method.
      // This is the correct way for Google Apps Script web apps.
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors', // This is CRITICAL. Put it back in.
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          timestamp: new Date().toISOString(),
          source: 'Institutional Blueprint Lead Magnet'
        })
      });

      // Since we can't read the response with 'no-cors', we assume success.
      setIsSubmitted(true);
      setSubmitMessage('Success! Check your email for the blueprint...');

    } catch (error) {
      console.error('This error is often misleading with no-cors. Check Google Script Executions log.', error);
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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A092B]/95 backdrop-blur-sm border-b border-[#4A63FF]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 flex items-center justify-center">
                        <img src={companyLogo} alt="Our Company Logo"  width={"100%"}/>

              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] bg-clip-text text-transparent">
                Opulion
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#about" className="hover:text-[#4A63FF] transition-colors">About</a>
              <a href="#services" className="hover:text-[#4A63FF] transition-colors">Services</a>
              <a href="#track-record" className="hover:text-[#4A63FF] transition-colors">Track Record</a>
              <a href="#testimonials" className="hover:text-[#4A63FF] transition-colors">Testimonials</a>
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a href="#download" className="bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] hover:from-[#C33BFF] hover:to-[#4A63FF] px-6 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Get Free Blueprint
              </a>
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
              <a href="#about" className="block hover:text-[#4A63FF] transition-colors" onClick={() => setIsMenuOpen(false)}>About</a>
              <a href="#services" className="block hover:text-[#4A63FF] transition-colors" onClick={() => setIsMenuOpen(false)}>Services</a>
              <a href="#track-record" className="block hover:text-[#4A63FF] transition-colors" onClick={() => setIsMenuOpen(false)}>Track Record</a>
              <a href="#testimonials" className="block hover:text-[#4A63FF] transition-colors" onClick={() => setIsMenuOpen(false)}>Testimonials</a>
              <a href="#download" className="block bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] px-4 py-2 rounded-lg font-semibold text-center" onClick={() => setIsMenuOpen(false)}>
                Get Free Blueprint
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Break the $100M Barrier
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-[#61D9FB] to-[#C33BFF] bg-clip-text text-transparent">
              From Ceiling to Empire
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Most successful operators hit the same wall at $50M. They've done everything "right," but institutions play a different game. 
            </p>
            <div className="bg-gradient-to-r from-[#4A63FF]/20 to-[#C33BFF]/20 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8 mb-12 max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-[#61D9FB]">The Truth Nobody Tells You</h2>
              <p className="text-lg text-gray-200 mb-4">
                Institutions don't win because they're smarter. They win because they're <span className="text-[#C33BFF] font-semibold">structured differently.</span>
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="bg-[#0A092B]/50 rounded-lg p-4">
                  <p className="text-[#4A63FF] font-semibold">They don't just have more money</p>
                  <p className="text-gray-300">They have more tools</p>
                </div>
                <div className="bg-[#0A092B]/50 rounded-lg p-4">
                  <p className="text-[#4A63FF] font-semibold">They don't just find better deals</p>
                  <p className="text-gray-300">They create them</p>
                </div>
                <div className="bg-[#0A092B]/50 rounded-lg p-4">
                  <p className="text-[#4A63FF] font-semibold">They don't just scale</p>
                  <p className="text-gray-300">They evolve identities</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#download" className="bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] hover:from-[#C33BFF] hover:to-[#4A63FF] px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#4A63FF]/25">
                Get Free Institutional Blueprint
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
              High achievers across the spectrum face the same unified frustration: 
              <span className="text-[#C33BFF] font-semibold"> "I'm doing everything right. So why do I feel small?"</span>
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* High Net Worth Individuals */}
            <div className="bg-gradient-to-br from-[#4A63FF]/10 to-[#C33BFF]/10 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8 hover:scale-105 transition-transform duration-300">
              <div className="flex items-center mb-4">
                <Users className="text-[#4A63FF] mr-3" size={32} />
                <h3 className="text-xl font-bold">High Net Worth Individuals</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  Locked out of "good deals" requiring $1M+ minimums
                </li>
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  Advisor takes 1% for 7% returns while institutions pull 15%+
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
                <h3 className="text-xl font-bold">Fund Managers</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  Outperforming big guys but still losing LPs
                </li>
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  Stuck in boutique credibility trap
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
                <h3 className="text-xl font-bold">Syndicators</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  Proven track record, yet treated like retail
                </li>
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  Velocity capped at 2–4 deals per year
                </li>
                <li className="flex items-start">
                  <XCircle className="text-red-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  "I can execute, why can't I access institutional opportunities?"
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Framework */}
      <section id="services" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              The 4 Breakthrough Pillars
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              You don't have a capital problem. You have an <span className="text-[#4A63FF] font-semibold">architecture problem.</span>
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pillar 1 */}
            <div className="bg-gradient-to-br from-[#4A63FF]/20 to-[#0A092B] border border-[#4A63FF]/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#4A63FF]/20 transition-all duration-300">
              <div className="text-[#4A63FF] text-4xl mb-4">🏗️</div>
              <h3 className="text-2xl font-bold mb-4 text-[#4A63FF]">The Architecture Gap</h3>
              <p className="text-gray-300 mb-4">
                Retail thinking caps out at $50M. Institutional frameworks break ceilings.
              </p>
              <div className="bg-[#0A092B]/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Installing scaling frameworks that free up 15+ hours a week</p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-gradient-to-br from-[#C33BFF]/20 to-[#0A092B] border border-[#C33BFF]/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#C33BFF]/20 transition-all duration-300">
              <div className="text-[#C33BFF] text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-4 text-[#C33BFF]">Capital Stack Surgery</h3>
              <p className="text-gray-300 mb-4">
                While you use 2 capital sources, institutions use 7.
              </p>
              <div className="bg-[#0A092B]/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Unlocking mezzanine, preferred equity, and rescue capital</p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-gradient-to-br from-[#61D9FB]/20 to-[#0A092B] border border-[#61D9FB]/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#61D9FB]/20 transition-all duration-300">
              <div className="text-[#61D9FB] text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-4 text-[#61D9FB]">Deal Flow Domination</h3>
              <p className="text-gray-300 mb-4">
                Brokers distribute deals. Institutions manufacture them.
              </p>
              <div className="bg-[#0A092B]/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">Building proprietary deal origination systems</p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-gradient-to-br from-[#D9D0FF]/20 to-[#0A092B] border border-[#D9D0FF]/30 rounded-2xl p-8 hover:shadow-xl hover:shadow-[#D9D0FF]/20 transition-all duration-300">
              <div className="text-[#D9D0FF] text-4xl mb-4">🚀</div>
              <h3 className="text-2xl font-bold mb-4 text-[#D9D0FF]">The Identity Upgrade</h3>
              <p className="text-gray-300 mb-4">
                Scaling isn't about more deals. It's about becoming something new.
              </p>
              <div className="bg-[#0A092B]/50 rounded-lg p-4">
                <p className="text-sm text-gray-400">From operator to allocator, boutique to institutional</p>
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
              Our Track Record
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our partners aren't rookies. They're seasoned operators who felt capped. We helped them engineer their next level.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-gradient-to-br from-[#4A63FF]/10 to-[#C33BFF]/10 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8">
              <div className="text-4xl font-bold text-[#4A63FF] mb-2">$500M+</div>
              <p className="text-lg text-gray-300">in deals analyzed</p>
            </div>
            <div className="bg-gradient-to-br from-[#C33BFF]/10 to-[#61D9FB]/10 backdrop-blur-sm border border-[#C33BFF]/30 rounded-2xl p-8">
              <div className="text-4xl font-bold text-[#C33BFF] mb-2">$50M+</div>
              <p className="text-lg text-gray-300">in transactions closed</p>
            </div>
            <div className="bg-gradient-to-br from-[#61D9FB]/10 to-[#4A63FF]/10 backdrop-blur-sm border border-[#61D9FB]/30 rounded-2xl p-8">
              <div className="text-4xl font-bold text-[#61D9FB] mb-2">$30M+</div>
              <p className="text-lg text-gray-300">in capital raised</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              What Partners Are Saying
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
                "We thought we had a capital problem. Turns out we had an architecture problem. Opulion showed us how institutions actually think, and within 6 months we unlocked $12M in new capacity."
              </p>
              <div className="text-[#4A63FF] font-semibold">— Boutique Fund Manager, $22M AUM</div>
            </div>

            <div className="bg-gradient-to-br from-[#C33BFF]/10 to-[#61D9FB]/10 backdrop-blur-sm border border-[#C33BFF]/30 rounded-2xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "I was tired of chasing scraps from brokers. Opulion helped us build a sourcing system that got us 10 off-market deals in 30 days. We'd been trying for 4 years before that."
              </p>
              <div className="text-[#C33BFF] font-semibold">— Multifamily Syndicator, 300 units</div>
            </div>

            <div className="bg-gradient-to-br from-[#61D9FB]/10 to-[#4A63FF]/10 backdrop-blur-sm border border-[#61D9FB]/30 rounded-2xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-current" size={20} />
                ))}
              </div>
              <p className="text-gray-300 mb-6 italic">
                "I always felt like the small guy in the room. The blueprint Opulion gave us flipped that completely. We're now structuring deals like a $500M fund… without the bloat."
              </p>
              <div className="text-[#61D9FB] font-semibold">— HNWI, $15M net worth</div>
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
              We help ambitious operators, syndicators, and fund managers break the $100M barrier and finally play the same game as institutions — without the bureaucracy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-[#4A63FF]">Why We Exist</h3>
              <div className="space-y-4 text-gray-300">
                <p>"I'm doing everything right. Why do I still feel small?"</p>
                <p>"I have the capital, why don't I have the access?"</p>
                <p>"I'm outperforming, so why do institutions still win?"</p>
              </div>
              <div className="mt-8 p-6 bg-gradient-to-r from-[#4A63FF]/20 to-[#C33BFF]/20 rounded-lg border border-[#4A63FF]/30">
                <p className="text-lg font-semibold text-[#61D9FB] mb-2">The answer isn't capital. It isn't experience. It isn't even track record.</p>
                <p className="text-xl font-bold text-white">The answer is architecture.</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#4A63FF]/10 to-[#C33BFF]/10 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8">
              <h4 className="text-xl font-bold mb-4 text-[#C33BFF]">Our Mission</h4>
              <p className="text-gray-300 mb-6">
                To arm ambitious real estate operators, syndicators, and boutique funds with institutional architecture and next-generation leverage so they can scale past the $100M barrier, access opportunities once reserved for family offices, and finally play a game institutions aren't prepared for.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-center text-green-400">
                  <CheckCircle className="mr-3 flex-shrink-0" size={20} />
                  <span>Institutional-grade systems without bureaucracy</span>
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="mr-3 flex-shrink-0" size={20} />
                  <span>Capital stack innovation that unlocks hidden funding</span>
                </div>
                <div className="flex items-center text-green-400">
                  <CheckCircle className="mr-3 flex-shrink-0" size={20} />
                  <span>AI + blockchain as the edge that levels the playing field</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="newsletter" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-gradient-to-br from-[#4A63FF]/20 to-[#C33BFF]/20 backdrop-blur-sm border border-[#4A63FF]/30 rounded-3xl p-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The Architecture Advantage
          </h2>
          
          <p className="text-xl text-gray-300 mb-8">
            Join 2,847+ high-net-worth individuals, fund managers, and syndicators who get exclusive insights into 
            the institutional frameworks that separate $50M players from $500M platforms.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
            <div>
              <h4 className="text-lg font-semibold text-[#4A63FF] mb-4">Weekly Deep Dives Include:</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  Capital stack breakdowns institutions don't want you to see
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  Deal sourcing systems that create opportunities instead of chasing them
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  The psychology behind why successful investors plateau at $100M
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-green-400 mr-2 mt-1 flex-shrink-0" size={16} />
                  Real case studies from the $50M → $500M transformation
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-[#C33BFF] mb-4">Subscriber-Only Access:</h4>
              <ul className="space-y-2 text-gray-300">
                <li>Monthly "Architecture Teardown" of institutional deals</li>
                <li>Early access to capital structure templates and frameworks</li>
                <li>Private community of scaling capital allocators</li>
                <li>Priority invitations to exclusive strategy sessions</li>
              </ul>
            </div>
          </div>

          {!isSubmitted ? (
            <div className="max-w-lg mx-auto">
              <div className="grid md:grid-cols-1 gap-4 mb-6">
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
                  placeholder="Your Company Website (Optional)"
                  className="w-full px-6 py-4 bg-[#0A092B]/50 border border-[#4A63FF]/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#4A63FF] focus:ring-2 focus:ring-[#4A63FF]/25"
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
                    Join The Architecture Advantage
                    <ArrowRight className="ml-2" size={20} />
                  </>
                )}
              </button>
              <p className="text-sm text-gray-400 mt-4">
                No spam. Unsubscribe anytime. Join the 8% who break the $100M barrier.
              </p>
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center">
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-6 mb-6">
                <CheckCircle className="text-green-400 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-green-400 mb-2">Welcome to the Inner Circle!</h3>
                <p className="text-gray-300">
                  You're now part of an exclusive community of capital allocators breaking through the $100M ceiling. 
                  Your first architectural deep dive arrives Thursday.
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

          <div className="mt-8 p-6 bg-[#0A092B]/30 rounded-lg border border-orange-500/30">
            <h4 className="text-lg font-semibold text-orange-400 mb-2">Why Join Now</h4>
            <p className="text-gray-300">
              The $2T debt wall, institutional consolidation, and capital market shifts are creating a 24-month window. 
              Those who upgrade their architecture now will dominate. Those who don't will stagnate.
            </p>
          </div>
        </div>
      </div>
    </section>

      {/* Strategy Call Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0A092B] to-[#1A1B4B]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            The Strategy Call: Your Institutional Blueprint
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            This isn't a discovery call. It's what others charge $5,000–$10,000 for — and we're giving it away free.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-[#4A63FF]/10 to-[#0A092B] border border-[#4A63FF]/30 rounded-2xl p-6">
              <div className="text-[#4A63FF] text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2 text-[#4A63FF]">Pinpoint Your Ceiling</h3>
              <p className="text-gray-300 text-sm">Diagnose the exact architecture gap keeping you capped</p>
            </div>
            <div className="bg-gradient-to-br from-[#C33BFF]/10 to-[#0A092B] border border-[#C33BFF]/30 rounded-2xl p-6">
              <div className="text-[#C33BFF] text-3xl mb-4">👁️</div>
              <h3 className="text-lg font-semibold mb-2 text-[#C33BFF]">Expose the Blind Spots</h3>
              <p className="text-gray-300 text-sm">Show you where institutions play a different game</p>
            </div>
            <div className="bg-gradient-to-br from-[#61D9FB]/10 to-[#0A092B] border border-[#61D9FB]/30 rounded-2xl p-6">
              <div className="text-[#61D9FB] text-3xl mb-4">🗺️</div>
              <h3 className="text-lg font-semibold mb-2 text-[#61D9FB]">Build Your Map</h3>
              <p className="text-gray-300 text-sm">Step-by-step institutional blueprint tailored to your business</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-[#4A63FF]/20 to-[#C33BFF]/20 backdrop-blur-sm border border-[#4A63FF]/30 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-bold mb-4 text-[#61D9FB]">You'll walk away with:</h3>
            <p className="text-lg text-gray-200">
              The exact roadmap to scale past $100M AUM and finally compete at an institutional level.
            </p>
          </div>

          <button
            onClick={handleStrategyCallClick}
            className="inline-flex items-center bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] hover:from-[#C33BFF] hover:to-[#4A63FF] px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-[#4A63FF]/25"
          >
            Book Your Free Strategy Call
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-[#4A63FF]/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-20 h-20  flex items-center justify-center">
                          <img src={companyLogo} alt="Our Company Logo" />

                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] bg-clip-text text-transparent">
                  Opulion
                </span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Helping ambitious real estate operators, syndicators, and fund managers break the $100M barrier and compete like institutions.
              </p>
              <div className="text-sm text-gray-400">
                <p>At this level, advice doesn't move the needle.</p>
                <p className="font-semibold text-[#4A63FF]">Architecture does.</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#4A63FF]">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#about" className="hover:text-[#4A63FF] transition-colors">About</a></li>
                <li><a href="#services" className="hover:text-[#4A63FF] transition-colors">Services</a></li>
                <li><a href="#track-record" className="hover:text-[#4A63FF] transition-colors">Track Record</a></li>
                <li><a href="#testimonials" className="hover:text-[#4A63FF] transition-colors">Testimonials</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[#C33BFF]">Get Started</h4>
              <div className="space-y-3">
                {/* <a 
                  href="#download" 
                  className="block bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] hover:from-[#C33BFF] hover:to-[#4A63FF] px-4 py-2 rounded-lg font-semibold text-sm text-center transition-all duration-300"
                >
                  Free Blueprint
                </a> */}
                <button 
                  onClick={handleStrategyCallClick}
                  className="block bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] hover:from-[#C33BFF] hover:to-[#4A63FF] px-6 py-2 rounded-lg font-semibold text-sm text-center transition-all duration-300"
                >
                  Strategy Call
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-[#4A63FF]/20 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 Opulion. All rights reserved. | 
              <span className="text-[#4A63FF] ml-1">Ready to Scale Past the $100M Barrier?</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="#download"
          className="bg-gradient-to-r from-[#4A63FF] to-[#C33BFF] hover:from-[#C33BFF] hover:to-[#4A63FF] px-6 py-3 rounded-full font-bold shadow-lg shadow-[#4A63FF]/25 transition-all duration-300 transform hover:scale-110 flex items-center"
        >
          Free Blueprint
          <ArrowRight className="ml-2" size={18} />
        </a>
      </div>
    </div>
  );
};

export default OpulionLandingPage;