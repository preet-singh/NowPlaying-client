//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

//Style
import './LoginButton.css'


function LoginButton() {
  return(
    <div className="LoginButton">
      <Link to="/login">Login</Link>
    </div>
  );
}

export default LoginButton;

// <Link to="/login"><img src="#" alt="Login button" /></Link> was for line 8