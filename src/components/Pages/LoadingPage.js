import React from 'react';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 80vh; /* Takes up full viewport height */
`;

const LoadingSpinner = styled.div`
  border: 25px solid var(--spinner-color-lighter); /* Increase border width for thickness */
  border-top: 25px solid var(--spinner-color-darker); /* Darker part of the spinner */
  border-radius: 80%;
  width: 120px;
  height: 120px;
  animation: spin 1s linear infinite;
  margin-bottom: 0 auto 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoadingText = styled.p`
  font-size: 1.1rem;
  color: var(--text-color);
  font-weight: 500;
`;

const LoadingPage = ({ fileName }) => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      <LoadingText>Converting {fileName} to MIDI file</LoadingText>
    </LoadingContainer>
  );
};

export default LoadingPage;
