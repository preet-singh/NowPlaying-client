//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Directory from '../../components/Directory/Directory';
import ThreadList from '../../components/ThreadsList/ThreadsList';


function CategoryRoute() {
  return(
    <div className="CategoryRoute">
      <Header />
      <Directory />
      <main>
        <ThreadList />
      </main>
    </div>
  );

}

export default CategoryRoute;