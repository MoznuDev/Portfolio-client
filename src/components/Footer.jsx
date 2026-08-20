import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaVimeoV, FaYoutube } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';

const Footer = () => {
  const [email, setEmail] = useState('');
  
  // স্বয়ংক্রিয়ভাবে বর্তমান বছর নেওয়ার জন্য
  const currentYear = new Date().getFullYear();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with: ${email}`);
      setEmail('');
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-inner">
        
        {/* Top Newsletter Card */}
        <div className="newsletter-box">
          <h2 className="newsletter-heading">Subscribe Newsletters</h2>
          <form className="newsletter-input-container" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="subscribe-button">
              <span>Subscribe Me</span>
              <HiArrowRight className="btn-arrow-icon" />
            </button>
          </form>
        </div>

        {/* Middle Navigation & Socials */}
        <div className="footer-nav-social">
          <ul className="footer-links">
            <li><NavLink to="/about">ABOUT US</NavLink></li>
            <li><NavLink to="/discover">DISCOVER</NavLink></li>
            <li><NavLink to="/explore">EXPLORE</NavLink></li>
            <li><NavLink to="/books">BOOKS</NavLink></li>
          </ul>

          <div className="footer-social-icons">
            <NavLink to="https://facebook.com" target="_blank" rel="noreferrer"><FaFacebookF /></NavLink>
            <NavLink to="https://twitter.com" target="_blank" rel="noreferrer"><FaTwitter /></NavLink>
            <NavLink to="https://vimeo.com" target="_blank" rel="noreferrer"><FaVimeoV /></NavLink>
            <NavLink to="https://youtube.com" target="_blank" rel="noreferrer"><FaYoutube /></NavLink>
          </div>
        </div>

        {/* Separator Line */}
        <div className="footer-line"></div>

        {/* Bottom Bar */}
        <div className="footer-bottom-row">
          {/* গতিশীল (Dynamic) সাল যুক্ত কপিরাইট টেক্সট */}
          <div className="copyright-text">
            © {currentYear} Themes-Park All rights reserved.
          </div>

          {/* Exact Logo SVG Box matching Image */}
          <div className="brand-logo">
            <div className="logo-icon-bg">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="#84ecf6" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M8 7H13C14.6569 7 16 8.34315 16 10C16 11.6569 14.6569 13 13 13H8V7Z" stroke="#84ecf6" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M8 13H12C13.6569 13 15 14.3431 15 16C15 17.6569 13.6569 19 12 19H8V13Z" stroke="#84ecf6" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="logo-title">Moznur Rahman</span>
          </div>

          <div className="legal-policies">
            <NavLink to="/terms">Terms of Service</NavLink>
            <NavLink to="/privacy">Privacy Policy</NavLink>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;