//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Directory from '../../components/Directory/Directory';
import ThreadDetails from '../../components/ThreadDetails/ThreadDetails';
import ScrubBox from '../../components/ScrubBox/ScrubBox';
import PrivateThreadMessage from '../../components/PrivateThreadMessage/PrivateThreadMessage';
import ThreadCommentList from '../../components/ThreadCommentList/ThreadCommentList';

import AuthApiService from '../../utils/auth-service';
import FixedBar from '../../components/FixedBar/FixedBar';
import UserContext from '../../utils/context';
//Style
import './ThreadRoute.css'

export default class ThreadRoute extends React.Component {
  static defaultProps = [];
  static contextType = UserContext;

  state = {
    comments: [],
  }

  async componentDidMount() {
    await this.getComments()
  }

  getComments = async () => {
    const mediaType = this.props.match.params;
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
  renderCommentList = () => {
    if (this.state.comments) {
      return (
        <ThreadCommentList getComments={this.getComments} />
      )
    }
    else {
      return 'No comments in this thread yet!';
    }
  }

  playButton = async () => {
    if (this.props.match.params.thread === this.context.playingCategory && this.props.match.params.id === this.context.playingID) {
      if (!this.context.playing) {
        let titleItem = this.context.categoryItems.find(item => item.id === this.props.match.params.id) || {}
        let title = titleItem.title || '';
        this.context.startInterval();
        this.context.setPlayingCategory(this.props.match.params.thread)
        this.context.setPlayingID(this.props.match.params.id);
        this.context.setPlayingTitle(title)
        this.context.setPlaying(!this.context.playing);
      }
      else {
        if (!this.context.paused) {
          this.context.pauseInterval();
        }
        else {
          this.context.startInterval();
        }
        this.context.setPaused(!this.context.paused);
      }
    }
    else {
      let titleItem = this.context.categoryItems.find(item => Number(item.id) === Number(this.props.match.params.id)) || {}
      let title = titleItem.title || '';
      this.context.resetMediaTimer();
      this.context.setPlayingCategory(this.props.match.params.thread)
      this.context.setPlayingID(this.props.match.params.id);
      this.context.setPlayingTitle(title)
      this.context.setPlaying(true);
      this.context.pauseInterval();
      this.context.startInterval();
    }
  }

  determineButtonText = () => {
    if (this.props.match.params.thread === this.context.playingCategory && this.props.match.params.id === this.context.playingID) {
      if (!this.context.playing) {
        return 'Play';
      }
      else {
        if (!this.context.paused) {
          return 'Pause';
        }
        else {
          return 'Resume';
        }
      }
    }
    return 'Play';
  }

  render(){
    return(
      <div className="ThreadRoute">
        <Header />
        <Directory thread={this.props.match.params.thread} id={this.props.match.params.id} />
        <main>
          <ThreadDetails thread={this.props.match.params.thread} id={this.props.match.params.id}/>
          <button onClick={() => this.playButton()} id='display-comment'>{this.determineButtonText()}</button>
          <PrivateThreadMessage />
          {this.renderCommentList()}
        </main>
        {this.context.playing ? <FixedBar category={this.props.match.params.thread} mediaId={this.props.match.params.id}/> : null}
      </div>
    );
  }
}

//<ScrubBox /> LINE 79
//<Directory thread={this.props.match.params.thread} id={this.props.match.params.id} /> LINE 75