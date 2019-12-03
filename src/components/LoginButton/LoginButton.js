//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';
import TokenService from '../../utils/token-service';

function LoginButton() {
  if(TokenService.hasAuthToken()){
    return (
      <Link to='/'>
        <button onClick={() => TokenService.clearAuthToken()}>
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