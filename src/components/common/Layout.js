import React from "react";
import "../pageStyles.css"

const Layout = ({ header: HeaderComponent, children }) => {
  return (
    <div>
      {/* Render the dynamic header */}
      {HeaderComponent && <HeaderComponent />}
      <div className="app-container">
        {/* Render the page content */}
        <div className="page-content">
          {children}
        </div>
      </div>
    </div>
      );
   
};

export default Layout;
