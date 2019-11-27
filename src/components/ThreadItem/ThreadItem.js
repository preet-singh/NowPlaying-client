import React from 'react';
import './ThreadItem.css';
import { Link } from 'react-router-dom';

function ThreadItem(props) {
  return (
    <div className='thread-item'>
      <Link to='/thread/testthread'>
        <h3>Movie Title</h3>
        <img src='https://img01.mgo-images.com/image/thumbnail/v2/content/MMVAF76018A477C2826A4EC8747C40B7BE27.jpeg' alt='Movie poster image'/>
        <p>Created 01/12/19</p>
        <p>Last comment 11/27/19</p>
      </Link>
    </div>
  )
}

export default ThreadItem;