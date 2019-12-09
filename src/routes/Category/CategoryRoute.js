//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Directory from '../../components/Directory/Directory';
import ThreadsList from '../../components/ThreadsList/ThreadsList';
import SortOptions from '../../components/SortOptions/SortOptions';
import FixedBar from '../../components/FixedBar/FixedBar';


//Utilities
import UserContext from '../../utils/context';

//Style
import './CategoryRoute.css'



class CategoryRoute extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    }

  render() {
    return(
      <div className="CategoryRoute">
        <Header />
        <Directory />
        <SortOptions state={this.state} />
        <main>
          <ThreadsList />
          {this.context.playing ? this.context.displayCommentBox ? <FixedBar /> : <img onClick={() => this.context.displayCommentSection()} id='open_chatbox' src="#" alt='open chat box'></img> : ''}
        </main>
      </div>
    );
  }
}

export default CategoryRoute;