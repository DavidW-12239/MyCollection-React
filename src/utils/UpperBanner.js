import React from 'react';
import '../styles/UpperBanner.css'

function UpperBanner({ userName, isLoggedIn, onSignOut, onLogIn, onBack }) {
  return (
    <div className="upper-banner">
      <div className="welcome-text">Welcome, {userName ? userName : 'Guest'}</div>
      <button onClick={onBack} className="left-buttons">Back</button>
      {isLoggedIn ? (
        <button className="user-act-btn" onClick={onSignOut}>
          Sign Out
        </button>
      ) : (
        <button className="user-act-btn" onClick={onLogIn}>
          Log In
        </button>
      )}
    </div>
  );
}

export default UpperBanner;