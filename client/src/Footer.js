import React from 'react';
import { FaLinkedin, FaFacebook, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'white', padding: '30px', textAlign: 'center', position: 'fixed', bottom: 0, left: '0', width: '100%' }}>
      <div>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
          <FaLinkedin size={30} style={{ marginRight: '10px' }} />
        </a>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebook size={30} style={{ marginRight: '10px' }} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter size={30} />
        </a>
      </div>
      <div style={{ marginTop: '20px', marginRight: '30px' }}>
        <a href="/about" style={{ marginRight: '10px' }}>About Dates by Ruby</a>
        <a href="/faq" style={{ marginRight: '10px' }}>FAQ</a>
        <a href="/success-stories">Success Stories</a>
      </div>
    </footer>
  );
};

export default Footer;
