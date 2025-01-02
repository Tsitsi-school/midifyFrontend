import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '/Users/tnyamutswa/thesis/Midify Frontend/midify/src/themes.css';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import '../headerStyles.css';

const LoggedInHeader = () => {
  return (
    <header className="logged-header-container">
      <div className="logged-left-links">
        <h1 className="logged-logo">Midify</h1>
      </div>
      
      <div className="logged-center-links">
        <Link className="logged-styled-link" to="/home">Home</Link>
        <Link className="logged-styled-link" to="/history">History</Link>
        <Link className="logged-styled-link" to="/about">About</Link>
      </div>

      <div className="logged-right-links">
        <Link className="logged-styled-link" to="/profile">
          <AccountCircleOutlinedIcon className="profile-icon" />
        </Link>
      </div>
    </header>
  );
};

export default LoggedInHeader;
