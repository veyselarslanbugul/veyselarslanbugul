import React, { useState, useRef } from 'react';
import '../styles/Content.css';
import ProjectGallery from './ProjectGallery';

const Content = ({ activeTab }) => {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const fullContentRef = useRef(null);
  
  const handleAboutClick = () => {
    if (!showFullAbout) {
      setShowFullAbout(true);
      
      // Scroll to the full content after a short delay to allow for animation
      setTimeout(() => {
        if (fullContentRef.current) {
          fullContentRef.current.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 300);
    }
  };
  
  return (
    <div className="content-container">
      {activeTab === 'about' && (
        <div className={`tab-content ${showFullAbout ? 'expanded' : 'collapsed'}`} onClick={handleAboutClick}>
          <h2>About</h2>
          <p>Hello! I'm a software developer with a passion for creating modern web applications.</p>
          
          <div className={`full-content ${showFullAbout ? 'show' : 'hide'}`} ref={fullContentRef}>
            <p>I have experience in both frontend and backend development, focusing on building user-friendly interfaces and optimized solutions.</p>
            
            <p>My technical expertise includes:</p>
            <ul>
              <li><strong>Frontend:</strong> React, JavaScript, HTML5, CSS3</li>
              <li><strong>Backend:</strong> Node.js, Express, APIs</li>
              <li><strong>Databases:</strong> MongoDB, MySQL</li>
              <li><strong>Tools:</strong> Git, Docker, Webpack</li>
            </ul>
            
            <p>I'm constantly learning new technologies and improving my skills. I value contributing to open-source projects and sharing knowledge with the software community.</p>
          </div>
          
          {!showFullAbout && (
            <div className="read-more-indicator">
              <button className="read-more-button">Click to see more</button>
              <span className="arrow-down">↓</span>
            </div>
          )}
        </div>
      )}
      
      {activeTab === 'career' && (
        <div className="tab-content">
          <h2>Career</h2>
          <div className="timeline">
            <div className="job-card">
              <div className="job-icon">
                <i className="job-dot"></i>
              </div>
              <div className="job-content">
                <h3 className="job-title">Lorem Ipsum Developer</h3>
                <p className="job-company">Dolor Sit Amet Inc.</p>
                <p className="job-period">2020 - Present</p>
                <p className="job-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.</p>
                <div className="job-skills">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">MongoDB</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'projects' && (
        <div className="tab-content">
          <h2>Projects</h2>
          <ProjectGallery />
        </div>
      )}
    </div>
  );
};

export default Content;
