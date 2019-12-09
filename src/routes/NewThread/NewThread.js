//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Directory from '../../components/Directory/Directory';
import SortOptions from '../../components/SortOptions/SortOptions';
import CreateNewThreadForm from '../../components/CreateNewThreadForm/CreateNewThreadForm';
import ThreadsList from '../../components/ThreadsList/ThreadsList';
import FixedBar from '../../components/FixedBar/FixedBar';

//Utilities
import UserContext from '../../utils/context';

//Style
import './NewThread.css'

class NewThread extends React.Component {
  static contextType = UserContext;
  
  componentDidMount() {
    // this.context.setSearchedCategoryItems([]);
  }
  render() {
    return(
      <div className="NewThread">
          <Header />
          <main>
            <CreateNewThreadForm />
          </main>
      </div>
    );
  }
}

export default NewThread;

// <Directory />
// <SortOptions />
// <ThreadsList />
// Line 23, 24, 25, 26