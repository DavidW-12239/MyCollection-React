import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PORT } from '../config';
import '../styles/style.css'

function SignUp(){
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userAlreadyExistsError, setUserAlreadyExistsError] = useState('');
  const [userNameEmptyError, setuserNameEmptyError] = useState('');
  const [emailEmptyError, setEmailEmptyError] = useState('');
  const [passwordEmptyError, setPasswordEmptyError] = useState('');
  const [confirmPasswordEmptyError, setConfirmPasswordEmptyError] = useState('');
  const [passwordDifferentError, setPasswordDifferentError] = useState('');
  const navigate = useNavigate();

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
    setuserNameEmptyError('');
    setUserAlreadyExistsError('');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailEmptyError('');
    setUserAlreadyExistsError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordEmptyError('');
    setUserAlreadyExistsError('');
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordEmptyError('');
    setPasswordDifferentError('');
    setUserAlreadyExistsError('');
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    if (userName.trim() === '') {
      setuserNameEmptyError('User name cannot be empty');
      return;
    }

    if (email.trim() === '') {
      setEmailEmptyError('Email cannot be empty');
      return;
    }

    if (password.trim() === '') {
      setPasswordEmptyError('Password cannot be empty');
      return;
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordEmptyError('Confirm password cannot be empty');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordDifferentError('The password should be the same');
      return;
    }

    fetch(`http://localhost:${PORT}/user/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userName, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate(`/home/${data.userId}`);
        } else {
          setUserAlreadyExistsError(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleLoginPage = () => {
    navigate(`/`);
  };

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <label>
          Username:
          <input
            type="text"
            value={userName}
            onChange={handleUserNameChange}
          />
        </label>
        {userNameEmptyError && <div className="error-message">{userNameEmptyError}</div>}
        <br />
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        {emailEmptyError && <div className="error-message">{emailEmptyError}</div>}
        {userAlreadyExistsError && <div className="error-message">{userAlreadyExistsError}</div>}
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        {passwordEmptyError && <div className="error-message">{passwordEmptyError}</div>}
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange }
          />
        </label>
        {confirmPasswordEmptyError && <div className="error-message">{confirmPasswordEmptyError}</div>}
        {passwordDifferentError && <div className="error-message">{passwordDifferentError}</div>}
        <br />
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={handleLoginPage}>Return to Login Page</button>
    </div>
  );
}

export default SignUp;