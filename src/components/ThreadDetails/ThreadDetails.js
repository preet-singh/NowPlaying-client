//Dependencies
import React from 'react';
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";

//CSS
import './ThreadDetails.css';

//Utilities
import convertSeconds from '../../utils/convertSeconds';
import AuthApi from '../../utils/auth-service'
import UserContext from '../../utils/context';

export default class ThreadDetails extends React.Component {
  static contextType = UserContext;
  state = {
    
  }

  async componentDidMount(){
    let thread = this.props.thread;
    let id = this.props.id;
    console.log(thread, id)
    await AuthApi.getSpecificEvent(thread, id)
    .then(resJSON => {
      console.log(resJSON)
      this.setState({
        event: {...resJSON}
    })
    })
  }

  convertDate = date => {

    let newDate = new Date(date)

    return `${newDate.toDateString()}`
  }

  playButton = async () => {
    if (this.props.thread === this.context.playingCategory && this.props.id === this.context.playingID) {
      if (!this.context.playing) {
        let titleItem = this.context.categoryItems.find(item => item.id === this.props.id) || {}
        let title = titleItem.title || '';
        let timeInMinutes = titleItem.media_runtime;
        let timeInSeconds = timeInMinutes * 60;
        this.context.startInterval();
        this.context.setPlayingCategory(this.props.thread)
        this.context.setPlayingID(this.props.id);
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
      let titleItem = this.context.categoryItems.find(item => Number(item.id) === Number(this.props.id)) || {}
      let title = titleItem.title || '';
      let timeInMinutes = titleItem.media_runtime;
      let timeInSeconds = timeInMinutes * 60;
      this.context.resetMediaTimer();
      this.context.setPlayingCategory(this.props.thread)
      this.context.setPlayingID(this.props.id);
      this.context.setPlayingRuntime(timeInSeconds);
      this.context.setPlayingTitle(title)
      this.context.setPlaying(true);
      this.context.pauseInterval();
      this.context.startInterval();
      this.context.displayCommentSection(true);
    }
  }

  determineButtonText = () => {
    if (this.props.thread === this.context.playingCategory && this.props.id === this.context.playingID) {
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
    let runTime = 1;
    if (this.context.playingRuntime) {
      runTime = this.context.playingRuntime
    }
    let scrollValue = this.context.mediaTimer;
    if (this.props.thread !== this.context.playingCategory || this.props.id !== this.context.playingID) {
      runTime = 1;
      scrollValue = 0;
    }
    return (
      <>
      {this.state.event ? <div className='thread-details'>
        <div className="play-and-title">
        <h3>{this.state.event ? this.state.event[0].title : 'Loading...'}</h3>
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
          <button type="button" className="go-back-ten" onClick={this.context.mediaTimer >= 10 ? () => this.context.setMediaTimer(this.context.mediaTimer - 10) : () => this.context.setMediaTimer(0)}>10s</button>
          <button type="button" onClick={() => this.playButton()} id='display-comment' className="play-button">{this.determineButtonText()}</button>
          {this.context.playing ? '' : <span className="block margin10">Click 'play' to view the comments</span>}
          </div>
          <p className="item-info">{this.state.event ? this.state.event[0].event_description : 'Loading...'}</p>
          <img className="item-poster" src={this.state.event ? `http://image.tmdb.org/t/p/w780/${this.state.event[0].poster}` : ''} alt="poster" />
          <h4>Trailers</h4>
          <div className="item-info trailer-list">None yet!</div>
          <h4>Information</h4>
          <ul>
            <li>Runtime: {this.state.event[0].media_runtime}m</li>
            <li>Release date: {this.state.event[0].release_date}</li>
            <li>IMDB Rating: {this.state.event[0].imdb_rating}</li>
          </ul>

        {/* <p>{this.state.event ? this.convertDate(this.state.event[0].date_created) : 'Loading...'}</p> */}
      </div> : 'Loading'}
      </>
      )

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
        backgroundColor: '#00d838',
        color: '#333',
      }}
      {...getHandleProps(id)}
    >
      <div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -35 }}>
        <span className="signature-green">{convertSeconds(value)}</span>
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
        backgroundColor: '#00d838',
        borderRadius: 5,
        cursor: 'pointer',
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps() /* this will set up events if you want it to be clickeable (optional) */}
    />
  )
}