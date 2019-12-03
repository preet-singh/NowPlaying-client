//Dependencies
import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import AuthApiService from '../../utils/auth-service';
import UserContext from '../../utils/context';

class Login extends React.Component{
  static contextType = UserContext;

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = e.target;
    AuthApiService.postLogin({ username, password })
    .then(res => {
      username.value = '';
      password.value = '';
      this.context.processLogin(res.authToken)
      this.props.onLoginSuccess()
    })
  }
  render() {
  return(
    <form className="Login" name="login" onSubmit={this.handleSubmit}>
      <legend>Login</legend>
      <label htmlFor="username-input" id="username-label" name="username-label">username:</label>
      <input type="text" id="username-input" name="username-input" />
      <label htmlFor="password-input" id="password-label" name="password-label">password:</label>
      <input type="text" id="password-input" name="password-input" />
      <button type="submit" value="submit">Submit</button>
      <Link to='/register'>
      <p className="sign-up">Don't have an account?</p>
      </Link>
    </form>
  )
  }
}

export default Login;