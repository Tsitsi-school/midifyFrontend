import React from 'react';
import styled from 'styled-components';
import Header from './pageHeader'; // Assuming you're using a header component for navigation

const PageContainer = styled.div`
  background-color: var(--background-color);
  color: var(--text-color);
  max-height: 100%;
  height: 100%;
  width: 100%;
  max-width: 100%;
  padding: 0px 30px;
  padding-bottom: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  color: var(--title-color);
  text-align: center;
  margin-top: 10px;
  padding: 30px 0;
  
`;

const Section = styled.div`
  width: 90%; /* Ensures all sections have the same width */
  margin: 20px 0;
//   padding-bottom: 10px;
  display: flex; /* Allows inner content to be contained */
  justify-content: center; /* Centers the content */
`;

const SectionContentContainer = styled.div`
  width: 100%; /* Full width of Section to ensure border consistency */
  max-width:100%; /* Adjust based on design needs */
`;

const SectionTitle = styled.h2`
  font-size: 2.2rem;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 10px;
  border-bottom: 4px solid var(--divider-color);

`;

const SectionContent = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: var(--text-color);
  text-align: justify;
  width: 100%;
`;

const AboutPage = () => {
  return (
    <div>
      <Header />
      <PageContainer>
        <Title>About</Title>
        
        <Section>
        <SectionContentContainer>

          <SectionTitle>Our Mission</SectionTitle>
          <SectionContent>
            At Midify, our mission is to simplify the music creation process by providing musicians, composers, 
            and educators with a powerful tool that transforms sheet music into high-quality MIDI files. Whether 
            you’re a seasoned composer or just starting your musical journey, our converter is designed to save 
            you time and enhance your creative workflow.
          </SectionContent>
          </SectionContentContainer>
        </Section>

        <Section>
        <SectionContentContainer>

          <SectionTitle>What We Do</SectionTitle>
          <SectionContent>
            Midify is an advanced tool that uses cutting-edge Optical Music Recognition (OMR) technology to convert 
            sheet music into editable MIDI files. Our converter reads your sheet music—whether it’s a scanned image, 
            or a PDF and accurately transforms it into MIDI format, preserving all the musical nuances, including tempo, 
            dynamics, and articulations.
          </SectionContent>

          </SectionContentContainer>
        </Section>

        <Section>
        <SectionContentContainer>

          <SectionTitle>The Technology Behind Midify</SectionTitle>
          <SectionContent>
            Midify is powered by state-of-the-art Optical Music Recognition (OMR) technology, which scans and interprets 
            musical notation with exceptional accuracy. This technology identifies musical symbols on sheet music and 
            converts them into MIDI data, which can then be used in any digital audio workstation (DAW) or music software.
          </SectionContent>
          </SectionContentContainer>
        </Section>

        <Section>
        <SectionContentContainer>

          <SectionTitle>Contact Us</SectionTitle>
          <SectionContent>
            Have questions or feedback? We'd love to hear from you! Reach out to us at support@music2midi.com or connect 
            with us on social media.
          </SectionContent>
          </SectionContentContainer>
        </Section>

        
      </PageContainer>
    </div>
  );
};

export default AboutPage;
