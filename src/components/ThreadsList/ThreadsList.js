import React from 'react';
import ThreadItem from '../ThreadItem/ThreadItem';
import './ThreadsList.css';

function ThreadsList(props) {
  return (
    <div className='threads-list'>
      <h3>Movies</h3>
      <ThreadItem />
      <ThreadItem />
      <ThreadItem />
    </div>
  )
}

export default ThreadsList;