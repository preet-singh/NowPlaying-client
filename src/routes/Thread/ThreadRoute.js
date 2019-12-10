//Dependencies
import React from 'react';
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";

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


//Utilities
import convertSeconds from '../../utils/convertSeconds';

//Image
import comment from '../../components/Images/comment.svg'

//Style
import './ThreadRoute.css'

export default class ThreadRoute extends React.Component {
  static defaultProps = [];
  static contextType = UserContext;

  state = {
    comments: [],
    checkedBackground: false
  }

  async componentDidMount() {
    this.checkBackground();
    await this.getComments()

  }

  checkBackground = () => {
    if (this.context.categoryItems) {
    let find = this.context.categoryItems.find(item => item.id === Number(this.props.match.params.id));
    let backdrop = find.backdrop;
    let fullUrl = `http://image.tmdb.org/t/p/original/${backdrop}`;
    document.body.style.background = `fixed center center url('${fullUrl}`;
    }
  }

  
  getComments = async () => {
    const mediaType = this.props.match.params;
    if(mediaType.thread === 'books'){
      await AuthApiService.getBookComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
        this.setState({comments: orderedComments})
      })
    } 
    else if(mediaType.thread === 'movies'){
      await AuthApiService.getMovieComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
        this.setState({comments: orderedComments})
      })
    }
    else if(mediaType.thread === 'podcasts'){
      await AuthApiService.getPodcastComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
        this.setState({comments: orderedComments})
      })
    }
    else if(mediaType.thread === 'tv_shows'){
      await AuthApiService.getTVShowComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
        this.setState({comments: orderedComments})
      })
    }
  }
  renderCommentList = () => {
    if (this.state.comments) {
      return (
        <ThreadCommentList getComments={this.getComments}/>
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
        let timeInMinutes = titleItem.media_runtime;
        let timeInSeconds = timeInMinutes * 60;
        this.context.startInterval();
        this.context.setPlayingCategory(this.props.match.params.thread)
        this.context.setPlayingID(this.props.match.params.id);
        this.context.setPlayingTitle(title)
        this.context.setPlayingRuntime(timeInSeconds);
        this.context.setPlaying(!this.context.playing);
        this.context.displayCommentSection(true);
      }
      else {
        if (!this.context.paused) {
          this.context.pauseInterval();
        }
        else {
          this.context.startInterval();
          this.context.displayCommentSection(true);
        }
        this.context.setPaused(!this.context.paused);
      }
    }
    else {
      let titleItem = this.context.categoryItems.find(item => Number(item.id) === Number(this.props.match.params.id)) || {}
      let title = titleItem.title || '';
      let timeInMinutes = titleItem.media_runtime;
      let timeInSeconds = timeInMinutes * 60;
      this.context.resetMediaTimer();
      this.context.setPlayingCategory(this.props.match.params.thread)
      this.context.setPlayingID(this.props.match.params.id);
      this.context.setPlayingRuntime(timeInSeconds);
      this.context.setPlayingTitle(title)
      this.context.setPlaying(true);
      this.context.pauseInterval();
      this.context.startInterval();
      this.context.displayCommentSection(true);
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
    if (this.state.checkedBackground !== true) {
      this.checkBackground();
    }
    let runTime = 1;
    if (this.context.playingRuntime) {
      runTime = this.context.playingRuntime
    }
    let scrollValue = this.context.mediaTimer;
    if (this.props.match.params.thread !== this.context.playingCategory || this.props.match.params.id !== this.context.playingID) {
      runTime = 1;
      scrollValue = 0;
    }
    return(
      <div className="ThreadRoute">
        <Header />
        <Directory thread={this.props.match.params.thread} id={this.props.match.params.id} />
        <main>
          <ThreadDetails thread={this.props.match.params.thread} id={this.props.match.params.id}/>
          <div className="goBackTen">
            <button type="button" onClick={() => this.context.setMediaTimer(this.context.mediaTimer - 10)}>Go back ten seconds!</button>
          </div>
          {this.context.playing ? this.context.displayCommentBox ? <FixedBar /> : <img onClick={() => this.context.displayCommentSection()} id='open_chatbox' src={comment} alt='open chat box'></img> : ''}
  <Slider
    className="playSlider"
    domain={[0, runTime]}
    step={1}
    mode={2}
    values={[scrollValue]}
    onChange={async (e) => {
      if (this.context.paused) {
        await this.context.pauseInterval();
        await this.context.setMediaTimer(Number(e[0]));
      }
      else {
        await this.context.pauseInterval();
        await this.context.setMediaTimer(Number(e[0]));
        await this.context.startInterval();
      }
    }}
    onUpdate={async (e) => {
      await this.context.pauseInterval();
    }} >

    <Rail>
      {({ getRailProps }) => (
        <div className="railStyle" {...getRailProps()} />
      )}
    </Rail>
    <Handles>
      {({ handles, getHandleProps }) => (
        <div className="slider-handles">
          {handles.map(handle => (
            <Handle
              key={handle.id}
              handle={handle}
              getHandleProps={getHandleProps}
            />
          ))}
        </div>
      )}
    </Handles>
    <Tracks right={false}>
      {({ tracks, getTrackProps }) => (
        <div className="slider-tracks">
          {tracks.map(({ id, source, target }) => (
            <Track
              key={id}
              source={source}
              target={target}
              getTrackProps={getTrackProps}
            />
          ))}
        </div>
      )}
    </Tracks>
  </Slider>
          <button onClick={() => this.playButton()} id='display-comment'>{this.determineButtonText()}</button>
          <PrivateThreadMessage />
          {this.renderCommentList()}
        </main>
      </div>
    );
  }
}

export function Handle({
  handle: { id, value, percent },
  getHandleProps
}) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -15,
        marginTop: 25,
        zIndex: 2,
        width: 30,
        height: 30,
        border: 0,
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: '#2C4870',
        color: '#333',
      }}
      {...getHandleProps(id)}
    >
      <div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -35 }}>
        {convertSeconds(value)}
      </div>
    </div>
  )
}

function Track({ source, target, getTrackProps }) {
  return (
    <div
      style={{
        position: 'absolute',
        height: 10,
        zIndex: 1,
        marginTop: 35,
        backgroundColor: '#546C91',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */}
    />
  )
}


//<ScrubBox /> LINE 79
//<Directory thread={this.props.match.params.thread} id={this.props.match.params.id} /> LINE 75