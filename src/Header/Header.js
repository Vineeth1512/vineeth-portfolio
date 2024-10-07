import React, { useState } from "react";
import "./Header.css";

function Header() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };
  return (
    <header className="header">
      <div className="logo">
        <a href="#" onClick={toggleNavbar}>
          Portfolio
        </a>
      </div>
      <nav className="navbar">
        <a className="link" href="#home" style={{ "--i": 1 }}>
          Home
        </a>
        <a className="link" href="#about" style={{ "--i": 2 }}>
          About
        </a>

        <a className="link" href="#skills" style={{ "--i": 4 }}>
          Skills
        </a>
        <a className="link" href="#projects" style={{ "--i": 3 }}>
          Projects
        </a>
        <a className="link" href="#contact" style={{ "--i": 5 }}>
          Contact
        </a>
      </nav>
    </header>
  );
}

export default Header;
