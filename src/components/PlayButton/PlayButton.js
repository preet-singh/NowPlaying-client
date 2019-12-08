import React from 'react';
import './PlayButton.css'
import UserContext from '../../utils/context';

class PlayButton extends React.Component {
  static contextType = UserContext;

  handlePlay = async e => {
    e.preventDefault();
      await this.context.setPaused(!this.context.paused)
      if (this.context.paused === true) {
      this.context.pauseInterval();
      }
      else {
        this.context.startInterval();
      }
  }
  render() {
    return (
      <button id='play-button' type='button' onClick={(e) => this.handlePlay(e)}>
        {this.context.paused ? 'Resume' : 'Pause'}
      </button>
    )
  }
}

export default PlayButton;
