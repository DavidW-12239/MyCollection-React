import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PORT } from '../config';
import '../styles/style.css'

function Login() {
  const [email, setEmail] = useState('');
  const [emailEmptyError, setEmailEmptyError] = useState('');
  const [emailFormatError, setEmailFormatError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordEmptyError, setPasswordEmptyError] = useState('');
  const [invalidUsernameOrPasswordError, setInvalidUsernameOrPasswordErrorError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailFormatError('');
    setEmailEmptyError('');
    setInvalidUsernameOrPasswordErrorError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordEmptyError('');
    setInvalidUsernameOrPasswordErrorError('');
  };

  const handleLogin = (event) => {
    event.preventDefault();

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
    
    fetch( `http://localhost:${PORT}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem('userId', data.userId);
          navigate(`/home/${data.userId}`);
        } else {
          setInvalidUsernameOrPasswordErrorError(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleSignUpPage = () => {
    navigate(`/sign-up`);
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        {emailEmptyError && <div className="error-message">{emailEmptyError}</div>}
        {emailFormatError && <div className="error-message">{emailFormatError}</div>}
        {invalidUsernameOrPasswordError && <div className="error-message">{invalidUsernameOrPasswordError}</div>}
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
        <button onClick={handleLogin}>Login</button>
      </form>
      <button onClick={handleSignUpPage}>Sign-Up</button>
    </div>

  );
}

export default Login;
