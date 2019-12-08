import React from 'react';
import './FixedBar.css'
import AddCommentBox from '../../components/AddCommentBox/AddCommentBox';
import PlayButton from '../../components/PlayButton/PlayButton'
import UserContext from '../../utils/context';

class FixedBar extends React.Component {
  static contextType = UserContext;

  componentDidMount() {
    this.myInterval = setInterval(() => this.context.updateMediaTimer(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.myInterval);
  }

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
    if (this.context.playing) {
    return (
      <div className='fixed-bar'>
        <div className='fixed-bar-header'>
        <PlayButton />
        <h3 id='media-timer'>{this.convertSeconds(this.context.mediaTimer)}</h3>
        </div>
        <AddCommentBox category={this.props.category} mediaId={this.props.mediaId}/>
      </div>
    )
  }
  else {
    return null;
}
}
}

export default FixedBar;