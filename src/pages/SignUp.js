import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PORT } from '../config';
import '../styles/style.css';

function SignUp(){
  const [userName, setUserName] = useState('');
  const [userAlreadyExistsError, setUserAlreadyExistsError] = useState('');
  const [userNameEmptyError, setuserNameEmptyError] = useState('');
  const [email, setEmail] = useState('');
  const [emailFormatError, setEmailFormatError] = useState('');
  const [emailEmptyError, setEmailEmptyError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordFormatError, setPasswordFormatError] = useState('');
  const [passwordEmptyError, setPasswordEmptyError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    setEmailFormatError('');
    setEmailEmptyError('');
    setUserAlreadyExistsError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordEmptyError('');
    setPasswordFormatError('');
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
      setuserNameEmptyError('Username cannot be empty');
      return;
    }

    if (email.trim() === '') {
      setEmailEmptyError('Email cannot be empty');
      return;
    }

    var regEmail = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
		if(!regEmail.test(email)){
      setEmailFormatError('Please enter valid email');
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

    var regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		if(!regPassword.test(password)){
      setPasswordFormatError('Password must be at least 8 characters and containat least 1 lower case letter, 1 upper case letter and 1 number.');
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
            size="10"
            maxlength="10"
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
            size="25"
            maxlength="25"
          />
        </label>
        {emailEmptyError && <div className="error-message">{emailEmptyError}</div>}
        {emailFormatError && <div className="error-message">{emailFormatError}</div>}
        {userAlreadyExistsError && <div className="error-message">{userAlreadyExistsError}</div>}
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            size="15"
            maxlength="15"
          />
        </label>
        {passwordFormatError && <div className="error-message">{passwordFormatError}</div>}
        {passwordEmptyError && <div className="error-message">{passwordEmptyError}</div>}
        <br />
        <label>
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange }
            size="15"
            maxlength="15"
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