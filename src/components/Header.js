import React from 'react';

const Header = () => {
  return (
    <header>
      {/* Logo */}
      <div className="logo">
        <img src="/public/assets/a.jpg" alt="Logo" />
      </div>

      {/* Navigation Menu */}
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#prizes">Prizes</a></li>
          <li><a href="#faq">FAQ</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* User Login/Register */}
      <div className="user">
        <a href="#login">Login / Register</a>
      </div>
    </header>
  );
}

export default Header;
