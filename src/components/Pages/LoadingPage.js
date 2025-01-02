import React from 'react';
import '../pageStyles.css';

const LoadingPage = ({ fileName, progress }) => {
  return (
    <div className="loading-container">
      <p class="loading-text">
        <span>L</span><span>o</span><span>a</span><span>d</span><span>i</span><span>n</span><span>g</span>
      </p>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
      <p className="progress-text">{progress}%</p>
    </div>
  );
};

export default LoadingPage;
