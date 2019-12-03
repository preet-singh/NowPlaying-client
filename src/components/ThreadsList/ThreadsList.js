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

  getThreads = (context) => {
    let threads = this.context.categoryItems || [];
    return threads.map((item,index) => <ThreadItem details={item} key={index} />);
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
        {this.getThreads(this.context)}
      </div>
    )
  }
}

export default withRouter(ThreadsList);