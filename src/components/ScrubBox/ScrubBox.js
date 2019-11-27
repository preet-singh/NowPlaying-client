import React from 'react';
import './ScrubBox.css';
import PlayButton from '../PlayButton/PlayButton';
import ScrubBar from '../ScrubBar/ScrubBar';

function ScrubBox(props) {
  return (
    <div className='scrub-box'>
      <PlayButton />
      <ScrubBar />
    </div>

  )
}

export default ScrubBox;