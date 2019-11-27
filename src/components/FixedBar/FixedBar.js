import React from 'react';
import './FixedBar.css'
import AddCommentBox from '../../components/AddCommentBox/AddCommentBox';
import PlayButton from '../../components/PlayButton/PlayButton'

function FixedBar(props) {
  return (
    <div className='fixed-bar'>
      <PlayButton />
      <AddCommentBox />
    </div>

  )
}

export default FixedBar;