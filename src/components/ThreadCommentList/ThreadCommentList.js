import React from 'react';
import './ThreadCommentList.css';
import ThreadCommentItem from '../ThreadCommentItem/ThreadCommentItem';
import UserContext from '../../utils/context';

class ThreadCommentList extends React.Component {
  static contextType = UserContext;
  state = {
    comments: [],
    renderedComments: [],
    renderedComments2: [],
    currentComment: [],
    mediaTimer: '',
  }
  
  async componentDidMount() {
    await this.setState({comments: this.context.currentThreadComments})
    let renderedComments2 = await this.renderCommentList();
    await this.setState({renderedComments2});
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

  handleTimedComments = () => {
    return this.state.comments.filter(comment => {
      if(comment.comment_timestamp <= this.context.mediaTimer){
        return comment;
      }
    }) || []
  }

  renderCommentList = () => {
    let comments = this.handleTimedComments();
    // while(this.state.renderedComments.length > 10){
    //   this.state.renderedComments.shift();
    // }
    let newData =  comments.map(comment => {
      return (
        <ThreadCommentItem 
        username={comment.user_name} 
        comment={comment.user_comment} 
        timestamp={this.convertSeconds(comment.comment_timestamp)} 
        key={comment.id}
        />
      )
    })
    this.setState({renderedComments2: newData, mediaTimer: this.context.mediaTimer});
  }

  render() {
    if (this.context.mediaTimer !== this.state.mediaTimer) {
      this.renderCommentList()
    }
    return (
      <ul className='thread-comment-list'>
        {this.state.renderedComments2}
      </ul>
    )
  }
}

export default ThreadCommentList;