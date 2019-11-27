import React from 'react';
import './ThreadCategory.css';
import ThreadsList from '../ThreadsList/ThreadsList';
import { Link } from 'react-router-dom';



function ThreadCategory() {
  return (
    <div className='thread-category'>
      <h3>Categories</h3>
      <ThreadsList />
    </div>
  )
}

export default ThreadCategory;