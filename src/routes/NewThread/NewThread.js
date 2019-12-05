//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Directory from '../../components/Directory/Directory';
import SortOptions from '../../components/SortOptions/SortOptions';
import CreateNewThreadForm from '../../components/CreateNewThreadForm/CreateNewThreadForm';
import ThreadsList from '../../components/ThreadsList/ThreadsList';

//Utilities
import UserContext from '../../utils/context';

class NewThread extends React.Component {
  static contextType = UserContext;
  
  componentDidMount() {
    this.context.setSearchedCategoryItems([]);
  }
  render() {
    return(
      <div className="NewThread">
          <Header />
          <Directory />
          <SortOptions />
          <main>
            <CreateNewThreadForm />
            <ThreadsList />
          </main>
      </div>
    );
  }
}

export default NewThread;