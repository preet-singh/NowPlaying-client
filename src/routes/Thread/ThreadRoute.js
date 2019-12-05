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

//Style
import './ThreadRoute.css'

export default class ThreadRoute extends React.Component {
  static defaultProps = [];

  state = {
    comments: [],
    mediaTimer: 0,
    playing: false,
  }

  componentDidMount() {
    const mediaType = this.props.match.params;
    console.log(mediaType.thread, mediaType.id)
    if(mediaType.thread === 'books'){
      AuthApiService.getBookComments(mediaType.thread, mediaType.id)
      .then(res => this.setState({comments: res}))
    } 
    else if(mediaType.thread === 'movies'){
      AuthApiService.getMovieComments(mediaType.thread, mediaType.id)
      .then(res => this.setState({comments: res}))
    }
    else if(mediaType.thread === 'podcasts'){
      AuthApiService.getPodcastComments(mediaType.thread, mediaType.id)
      .then(res => this.setState({comments: res}))
    }
    else if(mediaType.thread === 'tv_shows'){
      AuthApiService.getTVShowComments(mediaType.thread, mediaType.id)
      .then(res => this.setState({comments: res}))
    }
  }
  renderCommentList = () => {
    if (this.state.comments) {
      return (
        <ThreadCommentList comments={this.state.comments}/>
      )
    }
    else {
      return null;
    }
  }
  
  updatePlayTimer = () => {
    if(this.state.playing === true){
    this.setState({mediaTimer: this.state.mediaTimer + 1});
    }
    else {
      return
    }
  }

  playTimer = () => {
    this.setState({playing: !this.state.playing})
    setInterval(() => this.updatePlayTimer(), 1000)
  }

  render(){
    console.log(this.state.mediaTimer)
    return(
      <div className="ThreadRoute">
        <main>
          <ThreadDetails thread={this.props.match.params.thread} id={this.props.match.params.id}/>
          <h4>{this.state.mediaTimer}</h4>
          <button onClick={() => this.playTimer()}>Timer</button>
          <ScrubBox />
          <PrivateThreadMessage />
          {this.renderCommentList()}
        </main>
        <FixedBar />
      </div>
    );
  }
}

//<Directory thread={this.props.match.params.thread} id={this.props.match.params.id} /> LINE 75