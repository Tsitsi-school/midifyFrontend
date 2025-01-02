import React from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import '../headerStyles.css';

const PageHeader = () => {
  return (
    <header className="header-container">
      <div className="left-links">
        <h1 className="logo">Midify</h1>
      </div>

      <div className="center-links">
        <Link className="styled-link" to="/home">Home</Link>
        <Link className="styled-link" to="/history">History</Link>
        <Link className="styled-link" to="/about">About</Link>
      </div>

      <div className="right-links">
        <Link className="styled-link" to="/profile">
          <AccountCircleOutlinedIcon className="profile-icon" />
        </Link>
      </div>
    </header>
  );
};

export default PageHeader;
