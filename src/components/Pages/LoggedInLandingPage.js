import React from 'react';
import styled from 'styled-components';
import Hero from '../common/Hero';
import LoggedInHeader from '../Headers/LoggedInHeader';

const LoggedInLanding = () => {
  return (
    <div className="logged-purple-overlay">
      <div className="default-fullscreen-container">
        <LoggedInHeader />
        <Hero />
      </div>
    </div>
  );
};

export default LoggedInLanding;
