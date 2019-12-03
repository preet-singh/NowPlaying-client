import React from 'react';
import './ThreadCommentList.css';
import ThreadCommentItem from '../ThreadCommentItem/ThreadCommentItem';

function ThreadCommentList(props) {
  const renderCommentList = () => {
    console.log(props)
    return props.comments.map(comment => {
      return (
        <ThreadCommentItem id={comment.id} username={comment.user_name} comment={comment.user_comment} />
      )
    })
  }

  return (
    <ul className='thread-comment-list'>
      {renderCommentList()}
    </ul>
  )
}

export default ThreadCommentList;