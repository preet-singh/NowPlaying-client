import React from 'react';
import './ThreadCommentItem.css';

function ThreadCommentItem(props) {
  return (
    <li key={props.id} className='thread-comment-item'>
      <p>{props.username}: {props.comment}</p>
      <p className='comment-time-stamp'>0:00</p>
    </li>
  )
}

export default ThreadCommentItem;