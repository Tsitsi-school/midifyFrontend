import React from "react";
import "../pageStyles.css"

const Layout = ({header: HeaderComponent, children}) => {
    return (
        <div>
            {HeaderComponent && <HeaderComponent/>}
            <div className="app-container">
                <div className="page-content">
                    {children}
                </div>
            </div>
        </div>
    );

};

export default Layout;
