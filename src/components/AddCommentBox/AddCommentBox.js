import React from 'react';
import './AddCommentBox.css';
import PlayButton from '../PlayButton/PlayButton';
import AuthApiService from '../../utils/auth-service';
import UserContext from '../../utils/context';

class AddCommentBox extends React.Component {
  static contextType = UserContext;

  state = {
    comment: '',
  }

  handleCommentInput = text => {
    this.setState({
      comment: text,
    })
  }


  handleCommentSubmit = e => {
    e.preventDefault()
    
    let category = this.props.category.slice(0, this.props.category.length - 1) 
    const commentBody = {
      user_comment: this.state.comment,
      comment_timestamp: this.context.mediaTimer,
      media_id: this.props.mediaId,
    }
    AuthApiService.postComment(category, commentBody)
  }

  handleReactions = reaction => {
    console.log(reaction)
    let category = this.props.category.slice(0, this.props.category.length - 1) 
    const commentBody = {
      user_comment: reaction,
      comment_timestamp: this.context.mediaTimer,
      media_id: this.props.mediaId,
    }
    AuthApiService.postComment(category, commentBody)
  }
  render() {
    return (
      <div className='add-comment-box'>
        <form className='add-comment-form' onSubmit={this.handleCommentSubmit}>
          <textarea id='comment-text-input' type='text' ref={this.commentInput} onChange={e => this.handleCommentInput(e.target.value)}/>
          <button id='send-comment' type='submit'>Send</button>
          <div className='reaction-buttons'>
            <button className='reaction-button' type='submit' value=':)' onClick={e => this.handleReactions(e.target.value)}>:)</button>
            <button className='reaction-button' type='submit' value=':(' onClick={e => this.handleReactions(e.target.value)}>:(</button>
            <button className='reaction-button' type='submit' value=':O' onClick={e => this.handleReactions(e.target.value)}>:O</button>
          </div> 
        </form>
      </div>
    )
  }
}

export default AddCommentBox;