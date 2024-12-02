import React from 'react';
import styled from 'styled-components';
import DefaultHeader from '../Headers/DefaultHeader';
import Hero from '../common/Hero';

const FullscreenContainer = styled.div`
  height: 100vh; /* Full screen height */
  width: 100vw;  /* Full screen width */
  background-image: url('/background.png'); /* Background image for the default landing */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  display: flex;
  flex-direction: column;
`;

const DefaultLanding = () => {
  return (
    <FullscreenContainer>
        <DefaultHeader />
        <Hero />
    </FullscreenContainer>
  );
};

export default DefaultLanding;
