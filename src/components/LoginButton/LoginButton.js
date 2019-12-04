//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

//Style
import './LoginButton.css'
import TokenService from '../../utils/token-service';

function LoginButton() {
  if(TokenService.hasAuthToken()){
    return (
      <Link to='/'>
        <button id='logout_button' onClick={() => TokenService.clearAuthToken()}>
          Log out
        </button>
      </Link>
    )
  }
  
  else{
    return(
      <div className="LoginButton">
        <Link to="/login"><img src="#" alt="Login button" /></Link>
      </div>
    );
  }
}

export default LoginButton;

// <Link to="/login"><img src="#" alt="Login button" /></Link> was for line 8