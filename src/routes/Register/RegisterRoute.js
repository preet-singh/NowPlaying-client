//Dependencies
import React from 'react';
import Header from '../../components/Header/Header';
import RegisterForm from '../../components/RegisterForm/RegisterForm';
//Components



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