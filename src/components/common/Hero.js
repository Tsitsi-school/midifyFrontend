import React from 'react';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';

const HeroContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 80px);
    color: white;
    text-align: center;
    padding: 0 20px;
    overflow: hidden;
    z-index: 2;
`;

const Title = styled.h1`
    font-size: 4em;
    margin-bottom: 60px;
    max-width: 900px;
    max-height: 120px;
    font-weight: bold;


    @media (max-width: 768px) {
        font-size: 2rem;
    }

    @media (max-width: 480px) {
        font-size: 1.75rem;
    }
`;


const Description = styled.p`
    font-size: 1.5em;
    max-width: 1000px;
    max-height: 132px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
        font-size: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 0.875rem;
    }
`;

const Button = styled.button`
    padding: 15px 45px;
    background-color: #3795BD;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;

    &:hover {
        background-color: #1a5cad;
    }
`;

const Hero = () => {
    const navigate = useNavigate();

    const handleUploadClick = () => {
        navigate('/upload');
    };

    return (
        <HeroContainer>
            <Title>Convert your sheet music into MIDI files</Title>
            <Description>
                Convert sheet music into MIDI files with Midify. Upload an image, and our advanced machine learning
                technology
                will translate your notes into playable digital sound, perfect for composing, editing, and sharing your
                music.
            </Description>
            <Button onClick={handleUploadClick}>UPLOAD SHEET MUSIC</Button>
        </HeroContainer>
    );
};

export default Hero;
