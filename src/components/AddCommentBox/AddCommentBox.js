import React from 'react';
import './AddCommentBox.css';
import PlayButton from '../PlayButton/PlayButton';
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
    if(mediaType.thread === 'books'){
      await AuthApiService.getBookComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
      })
    } 
    else if(mediaType.thread === 'movies'){
      await AuthApiService.getMovieComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
      })
    }
    else if(mediaType.thread === 'podcasts'){
      await AuthApiService.getPodcastComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
      })
    }
    else if(mediaType.thread === 'tv_shows'){
      await AuthApiService.getTVShowComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
      })
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

    AuthApiService.postComment(category, commentBody)
    await this.refreshCommentsCheck();
    this.setState({comment: '', })

    AuthApiService.getSpecificEvent(this.props.category, this.props.mediaId)
      .then(res => {
        console.log(res)
        const commentBodyHappenings = {
          username: this.context.user.username,
          user_comment: this.state.comment,
          media_title_comments: res[0].title,
        }
        AuthApiService.postCommentHappenings(commentBodyHappenings)
          .then(res => console.log(res))
      })
  }

  handleReactions = async reaction => {
    console.log(reaction)
    let category = this.props.category.slice(0, this.props.category.length - 1)
    const commentBody = {
      user_comment: reaction,
      comment_timestamp: this.context.mediaTimer,
      media_id: this.props.mediaId,
    }
    AuthApiService.postComment(category, commentBody)
    await this.refreshCommentsCheck();
  }

  render() {
    console.log(this.state.happenings);
    return (
      <div className='add-comment-box'>
        <form className='add-comment-form' onSubmit={e => this.handleCommentSubmit(e)}>
          <textarea id='comment-text-input' type='text' value={this.state.comment} onChange={e => this.handleCommentInput(e.target.value)} />
          <button id='send-comment' type='submit'>Send</button>
        </form>
        <div className='reaction-buttons'>
          <button className='reaction-button' type='button' value=':)' onClick={e => this.handleReactions(e.target.value)}>:)</button>
          <button className='reaction-button' type='button' value=':(' onClick={e => this.handleReactions(e.target.value)}>:(</button>
          <button className='reaction-button' type='button' value=':O' onClick={e => this.handleReactions(e.target.value)}>:O</button>
        </div>
      </div>
    )
  }
}

export default AddCommentBox;