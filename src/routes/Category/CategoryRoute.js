//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Directory from '../../components/Directory/Directory';
import ThreadsList from '../../components/ThreadsList/ThreadsList';
import SortOptions from '../../components/SortOptions/SortOptions';
import FixedBar from '../../components/FixedBar/FixedBar';
import SearchBar from '../../components/SearchBar/SearchBar';


//Utilities
import UserContext from '../../utils/context';

//Style
import './CategoryRoute.css'



class CategoryRoute extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      checkedBackground: false
    }
  }

  componentDidMount() {
    this.checkBackground();
  }

  checkBackground = () => {
    let image = document.body.style.background || '';
    let split = image.split(' ') || [];
    if (split[4]) {
      let imageUrl = split[4].slice(5, -1) || ''
      let imageFullUrl = imageUrl.slice(0,imageUrl.length-1) || ''
      if (this.context.background !== imageFullUrl) {
        document.body.style.background = `fixed center center url('${this.context.background}')`;
      }
      this.setState({checkedBackground: true})
    }
  }

  render() {
    if (this.state.checkedBackground === false) {
      this.checkBackground();
    }
    return(
      <div className="CategoryRoute">
        <Header />
        <SearchBar />
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