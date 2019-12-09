import React from 'react';
import './AddCommentBox.css';
import comment from '../Images/comment.svg'
import AuthApiService from '../../utils/auth-service';
import UserContext from '../../utils/context';

class AddCommentBox extends React.Component {
  static contextType = UserContext;

  state = {
    comment: '',
    error: null,
    happenings: []
  }

  componentDidMount() {
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
    let mediaType = this.props.category;
    if(mediaType === 'books'){
      let res = await AuthApiService.getBookComments(mediaType.thread, this.context.playingID).then(res => res);
      const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
      this.context.setCurrentThreadComments(orderedComments);
    } 
    else if(mediaType === 'movies'){
      let res = await AuthApiService.getMovieComments(mediaType.thread, this.context.playingID).then(res => res);
      console.log(res);
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
    let category = this.props.category.slice(0, this.props.category.length - 1)

    const commentBody = {
      user_comment: this.state.comment,
      comment_timestamp: this.context.mediaTimer,
      media_id: this.props.mediaId,
    }

    await AuthApiService.postComment(category, commentBody)
    await this.refreshCommentsCheck();

    await AuthApiService.getSpecificEvent(this.props.category, this.props.mediaId)
      .then(res => {
        console.log(res)
        const commentBodyHappenings = {
          username: this.context.user.username,
          user_comment: this.state.comment,
          media_title_comments: res[0].title,
          media_type: this.context.category,
          media_id: this.props.mediaId,
        }
        AuthApiService.postCommentHappenings(commentBodyHappenings)
          .then(res => console.log(res))
      })
    this.setState({comment: '', })
  }

  handleReactions = async reaction => {
    console.log(reaction)
    let category = this.props.category.slice(0, this.props.category.length - 1)
    const commentBody = {
      user_comment: reaction,
      comment_timestamp: this.context.mediaTimer,
      media_id: this.props.mediaId,
    }
    await AuthApiService.postComment(category, commentBody)
    await this.refreshCommentsCheck();
  }

  render() {
    return (
      <div className='add-comment-box'>
        <form className='add-comment-form' onSubmit={e => this.handleCommentSubmit(e)}>
          <textarea id='comment-text-input' type='text' value={this.state.comment} onChange={e => this.handleCommentInput(e.target.value)} />
          <button id='send-comment' type='submit'>Send</button>
        </form>
        {this.context.displayCommentBox ? <button id='close_commentBox' onClick={() => this.context.displayCommentSection()}>X</button> : null}
        <div className={this.context.playing ? 'reaction-buttons' : 'reaction-buttons_notPlaying'}>
          <button className='reaction-button' type='button' value='😂' onClick={e => this.handleReactions(e.target.value)}><span role='img' aria-label='laughing emoji'>😂</span></button>
          <button className='reaction-button' type='button' value='😔' onClick={e => this.handleReactions(e.target.value)}><span role='img' aria-label='laughing emoji'>😔</span></button>
          <button className='reaction-button' type='button' value='😱' onClick={e => this.handleReactions(e.target.value)}><span role='img' aria-label='laughing emoji'>😱</span></button>
        </div>
      </div>
    )
  }
}

export default AddCommentBox;