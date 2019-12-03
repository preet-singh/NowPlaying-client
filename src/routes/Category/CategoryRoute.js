//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Directory from '../../components/Directory/Directory';
import ThreadsList from '../../components/ThreadsList/ThreadsList';
import SortOptions from '../../components/SortOptions/SortOptions';


//Utilities
import UserContext from '../../utils/context';

//Style
import './CategoryRoute.css'



class CategoryRoute extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      filterOptions: {
        minimumYear: 0,
        maximumYear: new Date().getFullYear(),
        genre: 'all',
        minimumRating: 1
      },
    }
  }

  setFilterOption = (stateChange) => {
    console.log(stateChange);
    this.setState(stateChange);
  }

  render() {
    return(
      <div className="CategoryRoute">
        <Header />
        <Directory />
        <SortOptions state={this.state} setFilterOption={this.setFilterOption} />
        <main>
          <ThreadsList />
        </main>
      </div>
    );
  }
}

export default CategoryRoute;