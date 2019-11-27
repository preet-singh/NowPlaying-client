//Dependencies
import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

function Login() {
  return(
    <form className="Login" name="login">
      <legend>Login</legend>
      <label for="username-input" id="username-label" name="username-label">username:</label>
      <input type="text" id="username-input" name="username-input" />
      <label for="password-input" id="password-label" name="password-label">password:</label>
      <input type="text" id="password-input" name="password-input" />
      <button type="submit" value="submit">Submit</button>
      <Link to='/register'>
      <p className="sign-up">Don't have an account?</p>
      </Link>
    </form>
  );
}

export default Login;