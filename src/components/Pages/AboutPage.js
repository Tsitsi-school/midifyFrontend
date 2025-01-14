import React from 'react';
import Header from '../Headers/pageHeader'; 
import '../pageStyles.css'; 
import Layout from '../common/Layout';

const AboutPage = () => {
  return (
    <Layout header={Header}>
      <div className="about-page-container">
        <h1 className="about-title">About</h1>
        
        <div className="about-section">
          <div className="about-section-content-container">
            <h2 className="about-section-title">Our Mission</h2>
            <p className="about-section-content">
              At Midify, our mission is to simplify the music creation process by providing musicians, composers, 
              and educators with a powerful tool that transforms sheet music into high-quality MIDI files. Whether 
              you’re a seasoned composer or just starting your musical journey, our converter is designed to save 
              you time and enhance your creative workflow.
            </p>
          </div>
        </div>

        <div className="about-section">
          <div className="about-section-content-container">
            <h2 className="about-section-title">What We Do</h2>
            <p className="about-section-content">
              Midify is an advanced tool that uses cutting-edge Optical Music Recognition (OMR) technology to convert 
              sheet music into editable MIDI files. Our converter reads your sheet music—whether it’s a scanned image, 
              or a PDF and accurately transforms it into MIDI format, preserving all the musical nuances, including tempo, 
              dynamics, and articulations.
            </p>
          </div>
        </div>

        <div className="about-section">
          <div className="about-section-content-container">
            <h2 className="about-section-title">The Technology Behind Midify</h2>
            <p className="about-section-content">
              Midify is powered by state-of-the-art Optical Music Recognition (OMR) technology, which scans and interprets 
              musical notation with exceptional accuracy. This technology identifies musical symbols on sheet music and 
              converts them into MIDI data, which can then be used in any digital audio workstation (DAW) or music software.
            </p>
          </div>
        </div>

        <div className="about-section">
          <div className="about-section-content-container">
            <h2 className="about-section-title">Contact Us</h2>
            <p className="about-section-content">
              Have questions or feedback? We'd love to hear from you! Reach out to us at support@music2midi.com or connect 
              with us on social media.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
