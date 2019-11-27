//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Directory from '../../components/Directory/Directory';
import ThreadDetails from '../../components/ThreadDetails/ThreadDetails';
import ScrubBox from '../../components/ScrubBox/ScrubBox';
import PrivateThreadMessage from '../../components/PrivateThreadMessage/PrivateThreadMessage';
import ThreadCommentList from '../../components/ThreadCommentList/ThreadCommentList';
import FixedBar from '../../components/FixedBar/FixedBar';


function ThreadRoute(props) {
  return(
    <div className="ThreadRoute">
      <Header />
      <Directory />
      <main>
        <ThreadDetails />
        <ScrubBox />
        <PrivateThreadMessage />
        <ThreadCommentList />
      </main>
      <FixedBar />
    </div>
  );

}

export default ThreadRoute;