import React, { Component } from 'react'
import './LandingPage.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { findIconDefinition, icon } from '@fortawesome/fontawesome-svg-core' 
import UserContext from '../../utils/context';

library.add(
  fas
);

const exit = findIconDefinition({ prefix: 'fas', iconName: 'times-circle' })
const exitIcon = icon(exit);

export default class LandingPage extends Component {
  static contextType = UserContext;
  state = {
    inProgress: false
  }

  render() {
    if (!window.localStorage.getItem('nowPlayingSeenLanding') && this.context.landing !== true) {
    return (
    <div className="fixed-whole-container">
      <section className="landing">
      <FontAwesomeIcon size='3x' className="exit-icon" icon={exitIcon} onClick={() => {
        this.context.setLanding(true);
        window.localStorage.setItem('nowPlayingSeenLanding', true)}
       } />
        <div className="hero">
          <h3>Enjoy the moviegoing experience in the comfort of your home</h3>
        </div>
        <div className="section-flex">
          <section className="section-one">
            <h2 className="section-h2">View a Thread</h2>
            <img className="section-img" src="https://media.giphy.com/media/Thv1sRJ70riyb2sbmC/giphy.gif" alt="gif" />
            <p className="section-p">Want to see others' reactions to a movie? Find, play, sit back, and enjoy the show!</p>
          </section>

          <hr className="underline"></hr>

          <section className="section-two">
            <h2 className="section-h2">Create a Thread</h2>
            <img className="section-img" src="https://media.giphy.com/media/iD7egFh7eQJBcCeTio/giphy.gif" alt="gif" />
            <p className="section-p">Don't see your favorite movie? Simply search, find, and be the first to create!</p>
          </section>

          <hr className="underline"></hr>

          <section className="section-three">
            <h2 className="section-h2">Comment Alongside Others</h2>
            <img className="section-img" src="https://media.giphy.com/media/jP5TY3uDAWZbOuyeu7/giphy.gif" alt="gif" />
            <p className="section-p">Participate in the conversation. Add you reactions and comments. Share your thoughts with the community!</p>
          </section>

          <hr className="underline"></hr>

          <section className="section-four">
            <h3>Test out the application:</h3>
            <p><span className="bold">Test Username:</span> tester</p>
            <p><span className="bold">Test Password:</span> Password1!</p>
          </section>
        </div>
      </section>
    </div>
    )
    }
    else {
      return null;
    }
  }
}