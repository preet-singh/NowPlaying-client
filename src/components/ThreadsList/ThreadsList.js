import React from 'react';
import ThreadItem from '../ThreadItem/ThreadItem';
import './ThreadsList.css';
import AuthService from '../../utils/auth-service';
import UserContext from '../../utils/context';

async function getThreads() {
  let threads = await AuthService.getSpecificThreads(this.context.category);
  let returnItem = [];
  for (let i=0;i<3;i++) {
    returnItem.push(<ThreadItem details={threads[i]} key={i} />)
  }
  return returnItem;
}
class ThreadsList extends React.Component {
  static contextType = UserContext;
  render() {
    return (
      <div className='threads-list'>
        <h3>{this.context.category}</h3>
        {getThreads()}
      </div>
    )
  }
}

export default ThreadsList;