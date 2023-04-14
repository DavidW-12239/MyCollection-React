import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PORT } from '../config';
import '../styles/style.css';
import '../styles/login-signup.css'

function SignUp(){
  const [username, setUsername] = useState('');
  const [emailAlreadyExistsError, setEmailAlreadyExistsError] = useState('');
  const [usernameEmptyError, setUsernameEmptyError] = useState('');
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

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameEmptyError('');
    setEmailAlreadyExistsError('');
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailFormatError('');
    setEmailEmptyError('');
    setEmailAlreadyExistsError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordEmptyError('');
    setPasswordFormatError('');
    setEmailAlreadyExistsError('');
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordEmptyError('');
    setPasswordDifferentError('');
    setEmailAlreadyExistsError('');
  };

  const handleSignUp = (event) => {
    event.preventDefault();

    if (username.trim() === '') {
      setUsernameEmptyError('Username cannot be empty');
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

    var regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,15}$/;
		if(!regPassword.test(password)){
      setPasswordFormatError('Password must be 8-15 characters and containat least 1 lower case letter, 1 upper case letter and 1 number.');
      return;
    }

    fetch(`http://localhost:${PORT}/user/signUp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          navigate(`/home/${data.userId}`);
        } else {
          setEmailAlreadyExistsError(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleLoginPage = () => {
    navigate(`/`);
  };

  const backgroundImage = {
    backgroundImage: `url('${process.env.PUBLIC_URL}/images/example.jpg')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <div>
      <head>
        <title>Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta charset="UTF-8" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;600;700;900&display=swap" rel="stylesheet"/>        
      </head>

      <body class="login">
        <section class="w3l-hotair-form">
          <h1 class="welcome">Welcome to MyCollections</h1>
            <div class="login_container">
                <div class="workinghny-form-grid">
                    <div class="main-hotair">
                        <div class="content-wthree">
                          <h2 class="welcome">SignUp</h2>
                          <p class="welcome welcome_p">A New Account</p>
                          <form onSubmit={handleSignUp} class="login_form">
                            <input type="text" class="login_input" name="text" placeholder="Username" value={username} 
                            onChange={handleUsernameChange} size="12" maxlength="12"/>
                            {usernameEmptyError && <div className="error-message">{usernameEmptyError}</div>}
                            
                            <input type="text" class="login_input" name="text" placeholder="Email Address" value={email} 
                            onChange={handleEmailChange} size="30" maxlength="30"/>
                            {emailEmptyError && <div className="error-message">{emailEmptyError}</div>}
                            {emailFormatError && <div className="error-message">{emailFormatError}</div>}
                            {emailAlreadyExistsError && <div className="error-message">{emailAlreadyExistsError}</div>}
                            
                            <input type="password" class="login_input" name="password" placeholder="User Password" value={password} 
                            onChange={handlePasswordChange} size="15" maxlength="15"/>
                            {passwordFormatError && <div className="error-message">{passwordFormatError}</div>}
                            {passwordEmptyError && <div className="error-message">{passwordEmptyError}</div>}
                            
                            <input type="password" class="login_input" name="password" placeholder="Confirm Password" value={confirmPassword} 
                            onChange={handleConfirmPasswordChange} size="15" maxlength="15"/>
                            {confirmPasswordEmptyError && <div className="error-message">{confirmPasswordEmptyError}</div>}
                            {passwordDifferentError && <div className="error-message">{passwordDifferentError}</div>}
                            
                            <button class="login_submit" type="submit" onClick={handleSignUp}>Register</button>
                          </form>
                          <p class="account">Already registered?<button class="login_submit" onClick={handleLoginPage}>To Login Page</button></p>
                        </div>
                        <div class="w3l_form align-self" style={backgroundImage}>
                          <div class="left_grid_info"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="copyright text-center">
                <p class="copy-footer-29">Copyright &copy; 2023. MyCollections All rights reserved.</p>
            </div>
        </section>
      </body>
    </div>

    
  );
}

export default SignUp;