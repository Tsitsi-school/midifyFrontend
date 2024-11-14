import React from 'react';
import styled from 'styled-components';
import '/Users/tnyamutswa/thesis/Midify Frontend/midify/src/themes.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';


const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; /* Enables absolute positioning for CenterLinks */
  padding: 30px 150px;
  background-color: transparent;
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
  font-size: 3rem;
  font-weight: bold;
  cursor: pointer;
    z-index: 2;

`;

const LeftLinks = styled.div`
  display: flex;
  align-items: center;
  flex: 0.2; /* Pushes CenterLinks to the center */
    z-index: 2;

`;

const CenterLinks = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  gap: 50px; /* Space between each link */
    z-index: 2;

`;

const RightLinks = styled.div`
  display: flex;
  align-items: center;
  flex: 0.05; /* Ensures RightLinks stay on the right */
  justify-content: flex-end;
    z-index: 2;

`;

const Link = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;  
  z-index: 2;

  
  &:hover {
    color: #ddd;
  }
`;

const ProfileIcon = styled(AccountCircleOutlinedIcon)`
  font-size: 3rem !important;
  cursor: pointer;
  color: white;
    z-index: 2;

`;


const LoggedInHeader = () => {
  return (
    <HeaderContainer>
      <PurpleOverlay />
      <LeftLinks>
        <Logo>Midify</Logo>
      </LeftLinks>
      
      <CenterLinks>
        <Link href="/home">Home</Link>
        <Link href='/history'>History</Link>
        <Link href="/about">About</Link>
      </CenterLinks>

      <RightLinks>
        <Link href="/profile">
          <ProfileIcon />
        </Link>
      </RightLinks>
    </HeaderContainer>
  );
};

export default LoggedInHeader;
