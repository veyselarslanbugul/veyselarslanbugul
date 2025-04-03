import React, { useEffect, useState } from 'react';
import '../styles/Parallax.css';

const ParallaxBackground = () => {
  const [elements, setElements] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Paralaks elemanlarını oluştur
  useEffect(() => {
    const shapes = [];
    const types = ['circle', 'square', 'triangle'];
    
    // 15 rastgele şekil oluştur
    for (let i = 0; i < 15; i++) {
      const type = types[Math.floor(Math.random() * types.length)];
      const size = Math.random() * 80 + 20; // 20-100px arası
      
      shapes.push({
        id: i,
        type,
        size,
        x: Math.random() * 100, // % olarak x pozisyonu
        y: Math.random() * 100, // % olarak y pozisyonu
        depth: Math.random() * 0.05 + 0.02, // 0.02-0.07 arası derinlik faktörü
        initialX: Math.random() * 100,
        initialY: Math.random() * 100,
      });
    }
    
    setElements(shapes);
  }, []);

  // Fare hareketini izle
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Fare pozisyonunu normalize et (-1 ile 1 arasında)
      const x = (clientX / innerWidth) * 2 - 1;
      const y = (clientY / innerHeight) * 2 - 1;
      
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="parallax-bg">
      {elements.map((element) => {
        // Fare hareketine göre pozisyonu hesapla
        const offsetX = mousePosition.x * element.depth * 100;
        const offsetY = mousePosition.y * element.depth * 100;
        
        const style = {
          width: element.type !== 'triangle' ? `${element.size}px` : 'auto',
          height: element.type !== 'triangle' ? `${element.size}px` : 'auto',
          left: `calc(${element.initialX}% + ${offsetX}px)`,
          top: `calc(${element.initialY}% + ${offsetY}px)`,
          transition: 'transform 0.1s ease-out',
        };
        
        return (
          <div
            key={element.id}
            className={`parallax-element parallax-${element.type}`}
            style={style}
          />
        );
      })}
    </div>
  );
};

export default ParallaxBackground;
