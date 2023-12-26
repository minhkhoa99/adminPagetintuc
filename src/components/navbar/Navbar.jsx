import React, { useEffect, useState } from "react";
import {toggleSidebar, toggleTheme, isLight} from "../../js/script";
import { Button } from "react-bootstrap";
import './navbar.css';

export default function Navbar() {

    useEffect(() => {
        const sidebarToggle = document.querySelector("#sidebar-toggle");
    const themeToggle = document.querySelector(".theme-toggle");

    const handleSidebarToggle = () => {
      toggleSidebar();
    };

    const handleThemeToggle = () => {
      toggleTheme();
    };

    if (sidebarToggle) {
      sidebarToggle.addEventListener("click", handleSidebarToggle);
    }

    if (themeToggle) {
      themeToggle.addEventListener("click", handleThemeToggle);
    }

    if (isLight()) {
      toggleRootClass();
    }

    // Cleanup event listeners when component unmounts
    return () => {
      if (sidebarToggle) {
        sidebarToggle.removeEventListener("click", handleSidebarToggle);
      }

      if (themeToggle) {
        themeToggle.removeEventListener("click", handleThemeToggle);
      }
    };
      }, []); // Empty dependency array ensures that this effect runs only once after the initial render
    
      const toggleRootClass = () => {
        const current = document.documentElement.getAttribute('data-bs-theme');
        const inverted = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-bs-theme', inverted);
      };

  return (
   <React.Fragment>

     <nav className="navbar navbar-expand px-3 border-bottom">
                <button className="btn" id="sidebar-toggle" type="button">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse navbar">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <Button className="logout" id="btn-logout">
                            Đăng xuất
                            </Button>
                        </li>
                    </ul>
                </div>
            </nav>
    
   </React.Fragment>
  );
}
