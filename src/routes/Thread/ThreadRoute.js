//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Directory from '../../components/Directory/Directory';
import ThreadDetails from '../../components/ThreadDetails/ThreadDetails';
import ScrubBox from '../../components/ScrubBox/ScrubBox';
import PrivateThreadMessage from '../../components/PrivateThreadMessage/PrivateThreadMessage';
import ThreadCommentList from '../../components/ThreadCommentList/ThreadCommentList';
import FixedBar from '../../components/FixedBar/FixedBar';
import AuthApiService from '../../utils/auth-service';
import UserContext from '../../utils/context';
//Style
import './ThreadRoute.css'

export default class ThreadRoute extends React.Component {
  static defaultProps = [];
  static contextType = UserContext;

  state = {
    comments: [],
    updated: 0,
  }

  componentDidMount() {
    const mediaType = this.props.match.params;
    this.context.setCurrentThread(mediaType.thread)
    this.context.setCurrentThreadId(mediaType.id)

    if(mediaType.thread === 'books'){
      AuthApiService.getBookComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
      })
    } 
    else if(mediaType.thread === 'movies'){
      AuthApiService.getMovieComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
      })
    }
    else if(mediaType.thread === 'podcasts'){
      AuthApiService.getPodcastComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
      })
    }
    else if(mediaType.thread === 'tv_shows'){
      AuthApiService.getTVShowComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
      })
    }
  }

  componentDidUpdate() {
    const mediaType = this.props.match.params;
    if (mediaType.id !== this.context.currentThreadId || mediaType.thread !== this.context.currentThread) {
      this.context.setCurrentThread(mediaType.thread)
      this.context.setCurrentThreadId(mediaType.id)
      this.setState({updated: this.state.updated+1})
      if(mediaType.thread === 'books'){
        AuthApiService.getBookComments(mediaType.thread, mediaType.id)
        .then(res => {
          const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
          this.context.setCurrentThreadComments(orderedComments);
        })
      } 
      else if(mediaType.thread === 'movies'){
        AuthApiService.getMovieComments(mediaType.thread, mediaType.id)
        .then(res => {
          const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
          this.context.setCurrentThreadComments(orderedComments);
        })
      }
      else if(mediaType.thread === 'podcasts'){
        AuthApiService.getPodcastComments(mediaType.thread, mediaType.id)
        .then(res => {
          const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
          this.context.setCurrentThreadComments(orderedComments);
        })
      }
      else if(mediaType.thread === 'tv_shows'){
        AuthApiService.getTVShowComments(mediaType.thread, mediaType.id)
        .then(res => {
          const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
          this.context.setCurrentThreadComments(orderedComments);
        })
      }
    }
  }
  

  renderCommentList = () => {
    if (this.state.comments && this.context.playing) {
      return (
        <ThreadCommentList />
      )
    }
    else {
      return null;
    }
  }

  playButton = () => {
    this.context.setPlaying({playing: !this.context.playing})
  }

  render(){
    console.log(this.context.currentThread, this.context.currentThreadId)
    console.log(this.props.match.params)
    console.log(this.context.currentThreadComments)
    return(
      <div className="ThreadRoute">
        <Header />
        <Directory thread={this.props.match.params.thread} id={this.props.match.params.id} />
        <main>
          <button onClick={() => this.playButton()} id='display-comment'>Play</button>
          <ThreadDetails thread={this.props.match.params.thread} id={this.props.match.params.id}/>
          <ScrubBox />
          <PrivateThreadMessage />
          {this.renderCommentList()}
        </main>
        {this.context.playing ? <FixedBar category={this.props.match.params.thread} mediaId={this.props.match.params.id}/> : null}
      </div>
    );
  }
}

//<Directory thread={this.props.match.params.thread} id={this.props.match.params.id} /> LINE 75