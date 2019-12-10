//Dependencies
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

//Components
import Login from '../../components/Login/Login';
import LoginButton from '../../components/LoginButton/LoginButton';
import './Header.css';
import TokenService from '../../utils/token-service'

//images

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

function Header(props) {
  let location = useLocation();
  return(
    <div className="Header">
      <Link to='/'><h1><span>N<img src="https://i.imgur.com/uTCb1eb.png" className="header-o" />W </span> PLAYING</h1></Link>
      <LoginButton classNames="header-login mobile-hide" />
      <LoginButton classNames="mobile-login tablet-hide" />
      {/* {pathSpecificLogin(location)} */}
    </div>

  );
}

export default Header;