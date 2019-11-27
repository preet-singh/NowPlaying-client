import React from 'react';
import './ThreadCommentItem.css';

function ThreadCommentItem(props) {
  return (
    <div className='thread-comment-item'>
      <p>username: This movie WOW!!!!!!!</p>
      <p className='comment-time-stamp'>0:00</p>
    </div>
  )
}

export default ThreadCommentItem;