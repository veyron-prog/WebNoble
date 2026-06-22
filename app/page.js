'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createClient } from '@supabase/supabase-js';
import { 
  Menu, X, ArrowRight, Phone, Mail, MapPin, 
  Code, Bot, Target, Megaphone, ChevronDown, ChevronLeft, ChevronRight,
  Star, Check, ExternalLink, MessageCircle,
  Sparkles, Zap, TrendingUp, Users, Award, Clock,
  Instagram, Twitter, Linkedin
} from 'lucide-react';

// ============= DATABASE CONNECTION =============
// ⚠️ PASTE YOUR EXACT SUPABASE URL AND KEY BELOW ⚠️
const supabaseUrl = 'https://xykqlrdaftelitrulltg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5a3FscmRhZnRlbGl0cnVsbHRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNDI5MDAsImV4cCI6MjA5NzcxODkwMH0.dzhx2CfA-JqWDSdHHX0-M-0Iq1NtfL0EtJX3ye3oEw4';

// Safely initializes Supabase
const supabase = supabaseUrl !== 'PASTE_YOUR_SUPABASE_PROJECT_URL_HERE' 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

// ============= EDITABLE CONTENT =============
const SITE_CONFIG = {
  phone: '+91 9064721352',
  phoneLink: 'tel:+919064721352',
  whatsappLink: 'https://wa.me/919064721352',
  email: 'webnoble.agency@gmail.com',
  calendlyLink: '#contact', 
  instagram: 'https://instagram.com/webnoble.agency',
  twitter: 'https://twitter.com/webnoble',
  linkedin: 'https://linkedin.com/company/webnoble',
  founderName: 'Sahil',
  founderTitle: 'AI Designer & Web Developer',
  founderLocation: 'Hooghly District, West Bengal',
  founderImage: 'https://customer-assets.emergentagent.com/job_webnoble-demo/artifacts/gomudz5v_09D6BC61-08CC-46E1-8E74-37DD9C839BE3.jpeg',
  founderBio: `Hi, I'm Sahil. Based in Hooghly district, West Bengal, I'm an AI designer and web developer. While others rely on outdated playbooks, I combine modern business strategy with cutting-edge AI and custom web development. I believe in building smart, efficient, and beautiful digital experiences. I am highly analytical, completely transparent, and fiercely dedicated to bringing massive value to the people I work with.`,
};

const SERVICES = [
  {
    icon: Code,
    title: 'Web Design & Development',
    description: 'Turn your website into a 24/7 sales machine.',
    fullDescription: 'Modern and responsive websites tailored to your needs.',
  },
  {
    icon: Bot,
    title: 'AI Agents & Automation',
    description: 'Put your business on autopilot with custom AI agents.',
    fullDescription: 'Leveraging AI to streamline and enhance your business processes.',
  },
  {
    icon: Target,
    title: 'Lead Generation',
    description: 'Fill your pipeline with qualified leads.',
    fullDescription: 'Strategies to attract and convert prospects into customers.',
  },
  {
    icon: Megaphone,
    title: 'Paid Ads Management',
    description: 'Stop wasting ad spend. Start scaling.',
    fullDescription: 'Strategic ad campaigns that deliver measurable results.',
  },
];

const PROCESS_STEPS = [
  { step: '01', title: 'Discovery & Strategy', description: 'We dive deep into your business goals and create a roadmap.' },
  { step: '02', title: 'Design & Build', description: 'Our team crafts beautiful, conversion-focused solutions.' },
  { step: '03', title: 'Launch & Optimize', description: 'We launch your project and continuously optimize for results.' },
  { step: '04', title: 'Scale', description: 'We help you scale and grow your business sustainably.' },
];

const PROJECTS = [
  { 
    id: 1, 
    title: 'SaaS Analytics Dashboard', 
    category: 'Web Design', 
    result: '+212% leads', 
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    description: 'Modern, glowing AI-powered analytics dashboard with real-time insights'
  },
  { 
    id: 2, 
    title: 'AI Customer Service Bot', 
    category: 'AI Automation', 
    result: '+188% Sales', 
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    description: 'Sleek, hyper-realistic AI chatbot handling thousands of conversations'
  },
  { 
    id: 3, 
    title: 'Enterprise Control System', 
    category: 'Lead Generation', 
    result: '+340% Leads', 
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop',
    description: 'High-tech control room with system network visualization'
  },
  { 
    id: 4, 
    title: 'Performance Marketing Suite', 
    category: 'Paid Ads', 
    result: '5.2x ROAS', 
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    description: 'Cinematic visualization of digital marketing growth and data analytics'
  },
];

const PRICING = [
  {
    name: 'Landing Page Sprint',
    price: 'Contact for Pricing',
    description: 'Perfect for startups needing a quick launch',
    features: ['Custom Landing Page', 'Mobile Responsive', 'SEO Optimized', 'Contact Form', '2 Revisions', '1 Week Delivery'],
    popular: false,
  },
  {
    name: 'Growth Website + AI',
    price: 'Contact for Pricing',
    description: 'Complete digital presence with AI integration',
    features: ['5-7 Page Website', 'AI Chatbot Integration', 'Lead Capture System', 'Analytics Dashboard', 'Unlimited Revisions', '2-3 Weeks Delivery', 'Priority Support'],
    popular: true,
  },
  {
    name: 'Scale Partner',
    price: 'Contact for Pricing',
    description: 'Ongoing partnership for continuous growth',
    features: ['Everything in Growth', 'Monthly Strategy Calls', 'Paid Ads Management', 'Continuous Optimization', 'Dedicated Account Manager', '24/7 Support', 'Custom Integrations'],
    popular: false,
  },
];

const FAQS = [
  { 
    question: 'How long does a typical project take?', 
    answer: 'Most of our standard projects are completed within a swift 5 to 7 days.' 
  },
  { 
    question: 'What is your pricing structure?', 
    answer: 'Every business is unique, so we prefer to discuss your specific needs on a quick chat to give you an accurate and fair quote.' 
  },
  { 
    question: 'Do you offer ongoing support?', 
    answer: 'Yes, absolutely. We provide dedicated ongoing support to ensure everything runs flawlessly.' 
  },
  { 
    question: 'Can you work with my existing website?', 
    answer: 'Of course we can. We can seamlessly integrate our custom solutions into your current setup or revamp it entirely to increase conversions.' 
  },
  { 
    question: 'What AI solutions do you offer?', 
    answer: 'We specialize in high-converting Web Design, AI Automation, Lead Generation, and Paid Ads.' 
  },
];

// ============= COMPONENTS =============

const Logo = ({ className = '' }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4L6 12V28L20 36L34 28V12L20 4Z" stroke="#7C5CFF" strokeWidth="2" fill="none"/>
      <path d="M20 8L10 14V26L20 32L30 26V14L20 8Z" fill="#7C5CFF" fillOpacity="0.3"/>
      <path d="M20 12L14 16V24L20 28L26 24V16L20 12Z" fill="#7C5CFF"/>
      <path d="M16 6L20 4L24 6" stroke="#7C5CFF" strokeWidth="2" strokeLinecap="round"/>
      <path d="M14 7L20 4L26 7" stroke="#7C5CFF" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
    <span className="text-2xl font-bold">
      <span className="text-white">Web</span>
      <span className="text-[#7C5CFF]">Noble</span>
    </span>
  </div>
);

const Crystal3D = ({ size = 'large' }) => {
  const sizeClasses = size === 'large' ? 'w-64 h-64 md:w-80 md:h-80' : 'w-16 h-16';
  
  return (
    <div className={`crystal-container ${sizeClasses} relative`}>
      <div className="crystal absolute inset-0">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <linearGradient id="crystalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.9"/>
              <stop offset="50%" stopColor="#5B3FD9" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#9D7FFF" stopOpacity="0.7"/>
            </linearGradient>
            <linearGradient id="crystalHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4"/>
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0"/>
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <polygon points="100,10 160,60 140,150 60,150 40,60" fill="url(#crystalGradient)" filter="url(#glow)"/>
          <polygon points="100,10 160,60 100,80" fill="#9D7FFF" fillOpacity="0.6"/>
          <polygon points="100,10 40,60 100,80" fill="#5B3FD9" fillOpacity="0.8"/>
          <polygon points="160,60 140,150 100,80" fill="#7C5CFF" fillOpacity="0.7"/>
          <polygon points="40,60 60,150 100,80" fill="#4C3AAA" fillOpacity="0.9"/>
          <polygon points="100,80 140,150 60,150" fill="#6B4FDD" fillOpacity="0.8"/>
          <polygon points="100,10 130,45 100,60 70,45" fill="url(#crystalHighlight)"/>
          <polygon points="60,150 100,190 140,150" fill="url(#crystalGradient)" filter="url(#glow)"/>
          <polygon points="60,150 100,190 100,150" fill="#5B3FD9" fillOpacity="0.9"/>
          <polygon points="140,150 100,190 100,150" fill="#9D7FFF" fillOpacity="0.7"/>
        </svg>
      </div>
      <div className="absolute inset-0 bg-[#7C5CFF] opacity-20 blur-3xl rounded-full"></div>
    </div>
  );
};

const GlassyCard = ({ children, className = '', hover = true, onClick }) => (
  <div 
    onClick={onClick}
    className={`
    glassy-card rounded-2xl p-6 transition-all duration-300
    ${hover ? 'hover:border-[#7C5CFF]/50 hover:-translate-y-1' : ''}
    ${className}
  `}>
    {children}
  </div>
);

const ServiceIcon = ({ icon: Icon }) => (
  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#7C5CFF]/20 to-[#7C5CFF]/5 flex items-center justify-center icon-3d border border-[#7C5CFF]/30">
    <Icon className="w-7 h-7 text-[#7C5CFF]" />
  </div>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Work', href: '#work' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#about' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'navbar-shrunk py-3' : 'py-5 bg-transparent'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo />
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-gray-300 hover:text-white transition-colors">
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <a 
            href="https://wa.me/919064721352?text=Hi%20Sahil,%20I%20am%20interested%20in%20your%20services!" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#7C5CFF] hover:bg-[#6B4FDD] rounded-full text-white font-medium transition-all hover:shadow-lg hover:shadow-[#7C5CFF]/30"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
        </div>

        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 top-16 bg-[#0A0A0A] z-40 md:hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-xl text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="https://wa.me/919064721352?text=Hi%20Sahil,%20I%20am%20interested%20in%20your%20services!" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#7C5CFF] hover:bg-[#6B4FDD] rounded-full text-white font-medium text-center transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const HeroSection = () => (
  <section className="min-h-screen pt-32 pb-20 relative overflow-hidden">
    <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#7C5CFF] opacity-10 blur-[100px] rounded-full"></div>
    
    <div className="container mx-auto px-4">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C5CFF]/10 border border-[#7C5CFF]/30 text-[#7C5CFF] text-sm mb-6">
            <Sparkles size={16} />
            Strategy-led digital studio
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            We help businesses make more revenue — <span className="text-[#7C5CFF]">with websites, AI agents, and ads that convert.</span>
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-xl">
            We design and develop digital solutions that drive traffic and increase sales.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://wa.me/919064721352?text=Hi%20Sahil,%20I%20am%20interested%20in%20your%20services!" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#7C5CFF] hover:bg-[#6B4FDD] rounded-full text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-[#7C5CFF]/30 text-center"
            >
              <MessageCircle size={20} />
              Chat on WhatsApp
            </a>
            <a 
              href="#work" 
              className="px-8 py-4 border border-gray-600 hover:border-gray-400 rounded-full text-white font-semibold text-lg transition-all text-center"
            >
              View My Work
            </a>
          </div>
        </div>
        
        <div className="flex justify-center lg:justify-end fade-up-delay-2">
          <Crystal3D size="large" />
        </div>
      </div>
    </div>
  </section>
);

const ServicesSection = () => (
  <section id="services" className="py-20 relative">
    <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#7C5CFF] opacity-5 blur-[80px] rounded-full"></div>
    
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-[#7C5CFF] text-lg font-semibold mb-4">Services</h2>
        <h3 className="text-3xl md:text-4xl font-bold">WebNoble</h3>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {SERVICES.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <GlassyCard className="h-full">
              <div className="flex items-start gap-4">
                <ServiceIcon icon={service.icon} />
                <div>
                  <h4 className="text-xl font-semibold mb-2">{service.title}</h4>
                  <p className="text-gray-400">{service.fullDescription}</p>
                </div>
              </div>
            </GlassyCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ProcessSection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-[#7C5CFF] text-lg font-semibold mb-4">Our Process</h2>
        <h3 className="text-3xl md:text-4xl font-bold">How We Work</h3>
      </div>
      
      <div className="grid md:grid-cols-4 gap-8">
        {PROCESS_STEPS.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="text-5xl font-bold text-[#7C5CFF]/20 mb-4">{step.step}</div>
            <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
            <p className="text-gray-400">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const WorkSection = () => (
  <section id="work" className="py-20 relative overflow-hidden">
    <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#7C5CFF] opacity-5 blur-[120px] rounded-full"></div>
    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#7C5CFF] opacity-5 blur-[100px] rounded-full"></div>
    
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-[#7C5CFF] text-lg font-semibold mb-4">Portfolio</h2>
        <h3 className="text-3xl md:text-4xl font-bold">Selected Work</h3>
        <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
          Real results for real businesses. Here's a glimpse of what we've built.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
          >
            <div className="relative overflow-hidden rounded-2xl mb-5">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent z-10 opacity-60"></div>
              <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A] via-transparent to-transparent z-10 opacity-30"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-transparent to-[#0A0A0A] z-10 opacity-20"></div>
              
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-56 object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-90 filter brightness-90"
              />
              
              <div className="absolute top-4 left-4 z-20">
                <span className="px-4 py-1.5 bg-[#7C5CFF]/90 backdrop-blur-sm rounded-full text-sm font-medium">
                  {project.category}
                </span>
              </div>
              
              <div className="absolute bottom-4 right-4 z-20">
                <span className="px-4 py-2 bg-[#0A0A0A]/80 backdrop-blur-sm rounded-xl text-[#7C5CFF] font-bold text-lg border border-[#7C5CFF]/30">
                  {project.result}
                </span>
              </div>
            </div>
            
            <div className="px-1">
              <h4 className="text-xl font-semibold mb-2 group-hover:text-[#7C5CFF] transition-colors">
                {project.title}
              </h4>
              <p className="text-gray-400 text-sm">{project.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const StatsSection = () => (
  <section className="py-20 bg-gradient-to-r from-[#7C5CFF]/10 via-transparent to-[#7C5CFF]/10">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          We could put fake stats here like everyone else... <span className="inline-block">📉</span>
        </h2>
        <p className="text-xl text-gray-300 leading-relaxed mb-8">
          ...But we'd rather just be completely honest. <span className="text-[#7C5CFF] font-semibold">We are a brand-new agency.</span> We don't have 150+ clients yet. But what we DO have is <span className="text-white font-semibold">100% of our time, intellect, and hustle</span> to dedicate to YOU.
        </p>
        <div className="bg-[#111114] border border-[#7C5CFF]/30 rounded-2xl p-8">
          <p className="text-lg text-gray-300 mb-6">
            Be our very first client, let us prove our worth, and in exchange, you get our premium web and AI services at a <span className="text-[#7C5CFF] font-bold">massive "first-in-line" discount.</span>
          </p>
          <a 
            href="#contact" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#7C5CFF] hover:bg-[#6B4FDD] rounded-full text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-[#7C5CFF]/30"
          >
            Claim Your Discount
            <ArrowRight size={20} />
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

// ============= THE AUTOMATED DATABASE REVIEWS =============
const TestimonialsSection = () => {
  const [reviewData, setReviewData] = useState({ name: '', company: '', message: '' });
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(5);
  const [submittedReview, setSubmittedReview] = useState(false);
  
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch reviews from Supabase
  useEffect(() => {
    const fetchReviews = async () => {
      if (!supabase) return;
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data && data.length > 0) {
        setReviews(data);
      }
    };
    fetchReviews();
  }, [submittedReview]);

  // Automated Carousel (Resets if currentIndex changes manually)
  useEffect(() => {
    if (reviews.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 5000); 
    return () => clearInterval(timer);
  }, [reviews.length, currentIndex]); // <--- Adding currentIndex here resets timer on manual click!

  // Navigation Functions
  const nextReview = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    if (reviews.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    
    const newReview = {
      name: reviewData.name || 'Anonymous',
      company: reviewData.company || '',
      message: reviewData.message || '',
      rating: selectedStar
    };

    if (supabase) {
      const { data, error } = await supabase
        .from('reviews')
        .insert([newReview])
        .select();

      if (!error) {
        setSubmittedReview(true);
      } else {
        alert("Make sure you disabled RLS in Supabase!");
      }
    } else {
      setSubmittedReview(true);
      setReviews([newReview, ...reviews]);
      setCurrentIndex(0);
    }
  };

  const currentDisplayReview = reviews.length > 0 ? reviews[currentIndex] : null;

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-4">
              Real feedback from the businesses we help grow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            <div className="bg-gradient-to-br from-[#7C5CFF]/10 to-transparent border border-[#7C5CFF]/30 rounded-2xl p-8 md:p-10 h-full flex flex-col relative overflow-hidden min-h-[400px]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C5CFF] opacity-10 blur-2xl rounded-full"></div>
              
              <AnimatePresence mode="wait">
                {currentDisplayReview ? (
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex justify-start gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-8 h-8 ${star <= currentDisplayReview.rating ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-gray-700'}`} 
                          fill="currentColor" 
                        />
                      ))}
                    </div>

                    <p className="text-2xl font-medium italic mb-8 text-white">
                      "{currentDisplayReview.message}"
                    </p>
                    
                    <div className="mt-auto pt-6 border-t border-gray-800 flex justify-between items-end">
                      <div>
                        <p className="font-bold text-white text-lg">{currentDisplayReview.name}</p>
                        <p className="text-[#7C5CFF]">{currentDisplayReview.company}</p>
                      </div>
                      
                      {/* MANUAL ARROW CONTROLS */}
                      {reviews.length > 1 && (
                        <div className="flex gap-2">
                          <button 
                            onClick={prevReview} 
                            className="p-2 rounded-full bg-[#111114] border border-[#7C5CFF]/30 text-white hover:bg-[#7C5CFF] transition-all"
                            aria-label="Previous Review"
                          >
                            <ChevronLeft size={18} />
                          </button>
                          <button 
                            onClick={nextReview} 
                            className="p-2 rounded-full bg-[#111114] border border-[#7C5CFF]/30 text-white hover:bg-[#7C5CFF] transition-all"
                            aria-label="Next Review"
                          >
                            <ChevronRight size={18} />
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full justify-center text-center">
                    <div className="flex justify-center gap-1 mb-6">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-8 h-8 text-gray-700" fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-2xl font-medium italic mb-6 text-gray-500">
                      "Your glowing, 5-star success story goes right here."
                    </p>
                    <div className="mt-auto pt-6 border-t border-gray-800">
                      <p className="font-bold text-white text-lg">Your Name</p>
                      <p className="text-[#7C5CFF]">Your Awesome Company</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <GlassyCard className="relative h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {!submittedReview ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-2xl font-bold mb-2">Leave a Review</h3>
                    <p className="text-gray-400 text-sm mb-6">Already worked with us? Drop your honest feedback below.</p>
                    
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Rate our service</label>
                        <div className="flex gap-2 cursor-pointer">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-8 h-8 transition-colors duration-200 ${
                                star <= (hoveredStar || selectedStar) 
                                  ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' 
                                  : 'text-gray-600'
                              }`}
                              fill={star <= (hoveredStar || selectedStar) ? 'currentColor' : 'none'}
                              onMouseEnter={() => setHoveredStar(star)}
                              onMouseLeave={() => setHoveredStar(0)}
                              onClick={() => setSelectedStar(star)}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          placeholder="Your Name"
                          required
                          value={reviewData.name}
                          onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                          className="w-full px-4 py-3 bg-[#111114] border border-[#7C5CFF]/20 rounded-xl focus:border-[#7C5CFF] focus:outline-none transition-colors"
                        />
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={reviewData.company}
                          onChange={(e) => setReviewData({ ...reviewData, company: e.target.value })}
                          className="w-full px-4 py-3 bg-[#111114] border border-[#7C5CFF]/20 rounded-xl focus:border-[#7C5CFF] focus:outline-none transition-colors"
                        />
                      </div>
                      
                      <textarea
                        placeholder="Tell us about your experience..."
                        required
                        rows="4"
                        value={reviewData.message}
                        onChange={(e) => setReviewData({ ...reviewData, message: e.target.value })}
                        className="w-full px-4 py-3 bg-[#111114] border border-[#7C5CFF]/20 rounded-xl focus:border-[#7C5CFF] focus:outline-none transition-colors resize-none"
                      ></textarea>

                      <button
                        type="submit"
                        className="w-full py-4 bg-[#7C5CFF] hover:bg-[#6B4FDD] rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-white"
                      >
                        <MessageCircle className="w-5 h-5" />
                        Post Review
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Review Posted!</h3>
                    <p className="text-gray-400">Thank you for your feedback. You are officially our VIP!</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassyCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const PricingSection = () => (
  <section id="pricing" className="py-20">
    <div className="container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-[#7C5CFF] text-lg font-semibold mb-4">Pricing</h2>
        <h3 className="text-3xl md:text-4xl font-bold">Simple, Transparent Pricing</h3>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {PRICING.map((plan, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className={plan.popular ? 'relative mt-6' : ''}
          >
            {plan.popular && (
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-[#7C5CFF] rounded-full text-sm font-semibold whitespace-nowrap z-10 shadow-lg shadow-[#7C5CFF]/30">
                MOST POPULAR
              </div>
            )}
            <GlassyCard className={`h-full flex flex-col ${plan.popular ? 'border-[#7C5CFF] pt-4' : ''}`}>
              <h4 className="text-xl font-semibold mb-2">{plan.name}</h4>
              <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
              <div className="text-2xl font-bold text-[#7C5CFF] mb-6">{plan.price}</div>
              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-gray-300">
                    <Check className="w-5 h-5 text-[#7C5CFF]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a 
                href="#contact" 
                className={`w-full py-3 rounded-full font-semibold text-center transition-all ${
                  plan.popular 
                    ? 'bg-[#7C5CFF] hover:bg-[#6B4FDD] text-white' 
                    : 'border border-[#7C5CFF] text-[#7C5CFF] hover:bg-[#7C5CFF]/10'
                }`}
              >
                Get Started
              </a>
            </GlassyCard>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const AboutSection = () => (
  <section id="about" className="py-20 relative overflow-hidden">
    <div className="absolute top-1/3 right-0 w-80 h-80 bg-[#7C5CFF] opacity-5 blur-[100px] rounded-full"></div>
    
    <div className="container mx-auto px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[#7C5CFF] text-lg font-semibold mb-4">About</h2>
          <h3 className="text-3xl md:text-4xl font-bold">Meet the Founder</h3>
        </div>
        
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-2 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7C5CFF] via-white to-[#7C5CFF] rounded-full opacity-75 blur-sm animate-pulse"></div>
              <div className="absolute -inset-1 bg-gradient-to-r from-[#7C5CFF] via-white to-[#7C5CFF] rounded-full"></div>
              <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-[#0A0A0A]">
                <img 
                  src={SITE_CONFIG.founderImage}
                  alt={SITE_CONFIG.founderName}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <div className="mb-6">
              <h4 className="text-3xl font-bold text-white">{SITE_CONFIG.founderName}</h4>
              <p className="text-[#7C5CFF] font-medium text-lg">{SITE_CONFIG.founderTitle}</p>
              <p className="text-gray-500 text-sm mt-1">{SITE_CONFIG.founderLocation}</p>
            </div>
            
            <p className="text-gray-300 leading-relaxed text-lg">
              {SITE_CONFIG.founderBio}
            </p>
            
            <div className="mt-8 flex items-center gap-4">
              <a 
                href={SITE_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#111114] border border-[#7C5CFF]/30 flex items-center justify-center hover:bg-[#7C5CFF]/20 hover:border-[#7C5CFF] transition-all"
              >
                <Instagram className="w-5 h-5 text-[#7C5CFF]" />
              </a>
              <a 
                href={SITE_CONFIG.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#111114] border border-[#7C5CFF]/30 flex items-center justify-center hover:bg-[#7C5CFF]/20 hover:border-[#7C5CFF] transition-all"
              >
                <Linkedin className="w-5 h-5 text-[#7C5CFF]" />
              </a>
              <a 
                href={SITE_CONFIG.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#111114] border border-[#7C5CFF]/30 flex items-center justify-center hover:bg-[#7C5CFF]/20 hover:border-[#7C5CFF] transition-all"
              >
                <Twitter className="w-5 h-5 text-[#7C5CFF]" />
              </a>
              <a 
                href={SITE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center hover:bg-green-500/30 hover:border-green-500 transition-all"
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#7C5CFF] text-lg font-semibold mb-4">FAQ</h2>
          <h3 className="text-3xl md:text-4xl font-bold">Frequently Asked Questions</h3>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQS.map((faq, index) => (
            <GlassyCard key={index} hover={false} className="cursor-pointer" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
              <div className="flex justify-between items-center">
                <h4 className="font-semibold pr-4">{faq.question}</h4>
                <ChevronDown className={`w-5 h-5 text-[#7C5CFF] transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-400 mt-4">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </GlassyCard>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    business: '',
  });

  const handleWhatsAppRedirect = (e) => {
    e.preventDefault();
    const name = encodeURIComponent(formData.name || 'there');
    const business = encodeURIComponent(formData.business || 'my business');
    const whatsappUrl = `https://wa.me/919064721352?text=Hi%20Sahil,%20my%20name%20is%20${name}%20from%20${business}.%20I%20am%20interested%20in%20your%20services!`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-[#7C5CFF] text-lg font-semibold mb-4">Contact</h2>
          <h3 className="text-3xl md:text-4xl font-bold">Let's Work Together</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <GlassyCard>
              <form onSubmit={handleWhatsAppRedirect} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name *"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#111114] border border-[#7C5CFF]/20 rounded-xl focus:border-[#7C5CFF] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#111114] border border-[#7C5CFF]/20 rounded-xl focus:border-[#7C5CFF] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Your Business *"
                    required
                    value={formData.business}
                    onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                    className="w-full px-4 py-3 bg-[#111114] border border-[#7C5CFF]/20 rounded-xl focus:border-[#7C5CFF] focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-green-500 hover:bg-green-600 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send Message via WhatsApp
                </button>
                <p className="text-gray-500 text-sm text-center">
                  Clicking will open WhatsApp with your details pre-filled
                </p>
              </form>
            </GlassyCard>
          </div>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-semibold mb-4">Get in Touch</h4>
              <p className="text-gray-400 mb-6">
                Ready to transform your digital presence? Let's discuss how we can help you grow.
              </p>
            </div>
            
            <div className="space-y-4">
              <a 
                href={SITE_CONFIG.phoneLink}
                className="flex items-center gap-4 p-4 bg-[#111114] rounded-xl border border-[#7C5CFF]/20 hover:border-[#7C5CFF]/50 transition-colors"
              >
                <div className="w-12 h-12 bg-[#7C5CFF]/20 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#7C5CFF]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Call us</p>
                  <p className="font-semibold">{SITE_CONFIG.phone}</p>
                </div>
              </a>
              
              <a 
                href={SITE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-[#111114] rounded-xl border border-green-500/30 hover:border-green-500/50 transition-colors"
              >
                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">WhatsApp</p>
                  <p className="font-semibold">Chat with us directly</p>
                </div>
              </a>
              
              <a 
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-4 p-4 bg-[#111114] rounded-xl border border-[#7C5CFF]/20 hover:border-[#7C5CFF]/50 transition-colors"
              >
                <div className="w-12 h-12 bg-[#7C5CFF]/20 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#7C5CFF]" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email us</p>
                  <p className="font-semibold">{SITE_CONFIG.email}</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="py-20">
    <div className="container mx-auto px-4">
      <GlassyCard className="text-center py-12 md:py-16 bg-gradient-to-r from-[#7C5CFF]/20 to-transparent">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's turn your traffic into revenue.</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Ready to start? Call us directly at <span className="text-white font-semibold">+91 9064721352</span> or message us on WhatsApp. 
          For international clients, we can set up a Zoom meeting at your convenience.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="tel:+919064721352" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#7C5CFF] hover:bg-[#6B4FDD] rounded-full text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-[#7C5CFF]/30"
          >
            <Phone size={20} />
            Call Now
          </a>
          <a 
            href="https://wa.me/919064721352?text=Hi%20Sahil,%20I%20would%20like%20to%20schedule%20a%20call%20to%20discuss%20my%20project!" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 rounded-full text-white font-semibold text-lg transition-all hover:shadow-lg hover:shadow-green-500/30"
          >
            <MessageCircle size={20} />
            WhatsApp (International)
          </a>
        </div>
      </GlassyCard>
    </div>
  </section>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setSubscribed(true);
        setEmail('');
      }
    } catch (error) {
      console.error('Newsletter error:', error);
    }
  };

  return (
    <footer className="py-16 border-t border-[#7C5CFF]/20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <Logo className="mb-4" />
            <p className="text-gray-400 mb-4">
              Strategy-led digital studio helping businesses make more revenue.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#services" className="hover:text-white transition-colors">Web Design</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">AI Automation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Lead Generation</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Paid Ads</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#work" className="hover:text-white transition-colors">Work</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            {subscribed ? (
              <p className="text-[#7C5CFF]">Thanks for subscribing!</p>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-2 bg-[#111114] border border-[#7C5CFF]/20 rounded-lg focus:border-[#7C5CFF] focus:outline-none"
                />
                <button type="submit" className="px-4 py-2 bg-[#7C5CFF] rounded-lg hover:bg-[#6B4FDD] transition-colors">
                  <ArrowRight size={20} />
                </button>
              </form>
            )}
            
            <div className="mt-6">
              <p className="text-gray-400 text-sm mb-2">Contact</p>
              <p className="text-white">{SITE_CONFIG.phone}</p>
              <p className="text-white">{SITE_CONFIG.email}</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#7C5CFF]/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <a 
              href={SITE_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#111114] border border-[#7C5CFF]/30 flex items-center justify-center hover:bg-[#7C5CFF] hover:border-[#7C5CFF] transition-all group"
            >
              <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
            </a>
            <a 
              href={SITE_CONFIG.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#111114] border border-[#7C5CFF]/30 flex items-center justify-center hover:bg-[#7C5CFF] hover:border-[#7C5CFF] transition-all group"
            >
              <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
            </a>
            <a 
              href={SITE_CONFIG.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#111114] border border-[#7C5CFF]/30 flex items-center justify-center hover:bg-[#7C5CFF] hover:border-[#7C5CFF] transition-all group"
            >
              <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
            </a>
            <a 
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#111114] border border-green-500/30 flex items-center justify-center hover:bg-green-500 hover:border-green-500 transition-all group"
            >
              <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-white" />
            </a>
            <a 
              href={`mailto:${SITE_CONFIG.email}`}
              className="w-10 h-10 rounded-full bg-[#111114] border border-[#7C5CFF]/30 flex items-center justify-center hover:bg-[#7C5CFF] hover:border-[#7C5CFF] transition-all group"
            >
              <Mail className="w-5 h-5 text-gray-400 group-hover:text-white" />
            </a>
          </div>
          
          <p className="text-gray-400">&copy; {new Date().getFullYear()} WebNoble. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <main className="min-h-screen bg-[#0A0A0A]">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <WorkSection />
      <StatsSection />
      <TestimonialsSection />
      <PricingSection />
      <AboutSection />
      <FAQSection />
      <ContactSection />
      <CTASection />
      <Footer />
      
      <a
        href={SITE_CONFIG.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-green-500/50 transition-all z-50 hover:scale-110"
      >
        <MessageCircle className="w-7 h-7 text-white" />
      </a>
    </main>
  );
}