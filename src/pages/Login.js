import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PORT } from '../config';
import '../styles/style.css'
import '../styles/login-signup.css'

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
                          <h2 class="welcome">Log In</h2>
                          <p class="welcome welcome_p">To Your Account</p>
                          <form onSubmit={handleLogin} class="login_form">
                            <input type="text" class="login_input" name="text" placeholder="Email Address" value={email} onChange={handleEmailChange}/>
                            {emailEmptyError && <div className="error-message">{emailEmptyError}</div>}
                            {emailFormatError && <div className="error-message">{emailFormatError}</div>}
                            {invalidUsernameOrPasswordError && <div className="error-message">{invalidUsernameOrPasswordError}</div>}
                            <input type="password" class="login_input" name="password" placeholder="User Password" value={password} onChange={handlePasswordChange}/>
                            {passwordEmptyError && <div className="error-message">{passwordEmptyError}</div>}
                            <button class="login_submit" type="submit" onClick={handleLogin}>Log In</button>
                          </form>
                          <p class="account">Don't have an account? <button class="login_submit" onClick={handleSignUpPage}>Register</button></p>
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

export default Login;
