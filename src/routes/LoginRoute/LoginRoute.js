//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Login from '../../components/Login/Login';

//Styling
import './LoginRoute.css'


function LoginRoute(props) {
  return(
    <div className="LoginRoute">
      <Header />
      <main>
        <Login 
          history={props.history}
        />
      </main>
    </div>
  );

}

export default LoginRoute;