//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';


function LoginRoute() {
  return(
    <div className="LoginRoute">
      <Header />
      <main>
        <Login />
      </main>
    </div>
  );

}

export default LoginRoute;