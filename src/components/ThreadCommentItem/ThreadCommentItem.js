import React from 'react';
import './ThreadCommentItem.css';

function ThreadCommentItem(props) {
  return (
    <div className='comment-item'>
      <p>Comment text here</p>
      <span className='comment-time-stamp'>0:00</span>
    </div>
  )
}

export default ThreadCommentItem;