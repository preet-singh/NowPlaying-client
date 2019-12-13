import React from 'react';
import './PlayButton.css'
import UserContext from '../../utils/context';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { findIconDefinition, icon } from '@fortawesome/fontawesome-svg-core'  

library.add(
  fas
);

const play = findIconDefinition({ prefix: 'fas', iconName: 'play' })
const playIcon = icon(play);

const pause = findIconDefinition({ prefix: 'fas', iconName: 'pause' })
const pauseIcon = icon(pause);

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
      <button className='fixed-play-button' type='button' onClick={(e) => this.handlePlay(e)}>
          <FontAwesomeIcon className="play" icon={this.context.paused ? playIcon : pauseIcon} />
      </button>
    )
  }
}

export default PlayButton;
