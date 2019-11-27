import React from 'react';
import './AddCommentBox.css';
import PlayButton from '../PlayButton/PlayButton';

function AddCommentBox(props) {
  return (
    <div className='add-comment-box'>
      <form className='add-comment-form'>
        <textarea id='comment-text-input' type='text' />
        <button id='send-comment' type='submit'>Send</button>
        <div className='reaction-buttons'>
          <button className='reaction-button' type='submit'>:)</button>
          <button className='reaction-button' type='submit'>:(</button>
          <button className='reaction-button' type='submit'>:O</button>
        </div> 
      </form>
    </div>

  )
}

export default AddCommentBox;