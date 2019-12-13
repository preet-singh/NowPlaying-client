/* eslint-disable eqeqeq */
import React from 'react';
import './AddCommentBox.css';
import AuthApiService from '../../utils/auth-service';
import UserContext from '../../utils/context';
import TokenService from '../../utils/token-service';

class AddCommentBox extends React.Component {
  static contextType = UserContext;

  state = {
    comment: '',
    error: null,
    happenings: []
  }

  componentDidMount() {
    let element = document.getElementById("comment-text-input")
    if(element){
      document.getElementById("comment-text-input").addEventListener("keypress", this.submitOnEnter);
    }

    AuthApiService.getHappeningEvents()
      .then(data => {
        this.setState({
          happenings: data
        })
      })
      .catch(res => {
        this.setState({
          error: res.error
        })
      })
  }

  handleCommentInput = text => {
    this.setState({
      comment: text,
    })
  }

  refreshCommentsCheck = async () => {
    let mediaType = this.context.category;
    if(mediaType === 'books'){
      let res = await AuthApiService.getBookComments(mediaType.thread, this.context.playingID).then(res => res);
      const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
      this.context.setCurrentThreadComments(orderedComments);
    } 
    else if(mediaType === 'movies'){
      let res = await AuthApiService.getMovieComments(mediaType.thread, this.context.playingID).then(res => res);
      const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
      await this.context.setCurrentThreadComments(orderedComments);
    }
    else if(mediaType === 'podcasts'){
      let res = await AuthApiService.getPodcastComments(mediaType.thread, this.context.playingID).then(res => res);
      const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
      await this.context.setCurrentThreadComments(orderedComments);
    }
    else if(mediaType === 'tv_shows'){
      let res = await AuthApiService.getTVShowComments(mediaType.thread, this.context.playingID).then(res => res);
      const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
      this.context.setCurrentThreadComments(orderedComments);
    }
  }

  handleCommentSubmit = async e => {
    e.preventDefault()
    let category = this.context.category.slice(0, this.context.category.length - 1)

    const commentBody = {
      user_comment: this.state.comment,
      comment_timestamp: this.context.mediaTimer,
      media_id: this.context.playingID,
    }

    await AuthApiService.postComment(category, commentBody)
    await this.refreshCommentsCheck();

    await AuthApiService.getSpecificEvent(this.context.category, this.context.playingID)
      .then(res => {
        const commentBodyHappenings = {
          username: this.context.user.username,
          user_comment: this.state.comment,
          media_title_comments: res[0].title,
          media_type: this.context.category,
          media_id: this.context.playingID,
        }
        AuthApiService.postCommentHappenings(commentBodyHappenings)
          .then(res => console.log(res))
      })
    this.setState({comment: '', })
  }

  handleReactions = async reaction => {
    if(reaction == 1){
      reaction = `😂`
    } else if (reaction == 2){
      reaction = `😔`
    } else if (reaction == 3){
      reaction = `😱`
    }
    let category = this.context.category.slice(0, this.context.category.length - 1)
    const commentBody = {
      user_comment: reaction,
      comment_timestamp: this.context.mediaTimer,
      media_id: this.context.playingID,
    }
    await AuthApiService.postComment(category, commentBody)
    await this.refreshCommentsCheck();
  }

  submitOnEnter(event){
    if(event.which === 13){
        event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.preventDefault();
    }
  }


  render() {
    return (
      <div className='add-comment-box'>
        <form className='add-comment-form' onSubmit={e => this.handleCommentSubmit(e)}>
        {TokenService.hasAuthToken() ? <textarea id='comment-text-input' type='text' value={this.state.comment} onChange={e => this.handleCommentInput(e.target.value)}/> : <textarea id='comment-text-input' type='text' value={this.state.comment} onChange={e => this.handleCommentInput(e.target.value)} placeholder='Log in to enter a comment' disabled/>
        }
        <div className={this.context.playing ? 'reaction-buttons' : 'reaction-buttons_notPlaying'}>
          <button className='reaction-button' type='button' value='1' onClick={e => this.handleReactions('1')}><span role='img' aria-label='laughing emoji'>😂</span></button>
          <button className='reaction-button' type='button' value='2' onClick={e => this.handleReactions('2')}><span role='img' aria-label='sad emoji'>😔</span></button>
          <button className='reaction-button' type='button' value='3' onClick={e => this.handleReactions('3')}><span role='img' aria-label='shocked emoji'>😱</span></button>
        </div>
        <button className='send-comment' type='submit'>Send</button>
        </form>
      </div>
    )
  }
}

export default AddCommentBox;