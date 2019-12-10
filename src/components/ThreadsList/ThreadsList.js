import React from 'react';
import ThreadItem from '../ThreadItem/ThreadItem';
import './ThreadsList.css';
import AuthService from '../../utils/auth-service';
import UserContext from '../../utils/context';
import {withRouter, Link} from 'react-router-dom';
import Pagination from '../Pagination/Pagination.js'

class ThreadsList extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      posts: false,
      currentPageNumber: 1,
      newPageNumber: 1,
    }
  }

  getThreads = () => {
    let limit = this.props.limit || 5;
    let returnItem = [];
    for (let i=0;i<limit;i++) {
      if (this.state.posts[i]) {
        returnItem.push(<ThreadItem details={this.state.posts[i]} key={i} />)
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

  paginate = pageNumber => {
    this.setState({
      newPageNumber: pageNumber
    })
  }

  setPosts = () => {
    window.scrollTo(0,0)
    if(this.context.categoryItems){
      let postsPerPage = 5;
      let currentPage = this.state.newPageNumber;

      let allPosts = this.context.categoryItems;

      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

      if(!this.state.posts){
        this.setState({
          posts: currentPosts
        })
      }

      if(this.state.currentPageNumber !== this.state.newPageNumber){
        this.setState({
          posts: currentPosts,
          currentPageNumber: this.state.newPageNumber
        })
      }
      
      return <Pagination postsPerPage={5} totalPosts={allPosts.length} paginate={this.paginate}/>
    } else {
      return <button>1</button>
    }
  }

  render() {
    return (
      <div className='threads-list'>
        <h3>{this.context.category} {this.checkIfHome()}</h3>
        {this.getThreads()} 
        {this.setPosts()}
      </div>
    )
  }
}

export default withRouter(ThreadsList);

// <Pagination postsPerPage={this.state.postsPerPage} totalPosts={this.state.posts.length} paginate={this.paginate}/>