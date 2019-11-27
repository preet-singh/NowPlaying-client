import React from 'react';
import './FixedBar.css'
import AddCommentBox from '../../components/AddCommentBox/AddCommentBox';

function FixedBar(props) {
  return (
    <div className='fixed-bar'>
      <AddCommentBox />
    </div>

  )
}

export default FixedBar;