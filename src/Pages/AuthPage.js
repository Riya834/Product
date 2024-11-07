import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import '../Css/SignPage.css';
import googleIcon from '../Images/google icon.png';
import facebookIcon from '../Images/facebook icon.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
      });
      alert(response.data.message);
      navigate('/home');
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
      navigate('/home');
    } catch (error) {
      alert(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      alert(`Welcome back, ${user.displayName}`);
      navigate('/home');
    } catch (error) {
      alert(error.message);
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="auth-container">
      <div className="button-container">
        <button className={`auth-button ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Log In</button>
        <button className={`auth-button ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Sign Up</button>
      </div>
      <div className={`formContainer ${isLogin ? 'login' : 'signup'}`}>
        {isLogin ? (
          <div className="form">
            <h1 className="welcome-title">Welcome Back!</h1>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label htmlFor="email">Work Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@site.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button type="button" className="show-password-btn" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-btn login-btn">Log In</button>
            </form>
            <div className="social-buttons">
              <div className="google-btn" onClick={handleGoogleSignIn}>
                <img src={googleIcon} alt="Google" className="social-icon" />
              </div>
              <div className="facebook-btn" onClick={() => alert('Facebook sign-in functionality to be implemented')}>
                <img src={facebookIcon} alt="Facebook" className="social-icon" />
              </div>
            </div>
          </div>
        ) : (
          <div className="form">
            <h1>Seconds to sign up!</h1>
            <form onSubmit={handleSignUp}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="signup-email">Email</label>
                <input
                  type="email"
                  id="signup-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@site.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="password-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  <button type="button" className="show-password-btn" onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>
              </div>

              <button type="submit" className="auth-btn signup-btn">Sign Up</button>
            </form>
          </div>
        )}
        <p className="terms">
          By continuing, you accept our <a href="#">Terms & Conditions</a>.
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
