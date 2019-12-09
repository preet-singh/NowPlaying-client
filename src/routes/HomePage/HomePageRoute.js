//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Directory from '../../components/Directory/Directory';
import Happenings from '../../components/Happenings/Happenings';
import ThreadCategory from '../../components/ThreadCategory/ThreadCategory';
import AuthApiService from '../../utils/auth-service';
import FixedBar from '../../components/FixedBar/FixedBar';
import UserContext from '../../utils/context';
import LoginBox from '../../components/LoginBox/LoginBox';

//Styling
import './HomePage.css'

//Token
import TokenService from '../../utils/token-service'

function HomePageRoute(props) {
  return(
    <div className="HomePage">
        <div>
          <Header />
        </div>
        <section>
        {/* <div className={TokenService.hasAuthToken() ? 'signedIn_home' : 'home_eventBar'}> */}
        <div className="flex column desktop-row">
          <LoginBox />
          <Happenings />
        </div>
        </section>
      <Directory />
      <main>
        <ThreadCategory />
        <FixedBar />
      </main>
    </div>
  );
}

export default HomePageRoute;