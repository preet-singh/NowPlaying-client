import React from 'react';
import ThreadItem from '../ThreadItem/ThreadItem';
import './ThreadsList.css';
import AuthService from '../../utils/auth-service';
import UserContext from '../../utils/context';
import {withRouter, Link} from 'react-router-dom';

class ThreadsList extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getThreads = () => {
    let limit = this.props.limit || 10;
    let threads = this.context.filteredCategoryItems || []; // MAY NEED TO LOOK INTO LATER...CATEGORY VS. FILTERED CATEGORY, which takes precedence???
    let returnItem = [];
    for (let i=0;i<limit;i++) {
      if (threads[i]) {
        returnItem.push(<ThreadItem details={threads[i]} key={i} />)
      }
      else if (i === 0) {
        returnItem.push('No threads exist!');
      }
    }
    return returnItem;
  }

  checkIfHome = () => {
    if (this.props.location.pathname === '/') {
      return <Link to={`category/${this.context.categoryID}`}>see more</Link>
    }
  }

  render() {
    return (
      <div className='threads-list'>
        <h3>{this.context.category} {this.checkIfHome()}</h3>
        {this.getThreads()}
      </div>
    )
  }
}

export default withRouter(ThreadsList);