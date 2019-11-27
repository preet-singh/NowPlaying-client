//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Directory from '../../components/Directory/Directory';
import Happenings from '../../components/Happenings/Happenings';
import ThreadCategory from '../../components/ThreadCategory/ThreadCategory';

function HomePageRoute() {
  return(
    <div className="HomePage">
      <Header />
      <Directory />
      <Happenings />
      <main>
        <ThreadCategory />
      </main>
    </div>
  );
}

export default HomePageRoute;