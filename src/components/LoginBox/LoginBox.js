//Dependencies
import React from 'react';
import { useLocation } from 'react-router-dom';

//Components
import Login from '../../components/Login/Login';
import LoginButton from '../../components/LoginButton/LoginButton';
import TokenService from '../../utils/token-service'

function pathSpecificLogin(location) {
  if(!TokenService.hasAuthToken()){
    if (location.pathname === "/") {
      return <Login />;
    }
    else if (location.pathname === "/register" || location.pathname === "/login") {
      return;
    }
  }
  else {
    return <LoginButton />;
  }
}

function LoginBox(props) {
  let location = useLocation();
  return(
    <div className="LoginBox">
      {pathSpecificLogin(location)}
    </div>

  );
}

export default LoginBox;