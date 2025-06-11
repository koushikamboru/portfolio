import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface NavbarProps {
  activeSectionId: string;
}

const Navbar = ({ activeSectionId }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      // Show/hide navbar on scroll direction
      const visible = prevScroll > currentScrollPos || currentScrollPos < 50;
      setNavVisible(visible);
      setPrevScroll(currentScrollPos);
      
      // Add glass effect on scroll
      if (currentScrollPos > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScroll]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-500',
        scrolled ? 'glass py-2' : 'bg-transparent py-4',
        navVisible ? 'translate-y-0' : '-translate-y-full'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a 
              href="#home" 
              onClick={(e) => handleNavClick(e, 'home')}
              className="text-2xl font-bold text-shimmer"
            >
              Portfolio
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="glass-card p-2 rounded-lg hover:glow-border"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-1 items-center">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={cn(
                  'px-4 py-2 rounded-full transition-all duration-300 relative group overflow-hidden',
                  activeSectionId === item.id
                    ? 'text-primary font-medium'
                    : 'text-foreground hover:text-primary'
                )}
              >
                <span className="relative z-10">{item.name}</span>
                {activeSectionId === item.id && (
                  <span className="absolute inset-0 bg-primary/10 rounded-full animate-fade-in"></span>
                )}
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            ))}
          </div>
        </div>

        {/* Mobile menu dropdown */}
        <div 
          className={cn(
            "md:hidden overflow-hidden transition-all duration-500 ease-in-out",
            isMenuOpen ? "max-h-64 opacity-100 mt-2" : "max-h-0 opacity-0"
          )}
        >
          <div className="glass rounded-lg p-2 space-y-1">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={cn(
                  'block py-3 px-4 rounded-lg transition-all duration-300',
                  activeSectionId === item.id
                    ? 'bg-primary/15 text-primary font-medium'
                    : 'hover:bg-primary/10',
                  `animate-fade-in delay-${index * 100}`
                )}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
