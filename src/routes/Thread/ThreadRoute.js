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
import ThreadCommentItem from '../../components/ThreadCommentItem/ThreadCommentItem';


export default class ThreadRoute extends React.Component {
  static defaultProps = [];

  state = {
    comments: [],
    mediaTimer: {},
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
  render(){
    return(
      <div className="ThreadRoute">
        <Header />
        <Directory />
        <main>
          <ThreadDetails thread={this.props.match.params.thread} id={this.props.match.params.id}/>
          <ScrubBox />
          <PrivateThreadMessage />
          {this.renderCommentList()}
        </main>
        <FixedBar />
      </div>
    );
  }
}