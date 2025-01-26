import { React, useContext } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import "../headerStyles.css";
import ThemeSwitcher from "../common/themeSwitcher";
import AuthContext from "../../api/authContext";

const PageHeader = () => {
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
  };
  return (
    <header className="header-container">
      <div className="left-links">
        <h1 className="logo">Midify</h1>
      </div>

      <div className="center-links">
        <Link className="styled-link" to="/home">
          Home
        </Link>
        <Link className="styled-link" to="/history">
          History
        </Link>
        <Link className="styled-link" to="/about">
          About
        </Link>
      </div>

      <div className="right-links">
        <Link className="styled-profile-link" to="/profile">
          <AccountCircleOutlinedIcon style={{ fontSize: "60px" }} />
        </Link>
        <ThemeSwitcher />
        <Link
          className="styled-link logout-text"
          to="/login"
          onClick={handleLogout}
        >
          Logout
        </Link>
      </div>
    </header>
  );
};

export default PageHeader;
