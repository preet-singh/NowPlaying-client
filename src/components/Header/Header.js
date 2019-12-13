//Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

//Components
import LoginButton from '../../components/LoginButton/LoginButton';

//CSS
import './Header.css';

//images
import glowingWhite from '../../assets/white-play-button-glow.png'

function Header(props) {
  return(
    <div className="Header">
      <Link to='/'><h1><span>N<img src={glowingWhite} className="header-o" alt="glowing o"/>W </span> PLAYING</h1></Link>
      <div className="under-bar"><Link to="" onClick={(e) => console.log('delete about local storage')} className="about-link">ABOUT</Link><LoginButton classNames="log-button" /></div>
    </div>

  );
}

export default Header;