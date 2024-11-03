import React from 'react';
import styled from 'styled-components';
import Hero from './Hero';
import LoggedInHeader from './LoggedInHeader';

// Container with fullscreen background
const FullscreenContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: url('/background.png'); /* Adjust the path if needed */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  display: flex;
  flex-direction: column;
`;

const LoggedInLanding = () => {
  return (
    <FullscreenContainer>
      <LoggedInHeader />
      <Hero />
    </FullscreenContainer>
  );
};

export default LoggedInLanding;
