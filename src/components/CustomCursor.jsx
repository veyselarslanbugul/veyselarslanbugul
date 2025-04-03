import React, { useEffect, useState } from 'react';
import '../styles/Cursor.css';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    // İmleç pozisyonunu takip et
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    // Tıklama efekti
    const onMouseDown = () => {
      setClicked(true);
    };

    const onMouseUp = () => {
      setClicked(false);
    };

    // Hover efekti için tüm tıklanabilir öğeleri seç
    const addLinkHoverEvents = () => {
      const handleLinkHoverStart = () => setLinkHovered(true);
      const handleLinkHoverEnd = () => setLinkHovered(false);

      document.querySelectorAll('a, button, .nav-tab, .job-card, .skill-tag, .social-icon').forEach(el => {
        el.addEventListener('mouseenter', handleLinkHoverStart);
        el.addEventListener('mouseleave', handleLinkHoverEnd);
      });

      return () => {
        document.querySelectorAll('a, button, .nav-tab, .job-card, .skill-tag, .social-icon').forEach(el => {
          el.addEventListener('mouseenter', handleLinkHoverStart);
          el.addEventListener('mouseleave', handleLinkHoverEnd);
        });
      };
    };

    // İmlecin görünürlüğünü kontrol et
    const onMouseEnter = () => setHidden(false);
    const onMouseLeave = () => setHidden(true);

    // Event listener'ları ekle
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);

    const cleanupLinkHoverEvents = addLinkHoverEvents();

    // Temizleme işlemi
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      cleanupLinkHoverEvents();
    };
  }, []);

  // Orijinal imleci gizle
  useEffect(() => {
    document.body.style.cursor = 'none';
    
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, []);

  const cursorDotStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden ? 0 : 1
  };

  const cursorOutlineStyle = {
    left: `${position.x}px`,
    top: `${position.y}px`,
    opacity: hidden ? 0 : 1
  };

  return (
    <>
      <div 
        className={`cursor-dot ${clicked ? 'active' : ''} ${linkHovered ? 'cursor-hover' : ''}`}
        style={cursorDotStyle}
      />
      <div 
        className={`cursor-outline ${clicked ? 'active' : ''} ${linkHovered ? 'cursor-hover' : ''}`}
        style={cursorOutlineStyle}
      />
    </>
  );
};

export default CustomCursor;
