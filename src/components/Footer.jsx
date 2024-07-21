import React from 'react';
import './Footer.css';


const Footer = () => {
  return (
    <footer className="footer">
      {/* Links */}
      <div className="links">
        <a href="#privacy">Privacy Policy</a>
        <a href="#terms">Terms of Service</a>
        <a href="#about">About Us</a>
      </div>

      {/* Social Media Icons */}
      <div className="social-media">
        <a href="#facebook"><img src="/public/assets/a.jpg" alt="Facebook" /></a>
        <a href="#twitter"><img src="/public/assets/a.jpg" alt="Twitter" /></a>
        <a href="#instagram"><img src="/public/assets/a.jpg" alt="Instagram" /></a>
      </div>

      {/* Contact Information */}
      <div className="contact">
        <p>Contact us: contact@website.com</p>
      </div>
    </footer>
  );
}

export default Footer;