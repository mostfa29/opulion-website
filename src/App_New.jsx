import React, { useState, useEffect } from 'react';
import { ChevronDown, Menu, X, ArrowRight, TrendingUp, DollarSign, Zap, Star, Users, Target, CheckCircle, Play, Download } from 'lucide-react';
import PortfolioScalingLeadMagnet from './Portfolio_lead_magnet';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  // MODIFICATION: Added 'leadMagnet' to the possible page states
  const [currentPage, setCurrentPage] = useState('home');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const testimonials = [
    {
      text: "We were losing deals because our process was all over the place. Opulion helped us build a proper deal pipeline. We've closed 40% more deals in the past 3 months.",
      author: "Marcus",
      role: "Real Estate Developer"
    },
    {
      text: "We'd been trying to raise capital but our materials were a mess. Opulion helped us raise $1.2M in our first round.",
      author: "Sarah",
      role: "Syndicator"
    },
    {
      text: "The automated systems Opulion built have saved me 15+ hours a week. My lead response time went from days to minutes.",
      author: "David",
      role: "Real Estate Investor"
    },
    {
      text: "Opulion professionalized our entire operation. Our investors take us more seriously, and our deals close faster.",
      author: "Jennifer",
      role: "Fund Manager"
    }
  ];

  const services = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Systems That Scale",
      description: "Transform chaotic operations into scalable processes that grow with you.",
      features: ["Automated deal pipelines", "Streamlined processes", "15+ hours saved weekly", "25-40% better conversion"]
    },
    {
      icon: <DollarSign className="w-8 h-8" />,
      title: "Capital Growth",
      description: "Unlock liquidity, attract investors, and secure sustainable growth funding.",
      features: ["Professional investor materials", "Network introductions", "Systematic fundraising", "$30M+ raised for clients"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Blockchain Solutions",
      description: "Future-proof your business with cutting-edge technology.",
      features: ["Smart contract automation", "Transaction cost reduction", "Tokenization opportunities", "Competitive advantages"]
    }
  ];

  const stats = [
    { number: "$50M+", label: "Deals Closed" },
    { number: "$30M+", label: "Capital Raised" },
    { number: "40%", label: "Deal Increase" },
    { number: "15+", label: "Hours Saved Weekly" }
  ];

  const NavigationItem = ({ href, children, mobile = false, onClick }) => (
    <a
      href={href}
      className={`${mobile ? 'block px-3 py-2 text-base' : 'text-sm'} font-medium text-gray-700 hover:text-blue-600 transition-colors cursor-pointer`}
      onClick={(e) => {
        e.preventDefault();
        if (onClick) {
          onClick();
        }
        if (mobile) setIsMenuOpen(false);
      }}
    >
      {children}
    </a>
  );

  const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseClasses = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 inline-flex items-center gap-2";
    const variants = {
      primary: "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:scale-105",
      secondary: "bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:shadow-md",
      ghost: "text-blue-600 hover:bg-blue-50"
    };
    
    return (
      <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
        {children}
      </button>
    );
  };

  const ServiceCard = ({ service, index }) => (
    <div className={`bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${index === 1 ? 'md:scale-105' : ''}`}>
      <div className="text-blue-600 mb-4">
        {service.icon}
      </div>
      <h3 className="text-xl font-bold mb-3 text-gray-900">{service.title}</h3>
      <p className="text-gray-600 mb-6">{service.description}</p>
      <ul className="space-y-2">
        {service.features.map((feature, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );

  const TestimonialCard = ({ testimonial, index }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">"{testimonial.text}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
          {testimonial.author[0]}
        </div>
        <div>
          <div className="font-semibold text-gray-900">{testimonial.author}</div>
          <div className="text-sm text-gray-600">{testimonial.role}</div>
        </div>
      </div>
    </div>
  );



  const ServicesPage = () => (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <button 
              onClick={() => setCurrentPage('home')}
              className="text-blue-600 hover:text-blue-800 transition-colors font-medium"
            >
              ← Back to Home
            </button>
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Complete solutions to scale your real estate business beyond the plateau
          </p>
        </div>
      </section>

      {/* Systems That Scale Service */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Systems That Scale</h2>
              </div>
              <p className="text-xl text-gray-600 mb-8">
                Stop losing deals to broken systems. Transform chaotic operations into scalable processes that eliminate bottlenecks and turn chaos into predictable growth.
              </p>
              <div className="space-y-4 mb-8">
                {[
                  "Automated deal pipelines that never let prospects slip through",
                  "Streamlined processes that save 15+ hours per week", 
                  "Lead response times that drop from days to minutes",
                  "25-40% improvement in deal conversion rates",
                  "Operations that scale with your growth, not against it"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
              <a href="https://calendly.com/opulion/fit-call" target="_blank" rel="noopener noreferrer">
                <Button className="text-lg px-8 py-4">
                  Get Systems Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Process:</h3>
                <div className="space-y-6">
                  {[
                    { step: "01", title: "Deep Audit", desc: "We get inside your business and identify every operational crack killing your momentum" },
                    { step: "02", title: "Custom Build", desc: "We design and implement scalable processes tailored to your business model" },
                    { step: "03", title: "Team Training", desc: "We work hands-on with your staff to ensure seamless adoption" },
                    { step: "04", title: "Optimization", desc: "We stay with you to refine and improve as you grow" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Capital Growth Service */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Capital Solutions Include:</h3>
                <div className="space-y-4">
                  {[
                    { title: "Funding Strategy", desc: "Custom capital raising strategies for your business model" },
                    { title: "Investor Materials", desc: "Professional presentations that get investor meetings" },
                    { title: "Investor Network", desc: "Access to qualified real estate investors and lenders" },
                    { title: "Capital Systems", desc: "Automated processes for ongoing fundraising" },
                    { title: "Alternative Funding", desc: "Creative financing beyond traditional routes" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Capital Growth</h2>
              </div>
              <p className="text-xl text-gray-600 mb-8">
                Unlock the capital your business deserves. We design capital systems that solve cash flow problems, attract investors, and bring sustainable growth funding.
              </p>
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-6 text-white mb-8">
                <h4 className="text-xl font-bold mb-2">$30M+ Raised</h4>
                <p className="opacity-90">Our clients have raised over $30M in capital through our systematic approach</p>
              </div>
              <a href="https://calendly.com/opulion/fit-call" target="_blank" rel="noopener noreferrer">
                <Button className="text-lg px-8 py-4">
                  Get Capital Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Blockchain Solutions Service */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center mb-20">
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-4xl font-bold text-gray-900">Blockchain Solutions</h2>
              </div>
              <p className="text-xl text-gray-600 mb-8">
                Future-proof your real estate business. Stay ahead with cutting-edge blockchain technology that modernizes transactions, reduces costs, and positions you for the future.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { stat: "40%", label: "Cost Reduction" },
                  { stat: "50%", label: "Faster Deals" },
                  { stat: "100%", label: "Transparency" },
                  { stat: "24/7", label: "Automated" }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{item.stat}</div>
                    <div className="text-sm text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
              <a href="https://calendly.com/opulion/fit-call" target="_blank" rel="noopener noreferrer">
                <Button className="text-lg px-8 py-4">
                  Get Blockchain Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Blockchain Benefits:</h3>
                <div className="space-y-4">
                  {[
                    { icon: <Zap className="w-5 h-5" />, title: "Smart Contracts", desc: "Automate transactions, reduce legal costs" },
                    { icon: <DollarSign className="w-5 h-5" />, title: "Tokenization", desc: "Create new investment opportunities" },
                    { icon: <Target className="w-5 h-5" />, title: "Cost Reduction", desc: "Eliminate unnecessary fees and intermediaries" },
                    { icon: <Users className="w-5 h-5" />, title: "Investor Access", desc: "Open deals to broader investor pools" }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 bg-white rounded-lg p-4">
                      <div className="text-purple-600 mt-0.5">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Transformation */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Complete Business Transformation</h2>
          <p className="text-xl opacity-90 mb-12 max-w-3xl mx-auto">
            Ready for the full transformation? We partner with ambitious real estate businesses to build systems, unlock capital, and implement technology that creates sustainable, systematic growth.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <TrendingUp className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Systems Integration</h3>
              <p className="text-sm opacity-90">Complete operational transformation</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <DollarSign className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Capital Strategy</h3>
              <p className="text-sm opacity-90">Systematic funding solutions</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <Zap className="w-8 h-8 mx-auto mb-4" />
              <h3 className="font-bold mb-2">Future Technology</h3>
              <p className="text-sm opacity-90">Blockchain implementation</p>
            </div>
          </div>

          <a href="https://calendly.com/opulion/fit-call" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" className="text-lg px-10 py-4">
              Schedule Transformation Call
              <ArrowRight className="w-5 h-5" />
            </Button>
          </a>
        </div>
      </section>
    </div>
  );

  const HomePage = () => (
    <div>
      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <div className="max-w-2xl">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Scaling Real Estate 
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
                  Beyond the Plateau
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We partner with mid-size real estate businesses to build systems, unlock capital, and fix the bottlenecks holding you back. Not consultants. Not advisors. True partners in growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                href="https://calendly.com/opulion/fit-call"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="text-lg px-8 py-4">
                  Schedule Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </Button>              </a>
                
              </div>
            </div>
            <div className="mt-12 lg:mt-0 relative">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="bg-white/20 backdrop-blur rounded-lg p-6">
                  <h3 className="text-2xl font-bold mb-4">Proven Results</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-bold">{stat.number}</div>
                        <div className="text-sm opacity-90">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              The 3 Pillars of Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every successful real estate business needs these three foundational elements working in harmony
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-4">The Numbers Speak for Themselves</h2>
            <p className="text-xl opacity-90 mb-12">Real results from real partnerships</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-6 bg-white/10 backdrop-blur rounded-xl">
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-lg opacity-90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
            <p className="text-xl text-gray-600">Real transformations from real partnerships</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Opulion */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                We're Not Consultants. We're Operators.
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                The difference? Consultants give you a report and leave. We roll up our sleeves, get inside your business, and stay until the job is done.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: <Target className="w-6 h-6" />, title: "Skin in the Game", desc: "We take equity positions in many businesses we work with" },
                  { icon: <Users className="w-6 h-6" />, title: "True Partnership", desc: "Your success is literally our success" },
                  { icon: <TrendingUp className="w-6 h-6" />, title: "Results-Driven", desc: "Fees tied to your growth, not hours billed" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="text-blue-600 mt-1">{item.icon}</div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-12 lg:mt-0">
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Who We Work Best With:</h3>
                <ul className="space-y-4">
                  {[
                    "Small & Mid-size real estate businesses",
                    "Companies that have hit a growth plateau",
                    "Ambitious owners ready to scale systematically",
                    "Teams willing to implement change",
                    "Businesses open to technology adoption"
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Scale Beyond the Plateau?</h2>
          <p className="text-xl opacity-90 mb-8">
            Your competitors are still thinking small. Still doing things the old way. Still hitting the same walls you used to hit. But you don't have to.
          </p>
          <p className="text-lg opacity-80 mb-10">
            The difference between businesses that plateau and businesses that scale is systems, capital, and the right partners.
          </p>
         <a
            href="https://calendly.com/opulion/fit-call"
            target="_blank"
            rel="noopener noreferrer"
          >
<Button variant="secondary" className="text-lg px-10 py-4">
            Schedule Your Strategy Call Today
            <ArrowRight className="w-5 h-5" />
          </Button>
          </a>
        </div>
      </section>
    </div>
  );

  // Helper function to render the current page
  const renderCurrentPage = () => {
    switch (currentPage) {
        case 'home':
            return <HomePage />;
        case 'services':
            return <ServicesPage />;
        case 'leadMagnet':
            return <PortfolioScalingLeadMagnet/>;
        default:
            return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrollY > 50 ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <button 
                onClick={() => setCurrentPage('home')}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer"
              >
                Opulion
              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <NavigationItem href="#services" onClick={() => setCurrentPage('services')}>Services</NavigationItem>
              {/* MODIFICATION: Navigation link now points to the lead magnet page */}
              <NavigationItem href="#" onClick={() => setCurrentPage('leadMagnet')}>Scale your portfolio</NavigationItem>

              <a
                href="https://calendly.com/opulion/fit-call"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  Schedule Strategy Call
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </a>
            </div>

            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <NavigationItem href="#services" mobile onClick={() => setCurrentPage('services')}>Services</NavigationItem>
              {/* MODIFICATION: Mobile navigation link now points to the lead magnet page */}
              <NavigationItem href="#" mobile onClick={() => setCurrentPage('leadMagnet')}>Scale your portfolio</NavigationItem>
              <NavigationItem href="#testimonials" mobile onClick={() => setCurrentPage('home')}>Testimonials</NavigationItem>
              <div className="px-3 py-2">
                <a
                href="https://calendly.com/opulion/fit-call"
                target="_blank"
                rel="noopener noreferrer"
              >
              <Button className="w-full justify-center">Schedule Strategy Call</Button>
              </a>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* MODIFICATION: Main Content rendering logic updated for multiple pages */}
      <main>
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-40ighbors-400 bg-clip-text text-transparent mb-4">
                Opulion
              </div>
              <p className="text-gray-400 mb-4">
                Building the Future of Real Estate Business
              </p>
              <p className="text-sm text-gray-500">
                Where real estate expertise meets systems innovation
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Services</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('services');}} className="hover:text-white transition-colors">Systems That Scale</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('services');}} className="hover:text-white transition-colors">Capital Growth</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('services');}} className="hover:text-white transition-colors">Blockchain Solutions</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('home');}} className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" onClick={(e) => {e.preventDefault(); setCurrentPage('leadMagnet');}} className="hover:text-white transition-colors">Get Blueprint</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Opulion LLC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;