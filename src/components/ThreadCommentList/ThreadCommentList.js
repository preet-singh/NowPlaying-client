import React from 'react';
import './ThreadCommentList.css';
import ThreadCommentItem from '../ThreadCommentItem/ThreadCommentItem';
import UserContext from '../../utils/context';

class ThreadCommentList extends React.Component {
  static contextType = UserContext;
  state = {
    comments: [],
    renderedComments: [],
    currentComment: [],
  }
  
  componentDidMount() {
    this.setState({comments: this.context.currentThreadComments})
  }
  
  // componentDidUpdate() {
  //   let copy = [];
  //   this.state.comments.forEach(comment => {
  //     if(comment.comment_timestamp === this.context.mediaTimer){
  //       copy.push(comment);
  //     }
  //   })
  //   this.setState({
  //     renderedComments: [...this.state.renderedComments, ...copy]
  //   })
  //   return copy;
  // }

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
    let copy = [];
     this.state.comments.forEach(comment => {
      if(comment.comment_timestamp === this.context.mediaTimer){
        copy.push(comment)
      }
    })
    return copy;
  }

  renderCommentList = () => {
    let comments = this.handleTimedComments();
    return comments.map(comment => {
      return (
        <ThreadCommentItem 
        username={comment.user_name} 
        comment={comment.user_comment} 
        timestamp={this.convertSeconds(comment.comment_timestamp)} 
        key={comment.id}
        />
      )
    })
  }

  render() {
    return (
      <ul className='thread-comment-list'>
        {this.renderCommentList()}
      </ul>
    )
  }
}

export default ThreadCommentList;