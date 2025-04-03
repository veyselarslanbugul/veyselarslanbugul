import React, { useState } from 'react';
import '../styles/Guestbook.css';

const Guestbook = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      author: 'Jhey Tompkins',
      date: '6 Jan 2023',
      content: 'Wanna leave me a message? Fill in this form',
      isPinned: true
    }
  ]);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <div className="guestbook">
      <div className="guestbook-messages">
        {messages.map(message => (
          <div key={message.id} className={`message ${message.isPinned ? 'pinned' : ''}`}>
            {message.isPinned && <div className="pinned-badge">📌 Pinned Cheep</div>}
            <div className="message-header">
              <img 
                src="https://via.placeholder.com/40" 
                alt={message.author} 
                className="message-avatar" 
              />
              <div className="message-meta">
                <div className="message-author">{message.author}</div>
                <div className="message-date">• {message.date}</div>
              </div>
            </div>
            <div className="message-content">{message.content}</div>
            <div className="message-actions">
              <button className="action-button">🔗</button>
            </div>
          </div>
        ))}
      </div>

      <div className="guestbook-form-container">
        <div className="form-header" onClick={toggleForm}>
          <h3>GUESTBOOK FORM</h3>
          <span className={`form-toggle ${isFormOpen ? 'open' : ''}`}>▼</span>
        </div>
        
        {isFormOpen && (
          <form className="guestbook-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Your email (not displayed)" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" placeholder="Your message" rows="4"></textarea>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Guestbook;
