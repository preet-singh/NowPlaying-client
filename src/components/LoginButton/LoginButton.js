//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';


function LoginButton() {
  return(
    <div className="LoginButton">
      <Link to="/login"><img src="#" alt="Login button" /></Link>
    </div>
  );
}

export default LoginButton;