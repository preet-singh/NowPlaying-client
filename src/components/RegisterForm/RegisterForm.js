/* eslint-disable no-useless-escape */
//Dependencies
import React, { Component } from 'react';
import './RegisterForm.css'
import FormValidationError from '../FormValidationError/FormValidationError';
import AuthApiService from '../../utils/auth-service';
import { Link } from 'react-router-dom';

class RegisterForm extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       error: null,
       email: '',
       username: '',
       password: '',
       emailTouch: false,
       usernameTouch: false,
       passwordTouch: false
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleEmailTouch = e => {
    this.setState({
      emailTouch: true
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
    const credentials = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    }
    AuthApiService.newUser(credentials)
      .then(() => {
        this.props.history.push('/login');
      })
      .catch(res => {
        this.setState({
          error: res.error
        })
      })
  }

  validateEmail = () => {
    const email = this.state.email;
    const REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(email.length === 0) {
      return 'Please enter your email';
    }
    if(!REGEX.test(email)) {
      return 'Email must contain an "@" and a top-level domain (e.g. ".com")'
    }
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
    let emailError = this.validateEmail();
    let usernameError = this.validateUsername();
    let passwordError = this.validatePassword();
      return(
        <form className="Login" name="register" onSubmit={this.handleSubmit}>
          <legend>Register</legend>
          <label htmlFor="email-input">E-Mail:</label>
          <input 
            type="email" 
            id="email-input"
            name="email"
            aria-label="Email"
            placeholder='ex. john123@super.com'
            required 
            onChange={(e) => {this.handleChange(e); this.handleEmailTouch(e)}}
          />
          {this.state.emailTouch && <FormValidationError message={emailError} />}
          <label htmlFor="username-input">Username:</label>
          <input 
            type="text" 
            id="username-input" 
            name="username" 
            aria-label="Username"
            placeholder='ex. John123'
            required
            onChange={(e) => {this.handleChange(e); this.handleUsernameTouch(e)}}
          />
          {this.state.usernameTouch && <FormValidationError message={usernameError} />}
          <label htmlFor="password-input">Password:</label>
          <input 
            type="password" 
            id="password-input" 
            name="password" 
            aria-label="Password"
            autoComplete="off" 
            placeholder='******'
            required
            onChange={(e) => {this.handleChange(e); this.handlePasswordTouch(e)}}
          />
          {this.state.passwordTouch && <FormValidationError message={passwordError} />}
          <div className='error-message' role='alert'>
          {this.state.error && <p>{this.state.error}</p>}
          </div>
          <button id='reg_button' type="submit" value="submit" className="black-button" disabled={emailError || usernameError || passwordError}>Submit</button>
          <Link to='/login' className="login-link">Already have an account?</Link>
        </form>
      );
  }
}

export default RegisterForm;