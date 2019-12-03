//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Directory from '../../components/Directory/Directory';
import Happenings from '../../components/Happenings/Happenings';
import ThreadCategory from '../../components/ThreadCategory/ThreadCategory';

//Styling
import './HomePage.css'

function HomePageRoute(props) {
  return(
    <div className="HomePage">
      <h1>Now Playing teehee</h1>
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