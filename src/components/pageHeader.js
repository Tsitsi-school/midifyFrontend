import React from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative; /* Enables absolute positioning for CenterLinks */
  padding: 20px 150px;
  background: linear-gradient(90deg, #4E31AA 0%, #3795BD 50%, #4E31AA 100%);
  color: white;
`;

const Logo = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  cursor: pointer;
`;

const LeftLinks = styled.div`
  display: flex;
  align-items: center;
  flex: 1; /* Pushes CenterLinks to the center */
`;

const CenterLinks = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  font-size: 1.8rem;
  gap: 50px; /* Space between each link */
`;

const RightLinks = styled.div`
  display: flex;
  align-items: center;
  flex: 1; /* Ensures RightLinks stay on the right */
  justify-content: flex-end;
`;

const Link = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    color: #ddd;
  }
`;

const ProfileIcon = styled(AccountCircleOutlinedIcon)`
  font-size: 3rem !important;
  cursor: pointer;
  color: white;
`;

const PageHeader = () => {
  return (
  <HeaderContainer>
    <LeftLinks>
      <Logo>Midify</Logo>
    </LeftLinks>
    
    <CenterLinks>
      <Link href="/home">Home</Link>
      <Link href="/history">History</Link>
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

export default PageHeader;
