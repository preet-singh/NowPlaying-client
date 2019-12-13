//Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

//Components
import Login from '../../components/Login/Login';
import LoginButton from '../../components/LoginButton/LoginButton';
import './Header.css';
import TokenService from '../../utils/token-service'

//images

function Header(props) {
  return(
    <div className="Header">
      <Link to='/'><h1><span>N<img src="https://i.imgur.com/uTCb1eb.png" className="header-o" />W </span> PLAYING</h1></Link>
      <LoginButton classNames="header-login mobile-hide" />
      <LoginButton classNames="mobile-login tablet-hide" />
    </div>

  );
}

export default Header;