import React from 'react';
import ThreadItem from '../ThreadItem/ThreadItem';
import './ThreadsList.css';
import AuthService from '../../utils/auth-service';
import UserContext from '../../utils/context';

class ThreadsList extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getThreads = (context) => {
    let threads = this.context.categoryItems || [];
    return threads.map((item,index) => <ThreadItem details={item} key={index} />);
  }

  render() {
    return (
      <div className='threads-list'>
        <h3>{this.context.category}</h3>
        {this.getThreads(this.context)}
      </div>
    )
  }
}

export default ThreadsList;