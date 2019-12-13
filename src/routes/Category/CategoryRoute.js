//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import ThreadsList from '../../components/ThreadsList/ThreadsList';
import SortOptions from '../../components/SortOptions/SortOptions';
import FixedBar from '../../components/FixedBar/FixedBar';
import SearchBar from '../../components/SearchBar/SearchBar';

//Utilities
import UserContext from '../../utils/context';

//Style
import './CategoryRoute.css'

//Images
import comment from '../../assets/comment.svg';



class CategoryRoute extends React.Component {
  static contextType = UserContext;
  // eslint-disable-next-line no-useless-constructor
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
      <div id="CategoryRoute">
        <Header />
        <SearchBar />
        <SortOptions state={this.state} />
        <main>
          <ThreadsList />
          {this.context.playing ? this.context.displayCommentBox ? <FixedBar /> : <div className="bottom-bar"><img onClick={() => this.context.displayCommentSection()} id='open_chatbox' src={comment} alt='open chat box'></img></div> : ''}
        </main>
      </div>
    );
  }
}

export default CategoryRoute;