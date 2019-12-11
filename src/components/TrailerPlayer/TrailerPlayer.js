import React from 'react';
import ReactPlayer from 'react-player'

class MediaPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: this.myRef,
    }
  }
  render() {
    console.log(this.state)
    return (
      <div className='media-player'>
        <ReactPlayer 
        url='https://www.youtube.com/watch?v=J---aiyznGQ' 
        onStart={() => this.props.play()}
        controls={true}/>
      </div>
    )
  }
}

export default MediaPlayer;