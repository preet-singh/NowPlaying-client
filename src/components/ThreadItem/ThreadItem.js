import React from 'react';
import './ThreadItem.css';

function ThreadItem(props) {
  return (
    <div className='thread-item'>
      <h3>Movie Title</h3>
      <p>Created 01/12/19</p>
      <p>Last comment 11/27/19</p>
    </div>
  )
}

export default ThreadItem;