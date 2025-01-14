import React from 'react';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import {Link} from 'react-router-dom';
import '../headerStyles.css';
import ThemeSwitcher from '../common/themeSwitcher';

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
                <Link className="styled-profile-link" to="/profile">
                    <AccountCircleOutlinedIcon style={{fontSize: '60px'}}/>
                </Link>
                <ThemeSwitcher/>


            </div>
        </header>
    );
};

export default PageHeader;
