import React from 'react';
import './ThreadCommentItem.css';

function ThreadCommentItem(props) {
  return (
    <li className='thread-comment-item'>
      <p>{props.username}: {props.comment}</p>
      <p className='comment-time-stamp bold'>{props.timestamp}</p>
    </li>
  )
}

export default ThreadCommentItem;