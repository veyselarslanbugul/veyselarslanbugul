import React, { useState, useRef } from 'react';
import '../styles/Content.css';
import ProjectGallery from './ProjectGallery';
import exercises from '../data/exercises';

const Content = ({ activeTab }) => {
  const [showFullAbout, setShowFullAbout] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(9); // Sayfa başına gösterilecek egzersiz sayısı
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

  // Sayfalama için hesaplamalar
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);
  const totalPages = Math.ceil(exercises.length / exercisesPerPage);

  // Sayfa değiştirme fonksiyonu
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
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
      
      {activeTab === 'exercises' && (
        <div className="tab-content">
          <h2>Exercises</h2>
          {exercises.length === 0 ? (
            <div className="empty-section">
              <p>Henüz egzersiz eklenmedi. Yakında burada olacak!</p>
            </div>
          ) : (
            <>
              <div className="exercises-container">
                {currentExercises.map((exercise) => (
                  <div className="exercise-card" key={exercise.id}>
                    <div className="exercise-content">
                      <h3 className="exercise-title">{exercise.title}</h3>
                      <p className="exercise-description">{exercise.description}</p>
                      <div className="exercise-links">
                        {exercise.githubLink && (
                          <a href={exercise.githubLink} target="_blank" rel="noopener noreferrer" className="exercise-link">GitHub</a>
                        )}
                        {exercise.demoLink && (
                          <a href={exercise.demoLink} target="_blank" rel="noopener noreferrer" className="exercise-link">Demo</a>
                        )}
                      </div>
                      <div className="exercise-tags">
                        {exercise.technologies.map((tech, index) => (
                          <span key={index} className="exercise-tag">{tech}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Sayfalama */}
              {totalPages > 1 && (
                <div className="pagination">
                  <button 
                    onClick={() => paginate(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="pagination-button"
                  >
                    &laquo; Önceki
                  </button>
                  
                  <div className="pagination-info">
                    Sayfa {currentPage} / {totalPages}
                  </div>
                  
                  <button 
                    onClick={() => paginate(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="pagination-button"
                  >
                    Sonraki &raquo;
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {activeTab === 'coding-daily' && (
        <div className="tab-content">
          <h2>Coding Daily</h2>
          <div className="coding-daily-container">
            <div className="daily-entry">
              <h3>Day 1: Getting Started</h3>
              <p className="entry-date">April 4, 2025</p>
              <p>Today I started my coding journey...</p>
              <div className="tags">
                <span className="tag">Day 1</span>
                <span className="tag">Beginning</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 2</h3>
              <p className="entry-date">April 5, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 2</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 3</h3>
              <p className="entry-date">April 6, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 3</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 4</h3>
              <p className="entry-date">April 7, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 4</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 5</h3>
              <p className="entry-date">April 8, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 5</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 6</h3>
              <p className="entry-date">April 9, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 6</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 7</h3>
              <p className="entry-date">April 10, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 7</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 8</h3>
              <p className="entry-date">April 11, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 8</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 9</h3>
              <p className="entry-date">April 12, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 9</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 10</h3>
              <p className="entry-date">April 13, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 10</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 11</h3>
              <p className="entry-date">April 14, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 11</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 12</h3>
              <p className="entry-date">April 15, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 12</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 13</h3>
              <p className="entry-date">April 16, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 13</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 14</h3>
              <p className="entry-date">April 17, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 14</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 15</h3>
              <p className="entry-date">April 18, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 15</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 16</h3>
              <p className="entry-date">April 19, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 16</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 17</h3>
              <p className="entry-date">April 20, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 17</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 18</h3>
              <p className="entry-date">April 21, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 18</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 19</h3>
              <p className="entry-date">April 22, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 19</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 20</h3>
              <p className="entry-date">April 23, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 20</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 21</h3>
              <p className="entry-date">April 24, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 21</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 22</h3>
              <p className="entry-date">April 25, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 22</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 23</h3>
              <p className="entry-date">April 26, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 23</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 24</h3>
              <p className="entry-date">April 27, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 24</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 25</h3>
              <p className="entry-date">April 28, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 25</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 26</h3>
              <p className="entry-date">April 29, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 26</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 27</h3>
              <p className="entry-date">April 30, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 27</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 28</h3>
              <p className="entry-date">May 1, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 28</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 29</h3>
              <p className="entry-date">May 2, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 29</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 30</h3>
              <p className="entry-date">May 3, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 30</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 31</h3>
              <p className="entry-date">May 4, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 31</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 32</h3>
              <p className="entry-date">May 5, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 32</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 33</h3>
              <p className="entry-date">May 6, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 33</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 34</h3>
              <p className="entry-date">May 7, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 34</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 35</h3>
              <p className="entry-date">May 8, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 35</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 36</h3>
              <p className="entry-date">May 9, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 36</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 37</h3>
              <p className="entry-date">May 10, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 37</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 38</h3>
              <p className="entry-date">May 11, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 38</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 39</h3>
              <p className="entry-date">May 12, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 39</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 40</h3>
              <p className="entry-date">May 13, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 40</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 41</h3>
              <p className="entry-date">May 14, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 41</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 42</h3>
              <p className="entry-date">May 15, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 42</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 43</h3>
              <p className="entry-date">May 16, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 43</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 44</h3>
              <p className="entry-date">May 17, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 44</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 45</h3>
              <p className="entry-date">May 18, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 45</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 46</h3>
              <p className="entry-date">May 19, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 46</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 47</h3>
              <p className="entry-date">May 20, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 47</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 48</h3>
              <p className="entry-date">May 21, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 48</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 49</h3>
              <p className="entry-date">May 22, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 49</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 50</h3>
              <p className="entry-date">May 23, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 50</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 51</h3>
              <p className="entry-date">May 24, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 51</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 52</h3>
              <p className="entry-date">May 25, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 52</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 53</h3>
              <p className="entry-date">May 26, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 53</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 54</h3>
              <p className="entry-date">May 27, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 54</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 55</h3>
              <p className="entry-date">May 28, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 55</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 56</h3>
              <p className="entry-date">May 29, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 56</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 57</h3>
              <p className="entry-date">May 30, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 57</span>
              </div>
            </div>
            
            <div className="daily-entry">
              <h3>Day 58</h3>
              <p className="entry-date">May 31, 2025</p>
              <p>...</p>
              <div className="tags">
                <span className="tag">Day 58</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
