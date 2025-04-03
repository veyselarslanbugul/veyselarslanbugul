import React from 'react';
import '../styles/ProjectCard.css';

const ProjectCard = ({ project, openModal }) => {
  const { title, image, description, technologies } = project;
  
  // Sadece ilk 3 teknolojiyi göster
  const displayTechnologies = technologies.slice(0, 3);
  
  return (
    <div className="project-card" onClick={() => openModal(project)}>
      <div className="external-link-icon">
        <i className="fas fa-external-link-alt">↗</i>
      </div>
      
      <div className="project-image-container">
        <img src={image} alt={title} className="project-image" />
      </div>
      
      <div className="project-info">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        
        <div className="project-technologies">
          {displayTechnologies.map((tech, index) => (
            <span key={index} className="project-tech">{tech}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
