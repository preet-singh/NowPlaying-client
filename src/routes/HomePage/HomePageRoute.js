//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Directory from '../../components/Directory/Directory';
import Happenings from '../../components/Happenings/Happenings';
import ThreadCategory from '../../components/ThreadCategory/ThreadCategory';

//Styling
import './HomePage.css'

//Token
import TokenService from '../../utils/token-service'

function HomePageRoute(props) {
  return(
    <div className="HomePage">
      <h1>Now Playing</h1>
      <div className={TokenService.hasAuthToken() ? 'signedIn_home' : 'home_eventBar'}>
        <div>
          <Header />
        </div>
        <section>
          <Happenings />
        </section>
      </div>
      <Directory />
      <main>
        <ThreadCategory />
      </main>
    </div>
  );
}

export default HomePageRoute;