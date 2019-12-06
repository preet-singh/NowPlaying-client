//Dependencies
import React from 'react';
import {withRouter} from 'react-router-dom';

//Components
import Header from '../../components/Header/Header';


function NotFoundRoute(props) {
  setTimeout(() => {
    props.history.push('/');
  }, 5000);
  return(
    <div className="NotFound">
      <Header />
      <main>
        <h3>You have stumbled onto the wrong page! You are being redirected in 5 seconds...</h3>
      </main>
    </div>
  );

}

export default withRouter(NotFoundRoute);