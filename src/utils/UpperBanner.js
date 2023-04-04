import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate, useLocation} from 'react-router-dom';
import '../styles/UpperBanner.css'

function UpperBanner({ userName, isLoggedIn, onBack }) {
  const navigate = useNavigate();
  const { userId } = useParams();
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [titleEmptyError, setTitleEmptyError] = useState('');
  
  const handleSignOut = () => {
    localStorage.removeItem('userId');
    navigate(`/`);
  };

  const handleLoginPage = () => {
    navigate(`/`);
  };

  const handleHomePage = () => {
    navigate(`/home/${userId}`);
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
    setTitleEmptyError('');
  }

  const handleOnSearch = () => {
    if (title.trim() === ''){
      setTitleEmptyError('Input cannot be empty');
      return;
    }
    navigate(`/${userId}/collection/collections?title=${encodeURIComponent(title.toString())}`);
  }

  const isHomePage = location.pathname === `/home/${userId}`;

  return (
    <div className="upper-banner">
      <div className="left-side">
        {isHomePage ? (
          <button onClick={handleHomePage} className="left-buttons">Home</button>
        ) : (
          <>
            <button onClick={handleHomePage} className="left-buttons">Home</button>
            <button onClick={onBack} className="left-buttons">Back</button>
          </>
        )}
        <input
          type="text"
          className="search-input"
          placeholder="Search collection title..."
          onChange={handleTitleChange}
        />
        {titleEmptyError && <div className="error-message">{titleEmptyError}</div>}
        <button value={title} onClick={handleOnSearch} className="left-buttons">Search</button>
      </div>

      <div className="welcome-text">Welcome, {userName ? userName : 'Guest'}</div>
      
      {isLoggedIn ? (
        <button className="user-act-btn" onClick={handleSignOut}>
          Sign Out
        </button>
      ) : (
        <button className="user-act-btn" onClick={handleLoginPage}>
          Log In
        </button>
      )}
    </div>
  );
}


export default UpperBanner;