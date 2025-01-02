import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import '../headerStyles.css';


const DefaultHeader = () => {

  return (
    <header className="default-header-container">
      <div className="default-purple-overlay"></div>
      <div className="default-left-links">
        <h1 className="default-logo">Midify</h1>
      </div>

      <div className="default-center-links">
        <Link className="default-styled-link" to="/home">Home</Link>
        <Link className="default-styled-link" to="/about">About</Link>
      </div>

      <div className="default-right-links">
        <Link className="default-login-link" to="/login">Login</Link>
        <button className="default-button">Sign Up</button>
      </div>
    </header>
  );
};

export default DefaultHeader;
