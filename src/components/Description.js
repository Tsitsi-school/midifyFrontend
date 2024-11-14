import React from 'react';
import styled from 'styled-components';

const DescriptionContainerTitle = styled.h3`
  margin-top: 80px;
  padding-bottom: 10px;
  font-size: 3rem;
  color: var(--description-color);
  text-align: left; /* Ensures the title is left-aligned */

`;

const DescriptionContainerText = styled.p`
  padding-top: 20px;
  border-top: 5px solid var(--divider-color);
  font-size: 1.2rem;
  color: var(--description-color);
  text-align: left; /* Ensures the title is left-aligned */

`;

const Description = () => (
    <div>
        <DescriptionContainerTitle>
            What is MIDI
        </DescriptionContainerTitle>
        <DescriptionContainerText>
            A MIDI (Musical Instrument Digital Interface) file is a digital format used to store musical
            performance data rather than actual audio. Unlike audio files, which contain recordings of sound, MIDI files contain instructions
            for how music should be played, including notes, timing, and dynamics. These instructions can be interpreted by various electronic instruments, synthesizers, 
            or software to produce music. MIDI is widely used in music production, especially in digital music creation, as it allows composers and producers to easily edit,
            manipulate, and arrange music without needing to record actual instruments. It's also popular for transferring music data between different devices or software.
        </DescriptionContainerText>
    </div>
);

export default Description;
