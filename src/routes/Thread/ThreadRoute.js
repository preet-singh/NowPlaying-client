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


export default class ThreadRoute extends React.Component {
  render(){
    return(
      <div className="ThreadRoute">
        <Header />
        <Directory />
        <main>
          <ThreadDetails thread={this.props.match.params.thread} id={this.props.match.params.id}/>
          <ScrubBox />
          <PrivateThreadMessage />
          <ThreadCommentList />
        </main>
        <FixedBar />
      </div>
    );
  }
}