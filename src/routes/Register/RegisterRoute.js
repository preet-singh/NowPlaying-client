//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

//Style
import './RegisterRoute.css';


function RegisterRoute() {
  return(
    <div className="Register">
      <Header />
      <main>
        <RegisterForm />
      </main>
    </div>
  );

}

export default RegisterRoute;