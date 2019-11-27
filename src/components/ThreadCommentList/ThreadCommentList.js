import React from 'react';
import './ThreadCommentList.css';
import ThreadCommentItem from '../ThreadCommentItem/ThreadCommentItem';

function ThreadCommentList(props) {
  return (
    <div className='thread-comment-list'>
      <ThreadCommentItem />
      <ThreadCommentItem />
      <ThreadCommentItem />
    </div>
  )
}

export default ThreadCommentList;