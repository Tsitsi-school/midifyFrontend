import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '/Users/tnyamutswa/thesis/Midify Frontend/midify/src/themes.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import '../headerStyles.css';
import '../pageStyles.css';
import ThemeSwitcher from '../common/themeSwitcher';

const LoggedInHeader = () => {
  return (
    <header className="logged-header-container">
       <div className="left-links">
        <h1 className="logo">Midify</h1>
      </div>

      <div className="center-links">
        <Link className="styled-link" to="/home">Home</Link>
        <Link className="styled-link" to="/history">History</Link>
        <Link className="styled-link" to="/about">About</Link>
      </div>

      <div className="right-links">
        <Link className="styled-profile-link" to="/profile">
          <AccountCircleOutlinedIcon style={{ fontSize: '60px'}} />
        </Link>        
        <ThemeSwitcher />
      </div>
    </header>
  );
};

export default LoggedInHeader;
