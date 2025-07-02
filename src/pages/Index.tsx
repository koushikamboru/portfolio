import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState('home');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const sections = ['home', 'about', 'projects', 'skills', 'contact'];

  // Set page title and initial animation
  useEffect(() => {
    document.title = 'Amboru Koushik - Portfolio';
    
    // Add initial loading animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);

    // Enhanced intersection observer for sections with parallax
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setActiveSectionId(sectionId);
            const sectionIndex = sections.indexOf(sectionId);
            if (sectionIndex !== -1) {
              setCurrentSectionIndex(sectionIndex);
            }
            
            // Add the section-reveal class to animate the section
            entry.target.classList.add('section-reveal');
          }
        });
      },
      { threshold: 0.5, rootMargin: '-10% 0px -10% 0px' }
    );

    // Observe all sections
    const sectionElements = document.querySelectorAll('section[id]');
    sectionElements.forEach((section) => observer.observe(section));

    // Scroll event for parallax effects
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Apply parallax to background elements
      const parallaxElements = document.querySelectorAll('[data-parallax]');
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-parallax') || '0.5');
        const yPos = -(window.scrollY * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    // Smooth scroll snap behavior
    let scrollTimeout: NodeJS.Timeout;
    const handleScrollEnd = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 100);
    };

    const handleScrollStart = () => {
      setIsScrolling(true);
      handleScrollEnd();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScrollStart, { passive: true });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScrollStart);
    };
  }, []);

  // Enhanced wheel event for section-based scrolling
  useEffect(() => {
    let isThrottled = false;
    let lastWheelTime = 0;
    
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      
      // Prevent rapid fire scrolling
      if (isThrottled || isScrolling || now - lastWheelTime < 50) return;
      
      e.preventDefault();
      isThrottled = true;
      lastWheelTime = now;
      
      const direction = e.deltaY > 0 ? 1 : -1;
      let newIndex = currentSectionIndex + direction;
      
      // Clamp the index
      newIndex = Math.max(0, Math.min(sections.length - 1, newIndex));
      
      if (newIndex !== currentSectionIndex) {
        const targetSection = document.getElementById(sections[newIndex]);
        if (targetSection) {
          setIsScrolling(true);
          
          // Smooth scroll with better easing
          targetSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update the current section immediately for better responsiveness
          setCurrentSectionIndex(newIndex);
          setActiveSectionId(sections[newIndex]);
        }
      }
      
      setTimeout(() => {
        isThrottled = false;
      }, 800);
    };

    // Only add wheel listener if user prefers motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');
    if (mediaQuery.matches) {
      window.addEventListener('wheel', handleWheel, { passive: false });
    }
    
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [currentSectionIndex, isScrolling]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        const direction = e.key === 'ArrowDown' ? 1 : -1;
        let newIndex = currentSectionIndex + direction;
        newIndex = Math.max(0, Math.min(sections.length - 1, newIndex));
        
        if (newIndex !== currentSectionIndex) {
          const targetSection = document.getElementById(sections[newIndex]);
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSectionIndex]);

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden transition-all duration-1000">
      {/* Enhanced background parallax layers */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div 
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-primary/20 rounded-full filter blur-[120px]"
          data-parallax="0.1"
        />
        <div 
          className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-accent/20 rounded-full filter blur-[120px]"
          data-parallax="0.15"
        />
        <div 
          className="absolute top-[50%] left-[50%] w-[40%] h-[40%] bg-secondary/15 rounded-full filter blur-[100px] transform -translate-x-1/2 -translate-y-1/2"
          data-parallax="0.08"
        />
      </div>

      {/* Loading overlay */}
      <div className={`fixed inset-0 z-50 bg-background flex items-center justify-center transition-all duration-700 ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="relative">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin-glow"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-accent rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
      </div>

      <Navbar activeSectionId={activeSectionId} />
      
      <main className="flex-1">
        <div 
          className={`transition-all duration-700 ease-out ${currentSectionIndex === 0 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-80 translate-y-4 scale-[0.98]'}`}
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <Hero />
        </div>
        
        <div 
          className={`transition-all duration-700 ease-out ${currentSectionIndex === 1 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-80 translate-y-4 scale-[0.98]'}`}
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          <About />
        </div>
        
        <div 
          className={`transition-all duration-700 ease-out ${currentSectionIndex === 2 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-80 translate-y-4 scale-[0.98]'}`}
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        >
          <Projects />
        </div>
        
        <div 
          className={`transition-all duration-700 ease-out ${currentSectionIndex === 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-80 translate-y-4 scale-[0.98]'}`}
          style={{ transform: `translateY(${scrollY * 0.07}px)` }}
        >
          <Skills />
        </div>
        
        <div 
          className={`transition-all duration-700 ease-out ${currentSectionIndex === 4 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-80 translate-y-4 scale-[0.98]'}`}
          style={{ transform: `translateY(${scrollY * 0.04}px)` }}
        >
          <Contact />
        </div>
      </main>
      
      <Footer />

      {/* Enhanced section indicator */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-3">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => {
              const element = document.getElementById(section);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setCurrentSectionIndex(index);
                setActiveSectionId(section);
              }
            }}
            className={`block w-3 h-3 rounded-full transition-all duration-500 ${
              index === currentSectionIndex 
                ? 'bg-primary scale-125 shadow-lg shadow-primary/50 animate-pulse' 
                : 'bg-muted hover:bg-primary/50 hover:scale-110'
            }`}
            aria-label={`Go to ${section} section`}
          />
        ))}
      </div>

      {/* Progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-muted/20 z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
          style={{ width: `${((currentSectionIndex + 1) / sections.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Index;
