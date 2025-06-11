import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = heroRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      
      mouseRef.current = { x, y };
      
      // Enhanced parallax for background gradients
      const gradients = heroRef.current.querySelectorAll('.bg-gradient');
      gradients.forEach((el: Element, index) => {
        const element = el as HTMLElement;
        const speed = 0.02 + (index * 0.01);
        const translateX = (x - 0.5) * 150 * speed;
        const translateY = (y - 0.5) * 150 * speed;
        const rotation = (x - 0.5) * 5;
        element.style.transform = `translate(${translateX}px, ${translateY}px) rotate(${rotation}deg)`;
      });

      // Parallax for floating elements
      const floatingElements = heroRef.current.querySelectorAll('.floating-element');
      floatingElements.forEach((el: Element, index) => {
        const element = el as HTMLElement;
        const multiplier = (index + 1) * 0.1;
        const translateX = (x - 0.5) * 30 * multiplier;
        const translateY = (y - 0.5) * 30 * multiplier;
        element.style.transform = `translate(${translateX}px, ${translateY}px)`;
      });
    };

    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const scrollY = window.scrollY;
      const parallaxElements = heroRef.current.querySelectorAll('[data-parallax-speed]');
      
      parallaxElements.forEach((el) => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.getAttribute('data-parallax-speed') || '0.5');
        const yPos = scrollY * speed;
        element.style.transform = `translateY(${yPos}px)`;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden"
    >
      {/* Enhanced background gradients with parallax */}
      <div 
        className="absolute -top-[15%] -left-[15%] w-[50%] h-[50%] bg-primary/25 rounded-full filter blur-[120px] bg-gradient transition-transform duration-75"
        data-parallax-speed="0.2"
      />
      <div 
        className="absolute -bottom-[15%] -right-[15%] w-[50%] h-[50%] bg-accent/25 rounded-full filter blur-[120px] bg-gradient transition-transform duration-75"
        data-parallax-speed="0.15"
      />
      <div 
        className="absolute top-[25%] right-[5%] w-[35%] h-[35%] bg-secondary/20 rounded-full filter blur-[100px] bg-gradient transition-transform duration-75"
        data-parallax-speed="0.25"
      />

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div className="floating-element absolute top-[20%] left-[10%] w-4 h-4 bg-primary rounded-full animate-float" style={{ animationDelay: '0s' }} />
        <div className="floating-element absolute top-[60%] right-[15%] w-6 h-6 bg-accent rounded-full animate-float" style={{ animationDelay: '1s' }} />
        <div className="floating-element absolute bottom-[30%] left-[20%] w-3 h-3 bg-secondary rounded-full animate-float" style={{ animationDelay: '2s' }} />
        <div className="floating-element absolute top-[40%] left-[70%] w-5 h-5 bg-primary/60 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Enhanced animated grid */}
      <div className="absolute inset-0 overflow-hidden opacity-20" data-parallax-speed="0.1">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.primary/8)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.primary/8)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] animate-pulse-opacity"></div>
      </div>

      <div className="section-container relative z-10 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 mb-12 md:mb-0" data-parallax-speed="0.05">
          <p className="text-lg opacity-80 mb-4 animate-fade-in">
            👋 <span className="animate-wave inline-block">Hello</span>, I'm
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 relative">
            <span className="text-shimmer glow-text">Koushik Amboru</span>
            <span className="absolute -left-4 -top-4 text-primary/30 text-sm font-mono animate-pulse floating-element">&lt;dev&gt;</span>
            <span className="absolute -right-4 -bottom-4 text-primary/30 text-sm font-mono animate-pulse floating-element">&lt;/dev&gt;</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground mb-6 animate-fade-in delay-200">
            Full Stack Developer & AI/ML Specialist
          </h2>
          <p className="text-lg opacity-80 max-w-lg mb-8 animate-fade-in delay-300">
            I craft modern web experiences using Next.js, TypeScript, and AI technologies. 
            Currently pursuing B.Tech in Computer Science with AI/ML specialization.
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-in delay-400">
            <a
              href="#projects"
              className="futuristic-button glass-card px-6 py-3 rounded-full font-medium hover:bg-primary/20 group transition-all duration-500 hover:scale-105"
            >
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">View Projects</span>
              <span className="absolute bottom-0 left-0 h-full w-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-80 group-hover:w-full transition-all duration-500 -z-10"></span>
            </a>
            <a
              href="#contact"
              className="futuristic-button relative bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-medium transition-all duration-300 group overflow-hidden hover:scale-105"
            >
              <span className="relative z-10">Contact Me</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            </a>
          </div>
        </div>

        <div className="w-full md:w-1/2 md:pl-10 animate-fade-in delay-500" data-parallax-speed="0.08">
          <div className="glass-card relative p-1 rounded-full mx-auto max-w-xs glow-border hover:scale-105 transition-transform duration-500">
            <div className="aspect-square rounded-full bg-gradient-to-br from-primary to-accent p-1 overflow-hidden relative">
              <img
                src="https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
                alt="Profile"
                className="rounded-full object-cover w-full h-full p-2 animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-transparent opacity-50 animate-rotate"></div>
            </div>
            
            {/* Enhanced orbiting elements */}
            <div className="absolute inset-[-15px] rounded-full border border-primary/20 animate-rotate floating-element" style={{ animationDuration: '20s' }}>
              <div className="absolute top-[50%] left-[0%] w-2 h-2 bg-primary rounded-full shadow-lg shadow-primary/50"></div>
            </div>
            <div className="absolute inset-[-30px] rounded-full border border-primary/15 animate-rotate floating-element" style={{ animationDuration: '25s' }}>
              <div className="absolute top-[20%] right-[10%] w-3 h-3 bg-accent rounded-full shadow-lg shadow-accent/50"></div>
            </div>
            <div className="absolute inset-[-45px] rounded-full border border-primary/10 animate-rotate floating-element" style={{ animationDuration: '30s', animationDirection: 'reverse' }}>
              <div className="absolute bottom-[15%] left-[5%] w-4 h-4 bg-secondary rounded-full blur-[1px] shadow-lg shadow-secondary/50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce floating-element">
        <a href="#about" className="flex flex-col items-center group">
          <span className="text-sm opacity-70 mb-2 group-hover:text-primary transition-colors duration-300">Scroll Down</span>
          <div className="relative">
            <svg
              className="w-6 h-6 text-primary opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse-opacity"></div>
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
