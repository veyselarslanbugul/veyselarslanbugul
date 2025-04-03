import React from 'react';
import '../styles/Navigation.css';

const Navigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'about', label: 'About' },
    { id: 'career', label: 'Career' },
    { id: 'projects', label: 'Projects' }
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    
    // Sekme değiştikten sonra içerik alanına yumuşak kaydırma
    setTimeout(() => {
      const contentArea = document.querySelector('.content-area');
      if (contentArea) {
        contentArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <nav className="profile-navigation">
      <div className="nav-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
