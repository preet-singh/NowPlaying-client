import React from 'react';
import ThreadItem from '../ThreadItem/ThreadItem';
import './ThreadsList.css';
import AuthService from '../../utils/auth-service';
import UserContext from '../../utils/context';
import {withRouter, Link} from 'react-router-dom';
import decideCommentService from '../../utils/decideCommentService';

class ThreadsList extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  getThreads = async () => {
    let limit = this.props.limit || 10;
    let threads = this.context.filteredCategoryItems || []; // MAY NEED TO LOOK INTO LATER...CATEGORY VS. FILTERED CATEGORY, which takes precedence???
    let returnItem = [];
    for (let i=0;i<limit;i++) {
      if (threads[i]) {
        let comment = await decideCommentService(this.context,threads[i].id)
        console.log(';feoaijfioeajf');
        console.log(comment);
        returnItem.push(<ThreadItem details={threads[i]} comment={comment} key={i} />)
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