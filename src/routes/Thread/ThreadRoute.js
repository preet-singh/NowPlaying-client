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
    mediaTimer: 0,
    seconds: 0,
    minutes: 0,
    hours: 0,
    playing: false,
  }

  componentDidMount() {
    const mediaType = this.props.match.params;
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

  renderCommentList = () => {
    if (this.state.comments && this.state.playing) {
      return (
        <ThreadCommentList comments={this.state.comments}/>
      )
    }
    else {
      return null;
    }
  }

  playButton = () => {
    this.setState({playing: !this.state.playing})
  }

  render(){
    return(
      <div className="ThreadRoute">
        <Header />
        <Directory thread={this.props.match.params.thread} id={this.props.match.params.id} />
        <main>
          <button onClick={() => this.playButton()}>Play</button>
          <ThreadDetails thread={this.props.match.params.thread} id={this.props.match.params.id}/>
          <ScrubBox />
          <PrivateThreadMessage />
          {this.renderCommentList()}
        </main>
        {this.state.playing ? <FixedBar category={this.props.match.params.thread} mediaId={this.props.match.params.id}/> : null}
      </div>
    );
  }
}