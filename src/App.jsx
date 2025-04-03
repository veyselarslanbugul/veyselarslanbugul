import { useState, useEffect } from 'react'
import './styles/App.css'
import ProfileHeader from './components/ProfileHeader'
import Navigation from './components/Navigation'
import Content from './components/Content'
import ScrollToTop from './components/ScrollToTop'
import LoadingScreen from './components/LoadingScreen'

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode]);

  useEffect(() => {
    // Yükleme ekranı için zamanlayıcı
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      // Yükleme ekranı kapandıktan sonra içeriği göster
      setTimeout(() => {
        setShowContent(true);
      }, 300);
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <>
      <LoadingScreen loading={isLoading} />
      <div className={`container ${showContent ? 'fade-in' : 'hidden'}`}>
        <ScrollToTop />
        <div className="theme-toggle">
          <button 
            className="theme-toggle-button" 
            onClick={() => setDarkMode(!darkMode)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <svg 
              className="sun-icon" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
            <svg 
              className="moon-icon" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </button>
        </div>
        <div className="profile-container">
          <ProfileHeader 
            name="Veysel Arslanbuğul"
            tagline="I transform problems into solutions, ideas into value."
            animate={showContent}
          />
          <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="content-area">
            <Content activeTab={activeTab} />
          </div>
        </div>
        <div className="footer">
          <p>&#169; 2025 Veysel Arslanbuğul</p>
        </div>
      </div>
    </>
  )
}

export default App
