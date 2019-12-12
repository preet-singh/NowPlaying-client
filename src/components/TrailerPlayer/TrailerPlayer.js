import React from 'react';
import ReactPlayer from 'react-player'

class TrailerPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <div className='trailer-player'>
        <ReactPlayer 
        url={`https://www.youtube.com/watch?v=${this.props.videoKey}`}
        controls={true}
        youtubeConfig={{ 
          playerVars: { 
            color: 'white',
             } }}/>
      </div>
    )
  }
}

export default TrailerPlayer;