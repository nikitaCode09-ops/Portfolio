import "./App.css";
import React, { useState, useEffect, useRef } from 'react';
import { 
  Code, 
  Database, 
  Server, 
  Layout, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Menu, 
  X, 
  Award, 
  BookOpen, 
  Cpu, 
  CheckCircle,
  FlaskConical,
  ShoppingBag,
  Brain,
  GraduationCap,
  ArrowRight
} from 'lucide-react';

const IntroScreen = ({ onEnter }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isRevealed, setIsRevealed] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Set initial position to center for mobile/default look
    if (typeof window !== 'undefined') {
        setMousePos({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }

    // Auto-reveal the name after 3 seconds
    const timer = setTimeout(() => {
      setIsRevealed(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleTouchMove = (e) => {
    setMousePos({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  };

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[60] bg-slate-950 flex flex-col items-center justify-center cursor-crosshair overflow-hidden touch-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={onEnter}
    >
      {/* Background Layer (Dimmed) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-slate-900 tracking-tighter select-none text-center px-4 leading-tight">
            NIKITA<br/>CHOUDHARY
         </h1>
      </div>

      {/* Flashlight Layer (Interactive) */}
      <div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none bg-slate-950 transition-opacity duration-1000"
        style={{
          maskImage: `radial-gradient(circle min(200px, 30vw) at ${mousePos.x}px ${mousePos.y}px, black 10%, transparent 90%)`,
          WebkitMaskImage: `radial-gradient(circle min(200px, 30vw) at ${mousePos.x}px ${mousePos.y}px, black 10%, transparent 90%)`,
          opacity: isRevealed ? 0 : 1
        }}
      >
         <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-teal-400 tracking-tighter select-none text-center px-4 drop-shadow-[0_0_15px_rgba(45,212,191,0.5)] leading-tight">
            NIKITA<br/>CHOUDHARY
         </h1>
      </div>

      {/* Animated Shapes Layer (Bursts on Reveal) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
         {/* Teal Orb - Top Left */}
         <div 
           className={`absolute w-32 h-32 md:w-64 md:h-64 bg-teal-500/20 rounded-full blur-2xl md:blur-3xl transition-all duration-[2000ms] ease-out transform
             ${isRevealed ? '-translate-x-24 -translate-y-24 md:-translate-x-48 md:-translate-y-32 scale-150 opacity-100' : 'scale-0 opacity-0'}`}
         />
         {/* Purple Orb - Bottom Right */}
         <div 
           className={`absolute w-40 h-40 md:w-72 md:h-72 bg-purple-500/20 rounded-full blur-2xl md:blur-3xl transition-all duration-[2000ms] ease-out delay-100 transform
             ${isRevealed ? 'translate-x-24 translate-y-32 md:translate-x-56 md:translate-y-40 scale-150 opacity-100' : 'scale-0 opacity-0'}`}
         />
         {/* Rotating Ring */}
          <div 
           className={`absolute w-[18rem] h-[18rem] sm:w-[25rem] sm:h-[25rem] md:w-[40rem] md:h-[40rem] border border-slate-700/50 rounded-full transition-all duration-[3000ms] ease-out transform
             ${isRevealed ? 'scale-100 opacity-100 rotate-180' : 'scale-50 opacity-0 rotate-0'}`}
         />
      </div>

      {/* Fully Revealed Layer (Auto-Show) */}
      <div 
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-[2000ms] ease-in-out ${isRevealed ? 'opacity-100' : 'opacity-0'}`}
      >
         <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-teal-400 tracking-tighter select-none text-center px-4 drop-shadow-[0_0_25px_rgba(45,212,191,0.3)] leading-tight">
            NIKITA<br/>CHOUDHARY
         </h1>
      </div>
      
      {/* Instructions */}
      <div className="absolute bottom-10 animate-bounce text-slate-500 flex flex-col items-center gap-2 pointer-events-none">
        <p className="text-xs md:text-sm uppercase tracking-widest transition-all duration-500 text-center px-4">
          {isRevealed ? "Welcome" : "Move cursor/finger to explore"}
        </p>
        <div className="flex items-center gap-2 text-teal-500 font-semibold cursor-pointer pointer-events-auto" onClick={onEnter}>
          <span>Click to Enter</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const projects = [
    {
      title: "MediStore",
      subtitle: "Medicine Ordering & AI Chatbot",
      description: "A full-stack medicine ordering platform designed to simplify healthcare access. It features a robust database design and an integrated AI assistant.",
      icon: <ShoppingBag className="w-8 h-8 text-teal-600" />,
      features: [
        "User & Admin Login w/ Order History",
        "Payment Gateway (UPI & COD)",
        "AI Chatbot for Medicine/Ayurveda Reccomendations",
        "Comprehensive DB for Users, Meds & Transactions"
      ],
      techStack: ["HTML", "CSS", "JavaScript", "Node.js", "API Integration"],
    },
    {
      title: "LabXplore",
      subtitle: "Lab Report Explainer Chatbot",
      description: "An educational tool focused on enhancing conceptual clarity. This AI-driven chatbot takes complex lab reports and generates easy-to-understand explanations.",
      icon: <FlaskConical className="w-8 h-8 text-teal-600" />,
      features: [
        "Secure Activation via API Key",
        "Structured Explanation Generation",
        "Focus on Self-learning & Clarity",
        "Lab Report Input Parsing"
      ],
      techStack: ["HTML", "CSS", "JavaScript", "API Integration"],
    }
  ];

  const techSkills = [
    { name: "Python Programming", icon: <Code size={20} /> },
    { name: "HTML & CSS", icon: <Layout size={20} /> },
    { name: "JavaScript", icon: <Code size={20} /> },
    { name: "Database Management", icon: <Database size={20} /> },
    { name: "API Integration", icon: <Server size={20} /> },
  ];

  const strengths = [
    { name: "Problem Solving", icon: <Brain size={20} /> },
    { name: "Lifelong Learner", icon: <BookOpen size={20} /> },
    { name: "Time Management", icon: <CheckCircle size={20} /> },
    { name: "Adaptability", icon: <Cpu size={20} /> },
  ];

  return (
    // overflow-x-hidden prevents mobile horizontal scrolling issues
    <div className="min-h-screen bg-slate-50 text-slate-600 font-sans selection:bg-teal-100 selection:text-teal-800 overflow-x-hidden">
      
      {/* Intro Overlay */}
      {showIntro && (
        <IntroScreen onEnter={() => setShowIntro(false)} />
      )}

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="flex-shrink-0 font-bold text-2xl md:text-3xl text-teal-600 tracking-tighter cursor-pointer" onClick={() => scrollToSection('hero')}>
              Nikita<span className="text-slate-800">.Dev</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-6 lg:space-x-8">
                {['About', 'Projects', 'Skills', 'Education', 'Certificates', 'Contact'].map((item) => (
                  <button 
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="hover:text-teal-600 text-slate-600 px-3 py-2 rounded-md text-sm lg:text-base font-medium transition-colors"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 hover:text-teal-600 p-2">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden absolute w-full bg-white border-b border-slate-200 shadow-xl transition-all duration-300 origin-top ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
          <div className="px-4 pt-2 pb-6 space-y-2 sm:px-6">
            {['About', 'Projects', 'Skills', 'Education', 'Certificates', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-slate-600 hover:text-teal-600 block w-full text-left px-4 py-3 rounded-lg text-lg font-medium hover:bg-slate-50 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pt-56 lg:pb-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center lg:text-left flex flex-col items-center lg:items-start">
            <h2 className="text-teal-600 font-bold tracking-wide uppercase text-xs sm:text-sm mb-4 sm:mb-6 bg-teal-50 inline-block px-4 py-1.5 rounded-full border border-teal-100">
              Aspiring Web Developer
            </h2>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              Nikita <br className="block sm:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                Choudhary
              </span>
            </h1>
            <p className="mt-2 sm:mt-4 text-lg sm:text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
              Motivated IT student with a strong passion for Web Development and EdTech. 
              Turning complex problems into elegant, user-friendly digital solutions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-6 w-full sm:w-auto px-4 sm:px-0">
              <button onClick={() => scrollToSection('projects')} className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-teal-600 text-white font-bold hover:bg-teal-700 transition-transform hover:-translate-y-1 shadow-lg shadow-teal-500/20 text-lg">
                View Projects
              </button>
              <button onClick={() => scrollToSection('contact')} className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full border-2 border-slate-200 text-slate-700 hover:border-teal-600 hover:text-teal-600 transition-colors bg-white text-lg font-semibold">
                Contact Me
              </button>
            </div>
          </div>
        </div>
        
        {/* Decorative Background Elements */}
        <div className="absolute top-20 right-0 -z-10 opacity-30 transform translate-x-1/3 sm:translate-x-1/4">
          <div className="w-64 h-64 sm:w-96 sm:h-96 bg-teal-200 rounded-full blur-[80px] sm:blur-[100px]"></div>
        </div>
        <div className="absolute bottom-10 left-0 -z-10 opacity-30 transform -translate-x-1/3 sm:-translate-x-1/4">
          <div className="w-48 h-48 sm:w-72 sm:h-72 bg-blue-200 rounded-full blur-[60px] sm:blur-[100px]"></div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 sm:mb-10">About Me</h2>
          <div className="bg-slate-50 p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-100 transition-all hover:shadow-md">
            <p className="text-base sm:text-lg md:text-xl leading-relaxed sm:leading-loose text-slate-700">
              I am a motivated <span className="text-teal-600 font-semibold">IT student</span> with a strong interest in learning and applying new technologies. 
              As a lifelong learner, I have gained hands-on experience through academic projects like <span className="text-slate-900 font-medium italic">LabXplore</span> and <span className="text-slate-900 font-medium italic">Medistore</span>. 
              I possess strong problem-solving skills and have a keen interest in <span className="text-teal-600">Educational Technology</span>, aiming to build tools that make learning and healthcare more accessible.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-10 sm:mb-14 flex items-center justify-center lg:justify-start gap-3">
            <Code className="text-teal-600 w-8 h-8 sm:w-10 sm:h-10" /> Featured Projects
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {projects.map((project, index) => (
              <div key={index} className="group bg-white rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-teal-900/5 transition-all duration-300 border border-slate-200 hover:border-teal-400 flex flex-col h-full">
                <div className="p-6 sm:p-8 flex-grow">
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 sm:p-4 bg-teal-50 rounded-xl border border-teal-100">
                      {project.icon}
                    </div>
                    <ExternalLink className="text-slate-400 group-hover:text-teal-600 transition-colors w-6 h-6" />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">{project.title}</h3>
                  <p className="text-teal-600 font-medium text-sm sm:text-base mb-4">{project.subtitle}</p>
                  <p className="text-slate-600 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">{project.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {project.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-600">
                        <CheckCircle size={18} className="text-teal-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-50 p-6 sm:p-8 border-t border-slate-100 mt-auto">
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {project.techStack.map((tech, i) => (
                      <span key={i} className="px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-teal-700 text-xs sm:text-sm font-semibold rounded-full border border-slate-200 shadow-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills & Strengths Section */}
      <section id="skills" className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Technical Skills */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 sm:mb-10 flex items-center justify-center lg:justify-start gap-3">
                <Database className="text-teal-600 w-7 h-7 sm:w-8 sm:h-8" /> Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {techSkills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 hover:border-teal-400 hover:shadow-md transition-all">
                    <div className="text-teal-600 p-2 bg-white rounded-lg shadow-sm border border-slate-100">{skill.icon}</div>
                    <span className="font-medium text-slate-700 text-sm sm:text-base">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 sm:mb-10 flex items-center justify-center lg:justify-start gap-3">
                <Award className="text-teal-600 w-7 h-7 sm:w-8 sm:h-8" /> Strengths
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                {strengths.map((skill, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 sm:p-5 bg-slate-50 rounded-2xl border border-slate-200 hover:border-purple-400 hover:shadow-md transition-all">
                    <div className="text-purple-500 p-2 bg-white rounded-lg shadow-sm border border-slate-100">{skill.icon}</div>
                    <span className="font-medium text-slate-700 text-sm sm:text-base">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-16 sm:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-10 sm:mb-12 flex items-center justify-center gap-3">
            <GraduationCap className="text-teal-600 w-8 h-8 sm:w-10 sm:h-10" /> Education
          </h2>
          
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm hover:shadow-lg transition-all">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-100 pb-6 mb-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">Bachelor of Science in Information Technology</h3>
                <p className="text-lg sm:text-xl text-teal-600 mt-2 font-medium">Reena Mehta College, Mumbai</p>
              </div>
              <div className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full font-semibold border border-teal-100 whitespace-nowrap shadow-sm text-sm sm:text-base w-fit">
                2024 – Present
              </div>
            </div>
            <div className="space-y-3 text-slate-600">
               <p className="font-medium text-slate-800 text-sm sm:text-base">Current Status: <span className="text-slate-600 font-normal">SYIT (Second Year)</span></p>
               <p className="text-sm sm:text-base leading-relaxed">Focusing on building a strong foundation in software development, database management systems, and web technologies.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section id="certificates" className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-10 sm:mb-12 text-center">Certifications</h2>
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-[2px] rounded-[1.75rem] shadow-xl hover:shadow-2xl transition-all">
            <div className="bg-white rounded-[1.6rem] p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8 text-center md:text-left h-full">
              <div className="p-4 sm:p-5 bg-teal-50 rounded-full border border-teal-100 flex-shrink-0">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-teal-600" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">MIS Data Analyst Financial Services</h3>
                <p className="text-teal-600 mt-2 font-semibold text-sm sm:text-base">Banking, Financial Services and Insurance (BFSI)</p>
                <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">Demonstrated proficiency in data management and analysis within the financial sector.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Footer */}
      <footer id="contact" className="bg-slate-900 py-16 sm:py-20 border-t border-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">Let's Connect</h2>
          <p className="text-slate-400 mb-10 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
            I'm currently looking for internships and entry-level web development opportunities. 
            Feel free to reach out if you have a question or just want to say hi!
          </p>
          
          <div className="flex justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
            <a href="https://github.com/nikitaCode09-ops" className="p-4 bg-slate-800 rounded-2xl text-slate-400 hover:text-teal-400 hover:bg-slate-700 transition-all hover:-translate-y-1 border border-slate-700 hover:border-teal-500/50 shadow-lg">
              <Github size={28} />
            </a>
            <a href="https://www.linkedin.com/in/nikita-choudhary-119b8831a/" className="p-4 bg-slate-800 rounded-2xl text-slate-400 hover:text-teal-400 hover:bg-slate-700 transition-all hover:-translate-y-1 border border-slate-700 hover:border-teal-500/50 shadow-lg">
              <Linkedin size={28} />
            </a>
            <a href="mailto:nikitakumari28092006@gmail.com" className="p-4 bg-slate-800 rounded-2xl text-slate-400 hover:text-teal-400 hover:bg-slate-700 transition-all hover:-translate-y-1 border border-slate-700 hover:border-teal-500/50 shadow-lg">
              <Mail size={28} />
            </a>
          </div>
          
          <p className="text-slate-500 text-xs sm:text-sm font-medium">
            © {new Date().getFullYear()} Nikita Choudhary. Built with React & Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;