import React from 'react';
import './ThreadCategory.css';
import ThreadsList from '../ThreadsList/ThreadsList';
import { Link } from 'react-router-dom';



function ThreadCategory() {
  return (
    <div className='thread-category'>
      <h3>Popular</h3>
      <ThreadsList limit={3} />
    </div>
  )
}

export default ThreadCategory;