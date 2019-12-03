//Dependencies
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

//Components
import Login from '../../components/Login/Login';
import LoginButton from '../../components/LoginButton/LoginButton';
import './Header.css';

//images

function pathSpecificLogin(location) {
  if (location.pathname === "/") {
    return <Login />;
  }
  else if (location.pathname === "/register" || location.pathname === "/login") {
    return;
  }
  else {
    return <LoginButton />;
  }
}

function Header(props) {
  let location = useLocation();
  return(
    <div className="Header">
      <Link to='/'>
      </Link>
      {pathSpecificLogin(location)}
    </div>

  );
}

export default Header;