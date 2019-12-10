//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

//Style
import './LoginButton.css'
import TokenService from '../../utils/token-service';

function LoginButton(props) {
  if(TokenService.hasAuthToken()){
    return (
        <div className="LoginButton">
              <Link to='/'><button type="button" id='logout_button' className={props.classNames} onClick={() => TokenService.clearAuthToken()}>
            LOGOUT
          </button></Link>
        </div>
    )
  }
  
  else{
    return(
      <div className="LoginButton">
        <Link to="/login"><button type="button" className={props.classNames}>LOGIN</button></Link>
      </div>
    );
  }
}

export default LoginButton;