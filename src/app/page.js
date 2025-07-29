"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Download, ExternalLink, Calendar, Award, Code2, Database, Smartphone, Globe, ChevronRight, Star, Zap, BookOpen } from 'lucide-react';

// Aceternity-inspired components
const TextGenerateEffect = ({ words, className = "" }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(words.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, words]);

  return (
    <div className={className}>
      {displayedText.split('').map((char, index) => (
        <span
          key={index}
          className={`opacity-0 animate-[fadeIn_0.5s_ease-in-out_forwards] text-white`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

const BackgroundGradient = ({ children, className = "" }) => {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 to-purple-600 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
      <div className="relative bg-black/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
        {children}
      </div>
    </div>
  );
};

const HoverEffect = ({ items, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative group block p-2 h-full w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          <div className="relative bg-black/80 backdrop-blur-sm border border-gray-800 rounded-3xl p-6 h-full hover:border-gray-600 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <item.icon className="h-8 w-8 text-purple-400" />
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">{item.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {item.tech.map((tech, i) => (
                <span key={i} className="px-2 py-1 bg-purple-900/30 border border-purple-700/50 rounded-full text-xs text-purple-300">
                  {tech}
                </span>
              ))}
            </div>
            <div className="space-y-2">
              {item.highlights.map((highlight, i) => (
                <div key={i} className="flex items-start gap-2">
                  <ChevronRight className="h-3 w-3 text-purple-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-400 text-xs">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const FloatingNavbar = ({ navItems, activeSection, onSectionClick }) => {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <div
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 w-full z-50 transition-all duration-300 ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
    >
      <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md border border-gray-800 rounded-full px-6 py-3 mx-auto max-w-[85%] sm:max-w-[500px] md:max-w-[600px]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionClick(item.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeSection === item.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/25'
                : 'text-gray-300 hover:text-white hover:bg-gray-800'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>
    </div>
  );
};

const AnimatedBeam = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl animate-spin" style={{animationDuration: '20s'}}></div>
    </div>
  );
};

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('about'); // Changed default to 'about' since 'home' is removed

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setActiveSection(sectionId);
  };

  const navItems = [
    { id: 'about', name: 'About' },
    { id: 'experience', name: 'Experience' },
    { id: 'projects', name: 'Projects' },
    { id: 'contact', name: 'Contact' }
  ]; // Removed 'home' from navItems

  const projects = [
    {
      title: 'Attendance Management System',
      description: 'Full-stack attendance system with geolocation validation and real-time updates.',
      tech: ['Django REST', 'React Native', 'MySQL', 'JWT'],
      highlights: [
        'Geolocation-based tracking with 15m proximity validation',
        'RESTful API with custom serializers',
        'Real-time calendar interface',
        'Secure token refresh mechanisms'
      ],
      icon: Smartphone
    },
    {
      title: 'Toxic Comment Detector',
      description: 'AI-powered toxicity detection using deep learning and NLP.',
      tech: ['TensorFlow', 'Python', 'NLP', 'Gradio'],
      highlights: [
        'Trained on 159,571-entry dataset',
        'Bidirectional LSTM architecture',
        'Real-time web interface',
        'Multi-label classification system'
      ],
      icon: Zap
    },
    {
      title: 'File Converter',
      description: 'Desktop application for converting audio and image files.',
      tech: ['Python', 'Tkinter', 'Pydub', 'PIL'],
      highlights: [
        'Multi-format support (MP3, PNG, WAV, JPG)',
        'Intuitive GUI with dynamic dropdowns',
        '400x400 image thumbnails',
        'Comprehensive error handling'
      ],
      icon: Database
    }
  ];

  const skills = {
    'Programming Languages': ['Java', 'Python', 'JavaScript'],
    'Technologies/Frameworks': ['HTML', 'CSS', 'React Native', 'Django', 'MySQL']
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <AnimatedBeam />

      {/* Floating Navigation */}
      <FloatingNavbar 
        navItems={navItems}
        activeSection={activeSection}
        onSectionClick={scrollToSection}
      />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative pt-20"> {/* Added pt-20 to push content down */}
        <div className="text-center z-10 max-w-4xl mx-auto px-3 mt-3">
          <TextGenerateEffect 
            words="Hi, I'm Sejal Pujari"
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent"
          />
          
          <div className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in-up delay-500">
            Full-Stack Developer & AI/ML Enthusiast
          </div>
          
          <div className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto animate-fade-in-up delay-700">
            Crafting digital experiences with cutting-edge technology. Specialized in AI/ML applications, 
            full-stack development, and creating user-centric solutions.
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up delay-1000">
            <BackgroundGradient>
              <div className="flex items-center gap-2 text-purple-300">
                <MapPin size={16} />
                <span>Hyderabad, Telangana</span>
              </div>
            </BackgroundGradient>
            <BackgroundGradient>
              <div className="flex items-center gap-2 text-purple-300">
                <Phone size={16} />
                <span>+91 9347693061</span>
              </div>
            </BackgroundGradient>
          </div>

          <div className="flex justify-center gap-6 animate-fade-in-up delay-1200">
            <button 
              onClick={() => scrollToSection('contact')}
              className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/25"
            >
              <Mail size={20} />
              Let's Connect
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300 -z-10"></div>
            </button>
            <a 
              href="https://github.com/sejalpujari"
              className="group inline-flex items-center gap-2 border border-purple-400 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:bg-purple-400/10 hover:scale-105"
            >
              <Github size={20} />
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Passionate about creating innovative solutions that bridge technology and user experience
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <BackgroundGradient>
                <h3 className="text-2xl font-bold mb-4 text-purple-400">My Journey</h3>
                <p className="text-gray-300 leading-relaxed mb-4">
                  I'm a passionate Computer Science student specializing in Artificial Intelligence and Machine Learning, 
                  currently pursuing my Bachelor's degree at Malla Reddy University with a CGPA of 8.59.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  My journey in tech has led me to explore full-stack development, AI/ML applications, and mobile app development. 
                  I love creating solutions that make complex technology accessible and user-friendly.
                </p>
              </BackgroundGradient>

              <BackgroundGradient>
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="h-6 w-6 text-purple-400" />
                  <h3 className="text-xl font-semibold text-purple-400">Education</h3>
                </div>
                <div>
                  <h4 className="font-semibold text-white">Bachelor of Technology in Computer Science (AI & ML)</h4>
                  <p className="text-gray-400">Malla Reddy University • Sep 2021 - May 2025</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-purple-300 font-semibold">CGPA: 8.59</span>
                  </div>
                </div>
              </BackgroundGradient>
            </div>

            <div className="space-y-6">
              <BackgroundGradient>
                <h3 className="text-2xl font-bold mb-6 text-purple-400">Technical Skills</h3>
                <div className="space-y-6">
                  {Object.entries(skills).map(([category, skillList]) => (
                    <div key={category}>
                      <h4 className="text-lg font-semibold mb-3 text-white">{category}</h4>
                      <div className="flex flex-wrap gap-2">
                        {skillList.map((skill) => (
                          <span
                            key={skill}
                            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/30 px-3 py-2 rounded-full text-sm text-purple-300 hover:border-purple-400/50 transition-all duration-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </BackgroundGradient>

              <div className="grid grid-cols-2 gap-4">
                <BackgroundGradient className="text-center">
                  <Code2 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">3+</div>
                  <div className="text-gray-400 text-sm">Projects</div>
                </BackgroundGradient>
                <BackgroundGradient className="text-center">
                  <Award className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">2nd</div>
                  <div className="text-gray-400 text-sm">Place Award</div>
                </BackgroundGradient>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Experience
            </h2>
          </div>

          <BackgroundGradient className="max-w-4xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">Full-Stack Developer Intern</h3>
                <p className="text-purple-400 text-xl font-semibold">Techuva Solutions Pvt. Ltd</p>
                <p className="text-gray-400">Hyderabad, Telangana</p>
              </div>
              <div className="mt-4 lg:mt-0">
                <span className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-400/30 px-4 py-2 rounded-full text-purple-300">
                  <Calendar size={16} />
                  February 2025 - May 2025
                </span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {[
                  'Developed full-stack attendance management system using Django REST Framework and React Native',
                  'Integrated geolocation functionality with 15-meter proximity validation',
                  'Designed RESTful API endpoints with custom serializers'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                {[
                  'Built intuitive calendar-based UI with real-time attendance updates',
                  'Configured secure token refresh and AsyncStorage session management',
                  'Optimized performance through caching and memoization techniques'
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </BackgroundGradient>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400">
              Showcasing my passion for innovative technology solutions
            </p>
          </div>

          <HoverEffect items={projects} />
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Achievements & Certifications
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <BackgroundGradient>
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-yellow-400" size={32} />
                <h3 className="text-2xl font-bold text-white">Achievement</h3>
              </div>
              <h4 className="font-semibold text-purple-400 mb-2 text-lg">
                🏆 2nd Place - National Level Innovation & Entrepreneurship Summit
              </h4>
              <p className="text-gray-300">
                Secured second place for Gelato Customization Concept at Malla Reddy University, 
                demonstrating innovation in product customization and entrepreneurial thinking.
              </p>
            </BackgroundGradient>

            <BackgroundGradient>
              <div className="flex items-center gap-3 mb-6">
                <Code2 className="text-purple-400" size={32} />
                <h3 className="text-2xl font-bold text-white">Certifications</h3>
              </div>
              <div className="space-y-4">
                <div className="border-l-2 border-purple-400 pl-4">
                  <h4 className="font-semibold text-white">NPTEL Deep Learning Certification</h4>
                  <p className="text-purple-400 text-sm">IIT Madras • April 2024</p>
                  <p className="text-gray-400 text-sm">Advanced concepts in neural networks and deep learning</p>
                </div>
                <div className="border-l-2 border-purple-400 pl-4">
                  <h4 className="font-semibold text-white">Java Programming</h4>
                  <p className="text-purple-400 text-sm">Coursera • May 2023</p>
                  <p className="text-gray-400 text-sm">Object-oriented programming and software development</p>
                </div>
              </div>
            </BackgroundGradient>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let's Build Something Amazing
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            I'm always excited to discuss new opportunities, innovative projects, and potential collaborations. 
            Let's connect and create something extraordinary together!
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                icon: Mail,
                title: 'Email',
                subtitle: 'sejal.pujari03@gmail.com',
                href: 'mailto:sejal.pujari03@gmail.com',
                color: 'from-blue-600 to-purple-600'
              },
              {
                icon: Linkedin,
                title: 'LinkedIn',
                subtitle: 'Connect professionally',
                href: 'https://linkedin.com/in/sejalpujari02',
                color: 'from-purple-600 to-pink-600'
              },
              {
                icon: Github,
                title: 'GitHub',
                subtitle: 'Check out my code',
                href: 'https://github.com/sejalpujari',
                color: 'from-pink-600 to-red-600'
              }
            ].map((contact, index) => (
              <BackgroundGradient key={index}>
                <a href={contact.href} className="block group">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${contact.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <contact.icon size={32} className="text-white" />
                  </div>
                  <h3 className="font-semibold mb-2 text-white text-lg">{contact.title}</h3>
                  <p className="text-gray-400 text-sm group-hover:text-purple-300 transition-colors duration-300">
                    {contact.subtitle}
                  </p>
                </a>
              </BackgroundGradient>
            ))}
          </div>

          <BackgroundGradient className="max-w-2xl mx-auto">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4 text-white">Ready to start a project?</h3>
              <p className="text-gray-400 mb-6">
                Whether you have a specific project in mind or just want to explore possibilities, 
                I'd love to hear from you.
              </p>
              <button 
                onClick={() => window.open('mailto:sejal.pujari03@gmail.com', '_blank')}
                className="group inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/25"
              >
                <Mail size={20} />
                Start a Conversation
                <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </BackgroundGradient>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">
            © 2025 Sejal Pujari. Crafted with passion using Next.js and modern web technologies.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="https://github.com/sejalpujari" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com/in/sejalpujari02" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
              <Linkedin size={20} />
            </a>
            <a href="mailto:sejal.pujari03@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes tilt {
          0%, 50%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
        
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
        
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .delay-1200 { animation-delay: 1200ms; }
      `}</style>
    </div>
  );
};

export default Portfolio;