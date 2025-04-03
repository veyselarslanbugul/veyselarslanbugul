import React from 'react';
import '../styles/ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;
  
  const { title, category, image, description, technologies, codeLink, demoLink } = project;
  
  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="project-modal-close" onClick={onClose}>×</button>
        
        <div className="project-modal-container">
          <div className="project-modal-image-section">
            <img src={image} alt={title} className="project-modal-image" />
          </div>
          
          <div className="project-modal-info-section">
            <h2 className="project-modal-title">{title}</h2>
            <span className="project-modal-category">{category}</span>
            
            <div className="project-modal-description">
              <h3 className="project-modal-section-title">Project Description</h3>
              <p>{description}</p>
            </div>
            
            <div className="project-modal-technologies">
              <h3 className="project-modal-section-title">Technologies Used</h3>
              <div className="project-modal-tech-list">
                {technologies.map((tech, index) => (
                  <span key={index} className="project-modal-tech">{tech}</span>
                ))}
              </div>
            </div>
            
            <div className="project-modal-links">
              {demoLink && (
                <a href={demoLink} target="_blank" rel="noopener noreferrer" className="project-modal-link demo">
                  View Demo
                </a>
              )}
              {codeLink && (
                <a href={codeLink} target="_blank" rel="noopener noreferrer" className="project-modal-link code">
                  Source Code
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
