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
  
  convertSeconds() {
    
  }

  handleTimedComments = () => {
    return this.state.comments.map(comment => {
      if(comment.comment_timestamp === this.context.mediaTimer){
        this.state.renderedComments.push(comment);
      }
    })
  }

  renderCommentList = () => {
    this.handleTimedComments();
    while(this.state.renderedComments.length > 10){
      this.state.renderedComments.shift();
    }
    return this.state.renderedComments.map(comment => {
      return (
        <ThreadCommentItem username={comment.user_name} comment={comment.user_comment} timestamp={comment.comment_timestamp} key={comment.id}/>
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