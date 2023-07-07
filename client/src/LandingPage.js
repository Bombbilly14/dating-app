import React, { useState } from 'react';
import './styles/LandingPage.css';
import googlePlayLogo from './images/google-play-badge.png';
import appleLogo from './images/apple-logo.png';
import Slideshow from './Slideshow';
import Footer from './Footer';
import SignIn from './SignIn';
import RegistrationForm from './RegistrationForm';
import { CSSTransition } from 'react-transition-group';
import logonobackground from './images/logonobackground.png';

const LandingPage = ({ user, setUser }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [displayForm, setDisplayForm] = useState(false);

  const handleLoginClick = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    fetch('/logout', {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json"
      }
    })
      .then(() => {
        setUser(null);
      });
  };

  const openRegistration = () => {

    setDisplayForm(true);
  };

  const closeRegistration = () => {

    setDisplayForm(false);
  };


  return (
    <div className="landing-page">
      <main className="content">
        <CSSTransition
          in={!displayForm && !loggedIn}
          timeout={500}
          classNames="ease"
          unmountOnExit
          appear
        >
          <>
            <header className="top-bar">
              <p className="logo">Dates by Ruby</p>
              {/* <img src={logonobackground} alt='logo'/> */}
              {!user ? (
                <div className="login" onClick={handleLoginClick}>
                  Log In
                </div>
              ) : (
                <div className="login" onClick={logout}>
                  Log out
                </div>
              )}
            </header>
            <div className='intro-content'>
              <div className="site-info">Discover Love's<br />Digital Evolution</div>
              <button className="join-today" onClick={openRegistration}>Join Today</button>
              <div className="get-app">Get the app</div>
              <div className="app-logos">
                <img className="app-logo apple-logo" src={appleLogo} alt="Apple Store Logo" />
                <img className="app-logo" src={googlePlayLogo} alt="Google Play Store Logo" />
              </div>
            </div>
          </>
        </CSSTransition>
        <CSSTransition
          in={displayForm}
          timeout={500}
          classNames="ease"
          unmountOnExit
          appear
        >
          <div className='registration-form'>
            <RegistrationForm setUser={setUser} closeForm={closeRegistration} />
          </div>
        </CSSTransition>
        <CSSTransition
          in={loggedIn}
          timeout={500}
          classNames="ease"
          unmountOnExit
          appear
        >
          <>
            <header className="top-bar">
            </header>
            <SignIn setUser={setUser} />
          </>
        </CSSTransition>
        <Slideshow />

        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
