"use client";
import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Make sure to install react-icons

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies?: string[];
  link?: string;
}

interface ProjectsCarouselProps {
  projects: Project[];
}

const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({ projects }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Set up client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Handle auto-play
  useEffect(() => {
    if (!isClient || !isAutoPlaying || projects.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === projects.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isClient, isAutoPlaying, projects.length]);

  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  // Toggle autoplay
  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (!isClient) {
    return (
      <div className="projects-container my-16">
        <div className="projects-wrapper grid grid-cols-12 gap-4 p-10 mt-8">
          <div className="col-span-12 z-50">
            <p className="text-gray-400">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="projects-container my-16">
      <div className="projects-wrapper grid grid-cols-12 gap-4 p-10 mt-8">
        <div className="col-span-12 relative z-50 mb-8">
          <h2 className="text-4xl pt-10 text-center font-bold">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-500 mt-4">
            A showcase of my recent development work and technical solutions
          </p>
        </div>
        
        <div className="col-span-12 custom-carousel relative z-50">
          <div className="carousel-container overflow-hidden relative h-[500px] md:h-[400px]">
            {projects.map((project, index) => (
              <div 
                key={project.id} 
                className={`carousel-slide absolute top-0 left-0 w-full h-full transition-transform duration-500 ease-in-out ${
                  index === currentIndex ? 'opacity-100 translate-x-0' : 
                  index < currentIndex ? 'opacity-0 -translate-x-full' : 'opacity-0 translate-x-full'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  <div className="project-image relative h-[250px] md:h-full">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="object-cover w-full h-full rounded-lg"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.log("Image failed to load:", project.image);
                      }}
                    />
                  </div>
                  <div className="project-info flex flex-col justify-between h-full">
                    <div>
                      <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                      <p className="text-gray-400">{project.description}</p>
                      
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-lime-400 mb-2">Technologies:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                              <span 
                                key={index} 
                                className="bg-gray-800 px-3 py-1 rounded-full text-sm text-cyan-500"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {project.link && (
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer" 
                        className="mt-6 inline-flex items-center text-lime-400 hover:text-lime-300"
                      >
                        View Project <span className="ml-2">→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <button 
            onClick={goToPrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 rounded-full p-2 text-lime-400 hover:bg-opacity-70 z-50"
            aria-label="Previous project"
          >
            <FiChevronLeft size={24} />
          </button>
          <button 
            onClick={goToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 rounded-full p-2 text-lime-400 hover:bg-opacity-70 z-50"
            aria-label="Next project"
          >
            <FiChevronRight size={24} />
          </button>

          {/* Pagination dots */}
          <div className="flex justify-center mt-4 gap-2 z-50">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-lime-400' : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play toggle button */}
          <button
            onClick={toggleAutoPlay}
            className={`mt-4 ml-auto flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
              isAutoPlaying ? 'bg-lime-900 text-lime-400' : 'bg-gray-800 text-gray-400'
            }`}
          >
            {isAutoPlaying ? 'Auto-play: ON' : 'Auto-play: OFF'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCarousel;