import React from 'react';
import './FixedBar.css'
import AddCommentBox from '../../components/AddCommentBox/AddCommentBox';
import PlayButton from '../../components/PlayButton/PlayButton'

function FixedBar(props) {
  return (
    <div className='fixed-bar'>
      <div className='fixed-bar-header'>
      <PlayButton />
      <h3>0:00</h3>
      </div>
      <AddCommentBox />
    </div>

  )
}

export default FixedBar;