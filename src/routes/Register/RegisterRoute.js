//Dependencies
import React from 'react';
import Header from '../../components/Header/Header';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
//Components


//Style
import './RegisterRoute.css';


function RegisterRoute(props) {
  return(
    <div className="Register">
      <Header />
      <main>
        <RegisterForm 
          history={props.history}
        />
      </main>
    </div>
  );

}

export default RegisterRoute;