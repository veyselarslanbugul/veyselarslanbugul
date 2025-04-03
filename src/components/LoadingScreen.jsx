import React, { useState, useEffect } from 'react';
import '../styles/LoadingScreen.css';

const LoadingScreen = ({ loading }) => {
  const [progress, setProgress] = useState(0);
  const [text, setText] = useState('');
  const codeText = "const portfolio = { loading: true };";
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    if (loading) {
      // Sayfa yüklendiğinde animasyon başlat
      const timer = setTimeout(() => {
        // setLoading(false); // Bu satır kaldırıldı
      }, 2800); // 2.8 saniye sonra yükleme ekranını kapat

      // İlerleme çubuğu animasyonu
      const interval = setInterval(() => {
        setProgress(prevProgress => {
          const newProgress = prevProgress + 1;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 25); // Her 25ms'de ilerleme çubuğunu güncelle

      // Yazı animasyonu
      const textInterval = setInterval(() => {
        if (textIndex < codeText.length) {
          setText(prevText => prevText + codeText[textIndex]);
          setTextIndex(prevIndex => prevIndex + 1);
        } else {
          clearInterval(textInterval);
          
          // Yazı tamamlandıktan sonra kod değişimi
          setTimeout(() => {
            setText("const portfolio = { loading: false, ready: true };");
          }, 800);
        }
      }, 80);

      return () => {
        clearTimeout(timer);
        clearInterval(interval);
        clearInterval(textInterval);
      };
    }
  }, [textIndex, loading]);

  if (!loading) return null;

  return (
    <div className={`loading-screen ${loading ? 'visible' : 'hidden'}`}>
      <div className="loading-content">
        <div className="code-editor">
          <div className="editor-header">
            <span className="dot red"></span>
            <span className="dot yellow"></span>
            <span className="dot green"></span>
            <span className="file-name">portfolio.js</span>
          </div>
          <div className="editor-body">
            <div className="line-numbers">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
            <div className="code-content">
              <pre><code>{text}<span className="cursor">|</span></code></pre>
            </div>
          </div>
        </div>
        
        <div className="loading-status">
          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="loading-message">
            Yükleniyor... %{progress}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
