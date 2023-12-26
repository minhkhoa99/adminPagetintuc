import React, { useEffect, useState } from "react";
import {toggleSidebar, toggleTheme, isLight} from "../../js/script";

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
                            <a href="#" data-bs-toggle="dropdown" className="nav-icon pe-md-0">
                            <img src="image/profile.jpg" className="avatar img-fluid rounded"></img>
                            </a>
                            <div className="dropdown-menu dropdown-menu-end">
                                <a href="#" className="dropdown-item">Profile</a>
                                <a href="#" className="dropdown-item">Setting</a>
                                <a href="#" className="dropdown-item">Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
    
   </React.Fragment>
  );
}
