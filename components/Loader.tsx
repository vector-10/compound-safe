'use client';
import React, { useState, useEffect } from 'react';

const SimpleLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.body.classList.add('loading-active');
    
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
        document.body.classList.remove('loading-active');
      }, 3000);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      
      const fallbackTimer = setTimeout(() => {
        setLoading(false);
        document.body.classList.remove('loading-active');
      }, 7000);

      return () => {
        window.removeEventListener('load', handleLoad);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  if (!loading) return null;

  return (
    <div className="page-loader">
      <div className="loader"></div>
    </div>
  );
};

export default SimpleLoader;