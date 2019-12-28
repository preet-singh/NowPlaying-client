/* eslint-disable no-useless-escape */
//Dependencies
import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import AuthApiService from '../../utils/auth-service';
import FormValidationError from '../FormValidationError/FormValidationError';
import UserContext from '../../utils/context';

//Styling
import './Login.css'

class Login extends React.Component{
  constructor(props) {
    super(props)
  
    this.state = {
       error: null,
       username: '',
       password: '',
       usernameTouch: false,
       passwordTouch: false
    }
  }
  
  static contextType = UserContext;

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }
  
  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleUsernameTouch = e => {
    this.setState({
      usernameTouch: true
    })
  }

  handlePasswordTouch = e => {
    this.setState({
      passwordTouch: true
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    const { username, password } = e.target;

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then(res => {
        username.value = '';
        password.value = '';
        this.context.processLogin(res.authToken)
        this.props.history.push('/')
      })
      .catch(res => {
        this.setState({
          error: res.error
        })
      })
  }

  validateUsername = () => {
    const username = this.state.username;
    if(username.length === 0) {
      return 'Please enter your username';
    }
  }

  validatePassword = () => {
    const password = this.state.password;
    const REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/
    if(password.length === 0) {
      return 'Please enter your password';
    }
    if(password.length < 8 || password.length > 72) {
      return 'Password must be between 8 and 72 characters';
    }
    if(password.startsWith(' ') || password.endsWith(' ')) {
      return 'Password must not start or end with empty spaces';
    }
    if(!REGEX.test(password)) {
      return 'Password must contain at least one uppercase, lowercase, number, and special character';
    }
  }

  render() {
    let passwordError = this.validatePassword;
    let usernameError = this.validateUsername;
    return (
      <form className="Login" name="login" onSubmit={(e) => this.handleSubmit(e)}>
        <legend>LOGIN</legend>
        <input 
          type="text" 
          id="username-input" 
          name="username" 
          aria-label="Username"
          placeholder='ex. FlixMaster12'
          required
          onChange={(e) => {this.handleInputChange(e); this.handleUsernameTouch(e)}}
        />
        {this.state.usernameTouch && <FormValidationError message={usernameError} />}
        <input 
          type="password" 
          id="password-input" 
          name="password" 
          aria-label="Password"
          autoComplete="on"
          placeholder='********'
          required
          onChange={(e) => {this.handleInputChange(e); this.handlePasswordTouch(e)}}
        />
        {this.state.passwordTouch && <FormValidationError message={passwordError} />}
        <button type="submit" value="submit" className="black-button">Submit</button>
        <div className='error-message' role='alert'>
          {this.state.error && <p>{this.state.error}</p>}
        </div>
        <Link to='/register'>
          <p className="sign-up">Don't have an account?</p>
        </Link>
      </form>
    )
  }
}

export default Login;