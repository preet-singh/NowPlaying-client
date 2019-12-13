//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import CreateNewThreadForm from '../../components/CreateNewThreadForm/CreateNewThreadForm';
import FixedBar from '../../components/FixedBar/FixedBar';

//Utilities
import UserContext from '../../utils/context';

//Style
import './NewThread.css'

//Images
import comment from '../../assets/comment.svg';

class NewThread extends React.Component {
  static contextType = UserContext;
  
  render() {
    return(
      <div className="NewThread">
          <Header />
          <main>
            <CreateNewThreadForm />
            {this.context.playing ? this.context.displayCommentBox ? <FixedBar /> : <div className="bottom-bar"><img onClick={() => this.context.displayCommentSection()} id='open_chatbox' src={comment} alt='open chat box'></img></div> : ''}
          </main>
      </div>
    );
  }
}

export default NewThread;

