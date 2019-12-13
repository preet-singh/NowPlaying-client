import React from 'react';
import './FixedBar.css'
import AddCommentBox from '../../components/AddCommentBox/AddCommentBox';
import PlayButton from '../../components/PlayButton/PlayButton'
import UserContext from '../../utils/context';
import {Link} from 'react-router-dom';

class FixedBar extends React.Component {
  static contextType = UserContext;

  convertTimeString = timeValue => {
    if(timeValue < 10) {
      return `0${timeValue}`;
    }
    else {
      return `${timeValue}`;
    }
  }

  convertSeconds = seconds => {
    let secondsValue = seconds % 60;
    let hoursValue = seconds > 3600 ? (seconds - (seconds % 3600)) / 3600 : 0;
    let minutesValue = seconds < 3600 ? (seconds - secondsValue) / 60 : (seconds - secondsValue) % 3600 / 60
    let timeArray = [hoursValue, minutesValue, secondsValue]
    let timeStringArray = timeArray.map(time => this.convertTimeString(time))

    let timeString = timeStringArray.join(':')
    return timeString;
  }

  render() {
    return (
      <div className='fixed-bar'>
        <div className='fixed-bar-header'>
        {this.context.displayCommentBox ? <button id='close_commentBox' onClick={() => this.context.displayCommentSection()}>-</button> : null}
          <h2><Link to={`/${this.context.category}/${this.context.playingID}`}>{this.context.playingTitle}</Link></h2>
        <div className="fixed-time"><h3 className='media-timer'>{this.convertSeconds(this.context.mediaTimer)}</h3><PlayButton clearInterval={this.clearInterval} restartInterval={this.restartInterval} /></div>
        </div>
        <AddCommentBox />
      </div>
    )
  }
}

export default FixedBar;