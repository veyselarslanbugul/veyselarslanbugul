import React, { useState, useEffect, lazy, Suspense } from 'react';
import ProjectCard from './ProjectCard';
const ProjectModal = lazy(() => import('./ProjectModal'));
import projects from '../data/projects';
import '../styles/ProjectGallery.css';

const ProjectGallery = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['all', ...new Set(projects.map(project => project.category))];

  useEffect(() => {
    filterProjects();
  }, [activeFilter, sortBy, searchTerm]);

  const filterProjects = () => {
    setIsLoading(true);
    
    // Simulating a small delay to avoid UI freezing
    setTimeout(() => {
      let result = [...projects];
      
      // Category filtering
      if (activeFilter !== 'all') {
        result = result.filter(project => project.category === activeFilter);
      }
      
      // Search filtering
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        result = result.filter(project => 
          project.title.toLowerCase().includes(term) || 
          project.description.toLowerCase().includes(term) ||
          project.technologies.some(tech => tech.toLowerCase().includes(term))
        );
      }
      
      // Sorting
      if (sortBy === 'newest') {
        result.sort((a, b) => b.id - a.id);
      } else if (sortBy === 'oldest') {
        result.sort((a, b) => a.id - b.id);
      }
      
      setFilteredProjects(result);
      setIsLoading(false);
    }, 10); // Daha hızlı yükleme için 100ms'den 10ms'ye düşürüldü
  };

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const onClose = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="project-gallery">
      <div className="project-controls">
        <div className="project-search">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="project-search-input"
          />
        </div>
        
        <div className="project-filters">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`project-filter-btn ${activeFilter === category ? 'active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category === 'all' ? 'All' : category}
            </button>
          ))}
        </div>
        
        <div className="project-sort">
          <select
            className="project-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading projects...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="no-projects">
          <p>No projects found matching your criteria.</p>
        </div>
      ) : (
        <div className="project-grid">
          {filteredProjects.map(project => (
            <ProjectCard
              key={project.id}
              project={project}
              openModal={openModal}
            />
          ))}
        </div>
      )}
      
      {selectedProject && (
        <Suspense fallback={<div className="modal-loading">Loading project details...</div>}>
          <ProjectModal 
            project={selectedProject} 
            onClose={onClose} 
          />
        </Suspense>
      )}
    </div>
  );
};

export default ProjectGallery;
