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
import './HomePage.css';

//Token
import TokenService from '../../utils/token-service'

class HomePageRoute extends React.Component {
  static contextType = UserContext;
  render() {
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
          {this.context.playing ? this.context.displayCommentBox ? <FixedBar /> : <img onClick={() => this.context.displayCommentSection()} id='open_chatbox' src="#" alt='open chat box'></img> : ''}
        </main>
      </div>
    );
  }
}

export default HomePageRoute;