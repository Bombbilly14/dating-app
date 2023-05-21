import React from 'react';
import './styles/LandingPage.css';  // Assuming you have a LandingPage.css file in the same directory
import googlePlayLogo from './images/google-play-badge.png';
import appleLogo from './images/apple-logo.png';
import Slideshow from './Slideshow';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="top-bar">
        <p className="logo">Dates with Ruby</p>
        <div className="login">Log In</div>
      </header>
      <div className="site-info">JOIN THE FASTEST<br/>  GROWING DATING SITE <br/> IN YOUR AREA!</div>
      <button className="join-today">Join Today</button>
      <div className="get-app">Get the app</div>
      <div className="app-logos">
        <img className="app-logo" src={appleLogo} alt="Apple Store Logo" />
        <img className="app-logo" src={googlePlayLogo} alt="Google Play Store Logo" />
        <Slideshow />
      </div>
    </div>
  );
}

export default LandingPage;