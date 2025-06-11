import React, { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  demoUrl?: string;
  details: {
    description: string;
    srs?: string[];
  };
}

const projectsData: Project[] = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform',
    description: 'A full-featured online shopping platform with modern payment integration',
    image: 'https://images.unsplash.com/photo-1593642532842-98d0fd5ebc1a',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'MongoDB'],
    demoUrl: 'https://example.com/demo1',
    details: {
      description: 'Built a comprehensive e-commerce solution with secure payment processing, inventory management, and user authentication. Implemented responsive design principles and optimized for performance.',
      srs: [
        'User authentication and authorization system',
        'Product catalog with categories and search',
        'Shopping cart and checkout process',
        'Payment gateway integration',
        'Order management and tracking'
      ]
    }
  },
  {
    id: 'ai-assistant',
    title: 'AI Research Assistant',
    description: 'An AI-powered research tool that helps summarize academic papers',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
    tech: ['React', 'Python', 'TensorFlow', 'Natural Language Processing', 'FastAPI'],
    details: {
      description: 'Developed an intelligent assistant that uses NLP to analyze and summarize research papers. The system extracts key insights, generates summaries, and provides related research recommendations.',
      srs: [
        'Document upload and processing system',
        'AI-powered text summarization',
        'Keyword extraction and analysis',
        'Related research recommendation engine',
        'User history and preferences tracking'
      ]
    }
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description: 'A personal portfolio website with glassmorphism design and parallax scrolling',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    demoUrl: 'https://example.com/demo3',
    details: {
      description: 'Designed and developed a modern portfolio website using glassmorphism principles and smooth scrolling effects. The site showcases projects and skills with an engaging user interface.',
      srs: [
        'Responsive design for all devices',
        'Horizontal scrolling project gallery',
        'Glassmorphism UI components',
        'Animated transitions between sections',
        'Contact form with email integration'
      ]
    }
  },
  {
    id: 'social-media',
    title: 'Social Media Dashboard',
    description: 'An analytics dashboard for managing multiple social media accounts',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113',
    tech: ['React', 'Redux', 'D3.js', 'Firebase', 'OAuth'],
    details: {
      description: 'Created a comprehensive dashboard that integrates with various social media APIs to provide analytics, scheduling, and content management capabilities in one platform.',
      srs: [
        'Multi-platform social media integration',
        'Analytics and reporting dashboard',
        'Content scheduling and calendar',
        'Performance metrics visualization',
        'Team collaboration features'
      ]
    }
  }
];

const Projects = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (scrollContainerRef.current && !showDetails) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [showDetails]);

  const handleCardClick = (project: Project) => {
    setActiveProject(project);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setTimeout(() => setActiveProject(null), 300);
  };

  return (
    <section id="projects" className="py-24 relative">
      {/* Background decorations */}
      <div className="absolute bottom-0 right-0 w-[30%] h-[40%] bg-accent/10 rounded-full filter blur-[100px]" />

      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="gradient-text">Projects</span>
        </h2>

        <p className="text-center mb-8 max-w-2xl mx-auto opacity-80">
          Explore my projects by scrolling horizontally. Click on any project to see detailed information.
        </p>

        <div 
          ref={scrollContainerRef} 
          className={cn(
            "parallax-container py-8",
            showDetails ? "opacity-20 pointer-events-none" : "opacity-100"
          )}
        >
          <div className="inline-flex space-x-6 px-4">
            {projectsData.map((project, index) => (
              <div
                key={project.id}
                className="w-[300px] sm:w-[350px] flex-shrink-0 glass-card p-6 cursor-pointer overflow-hidden"
                onClick={() => handleCardClick(project)}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-40 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.slice(0, 3).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="px-2 py-1 rounded-full bg-muted/30 text-xs">
                      +{project.tech.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project details modal */}
        {activeProject && (
          <div 
            className={cn(
              "fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 px-4",
              showDetails ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
            )}
          >
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeDetails}
            />
            <div 
              className="glass-card w-full max-w-3xl max-h-[80vh] overflow-y-auto z-10 p-8 animate-fade-in"
            >
              <button 
                onClick={closeDetails}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div className="relative h-48 sm:h-64 mb-6 overflow-hidden rounded-lg">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="text-2xl font-semibold mb-2">{activeProject.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h4 className="text-lg font-medium mb-3 gradient-text">Project Overview</h4>
              <p className="mb-6 opacity-90">{activeProject.details.description}</p>

              {activeProject.details.srs && (
                <>
                  <h4 className="text-lg font-medium mb-3 gradient-text">Software Requirements</h4>
                  <ul className="mb-6 space-y-2">
                    {activeProject.details.srs.map((req, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-5 h-5 rounded-full bg-primary/20 text-primary mr-3 flex-shrink-0 text-center text-xs">
                          {index + 1}
                        </span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {activeProject.demoUrl && (
                <div className="flex justify-end">
                  <a 
                    href={activeProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors duration-300 inline-flex items-center"
                  >
                    View Demo
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
