/* eslint-disable array-callback-return */
import React from 'react';
import './ThreadCommentList.css';
import ThreadCommentItem from '../ThreadCommentItem/ThreadCommentItem';
import UserContext from '../../utils/context';
import {withRouter} from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

class ThreadCommentList extends React.Component {
  static contextType = UserContext;
  state = {
    renderedComments: [],
    renderedComments2: [],
    currentComment: [],
    mediaTimer: '',
    scrolling: false,
  }
  
  async componentDidMount() {
    await this.props.getComments();
    await this.setState({comments: this.context.currentThreadComments})
    let renderedComments2 = await this.renderCommentList();
    await this.setState({renderedComments2});
  }

  componentDidUpdate() {
    let element = document.getElementById('thread-comment-list');
    if(this.state.scrolling === false && element) {
      if(element.scrollHeight >= 600){
        scroll.scrollToBottom({
          duration: 300,
          smooth: 'easeInOutQuint',
          containerId: 'thread-comment-list',
        })
      }
    }
  }

  handleScrollBegin = () => {
    this.setState({scrolling: true})
  }

  handleScrollEnd = () => {
    this.setState({scrolling: false})
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
    let comments = this.state.comments || [];
    return comments.filter(comment => {
      if(comment.comment_timestamp <= this.context.mediaTimer){
        return comment;
      }
    }) || []
  }

  renderCommentList = async () => {
    if (this.context.currentThreadComments !== this.state.comments) {
      await this.setState({comments: this.context.currentThreadComments});
    }
    let comments = this.handleTimedComments();
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
    let finalData;
    if (this.context.currentThreadComments[0]) {
    finalData = `First comment at ${this.convertSeconds(this.context.currentThreadComments[0].comment_timestamp)}`
    }
    else {
      finalData = 'No comments in this thread yet!';
    }
    if (newData.length > 0) { finalData = newData }
    this.setState({renderedComments2: finalData, mediaTimer: this.context.mediaTimer});
  }

  handleReturnToBottom = () => {
    this.setState({scrolling: false})
  }

  render() {
    if (this.props.match.params.thread === this.context.playingCategory && this.props.match.params.id === this.context.playingID) {
      if (this.context.mediaTimer !== this.state.mediaTimer) {
        this.renderCommentList()
      }
      return (
        <div id="ThreadCommentList">    
          <h4 id="comments-header">Comments</h4>
          {!this.state.scrolling ? <p onClick={() => this.handleScrollBegin()} id='stop-auto-scroll'><button className="black-button">Click here to pause auto-scroll</button></p> : <p id='resume-auto-scroll' onClick={() => this.handleReturnToBottom()}><button className="black-button">Click here to return to recent comments</button></p>}
          <ul id='thread-comment-list'>
            {this.state.renderedComments2}
          </ul>
        </div>
      )
      }
    else {
      return (    
        <div id="ThreadCommentList">    
        <h4 id="comments-header">Comments</h4>
          <ul id="thread-comment-list">
            <li>Click 'Play' to start the comments!</li>
          </ul>
      </div>
      );
    }
  }
}

export default withRouter(ThreadCommentList);