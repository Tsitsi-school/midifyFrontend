import React from 'react';
import styled from 'styled-components';
import '/Users/tnyamutswa/thesis/Midify Frontend/midify/src/themes.css';


const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 80px 150px;
  background-color: transparent;
  // color: white;
  z-index: 2;
`;

const PurpleOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--overlay-color); /* Adjust alpha for transparency */
  z-index: 1; /* Ensures it sits above the background but below content */
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 2;
`;

// const NavLinks = styled.nav`
//   display: flex;
//   align-items: center;
// `;

const LeftLinks = styled.div`
  display: flex;
  align-items: center;
  z-index: 2;
`;

const RightLinks = styled.div`
  display: flex;
  align-items: center;
  z-index: 2;
  `;

  const Link = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  margin-right: 50px; /* Adds spacing between each link */
  z-index: 2;
  &:last-child {
    margin-right: 0; /* Removes margin after the last link */
  }

  &:hover {
    color: #ddd;
  }
`;

const ProfileIcon = styled.div`
  width: 35px;
  height: 35px;
  background-color: #2680eb;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
  z-index: 2;
`;


const LoggedInHeader = () => {
  return (
    <HeaderContainer>
      <PurpleOverlay />
      <Logo>Midify</Logo>
        <LeftLinks>
          <Link href="#home">Home</Link>
          <Link href='#history'>History</Link>
          <Link href="#about">About</Link>
        </LeftLinks>
        <RightLinks>
        <ProfileIcon>👤</ProfileIcon> 
        </RightLinks>
    </HeaderContainer>
  );
};

export default LoggedInHeader;
