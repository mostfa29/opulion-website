import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Star /*... other icons */ } from 'lucide-react';

const PortfolioScalingLeadMagnet = () => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleFormSubmit = async () => {
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
        //   source: 'Portfolio Scaling Framework Lead Magnet'
        })
      });

      // Since we can't read the response with 'no-cors', we assume success.
      setSubmitMessage('Success! Opening your framework...');
      setTimeout(() => {
        window.open('https://docs.google.com/document/d/1a_53dJjMVp9gk6pdNk0xM8cI7RjjzGwxY2fyPTIcHS8', '_blank');
      }, 1500);

    } catch (error) {
      console.error('This error is often misleading with no-cors. Check Google Script Executions log.', error);
      setSubmitMessage('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Header */}


      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12" style={{paddingTop:"90px"}} >
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          
          {/* Left Side - Copy */}
          <div className="text-white mb-12 lg:mb-0">
            
            {/* Main Headline */}
            <h1 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              Most operators scale themselves into a trap. Here's the framework we use to 
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> scale portfolios by $10M–$25M </span>
              without bleeding out.
            </h1>

            {/* Sub-headline */}
            <div className="text-xl text-gray-300 mb-8 leading-relaxed">
              <p className="mb-4">
                Operators think a 7–9 figure portfolio = wealth. Truth: without the right structure, 
                they're just babysitting liabilities the bank owns.
              </p>
              <p className="mb-6">
                This <span className="text-yellow-400 font-semibold">free framework</span> shows you how top operators:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Structure for scale from day one</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Optimize for cash flow (not fairy-tale appreciation)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span>Sequence acquisitions like a chess player, not a gambler</span>
                </li>
              </ul>
            </div>

            {/* Authority Section */}
            <div className="bg-white/10 backdrop-blur rounded-2xl p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 text-yellow-400">Backed by real results:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">$50M+</div>
                  <div className="text-sm text-gray-300">Deals Closed</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-green-400">$30M+</div>
                  <div className="text-sm text-gray-300">Capital Raised</div>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">7-9 Fig</div>
                  <div className="text-sm text-gray-300">Portfolio Teams</div>
                </div>
              </div>
            </div>

            {/* The Hook / Lead Magnet Description */}
            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold mb-4">
                Inside the <span className="text-yellow-400">Portfolio Scaling Framework</span>, you'll see:
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>The 3-step system to avoid becoming a leveraged babysitter for the bank</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>How to unlock $10M–$25M in portfolio growth in the next 90 days</span>
                </li>
                <li className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                  <span>Why "more doors" ≠ more wealth — and what real operators do differently</span>
                </li>
              </ul>
              <p className="mt-6 text-gray-300 font-medium">
                No fluff. Just the exact process we use with acquisition teams.
              </p>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:sticky lg:top-8">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2 text-center">
                Send me the Framework
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Get instant access to the complete framework
              </p>

              {submitMessage && (
                <div className={`p-4 rounded-lg mb-6 text-center ${
                  submitMessage.includes('Success') 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {submitMessage}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </div>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your company name"
                  />
                </div>

                <button
                  onClick={handleFormSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg text-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? 'opacity-75 cursor-not-allowed' 
                      : 'hover:shadow-lg hover:scale-105'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      👉 Get the Framework Now
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <p className="text-xs text-gray-500 text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>

            {/* Social Proof */}
            <div className="mt-8 text-center">
              <p className="text-gray-300 mb-4">Trusted by 7-9 figure operators</p>
              <div className="flex justify-center items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-white ml-2 font-medium">4.9/5 from 200+ operators</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default PortfolioScalingLeadMagnet;
