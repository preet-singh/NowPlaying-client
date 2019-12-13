import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../ThreadsList/ThreadsList.css';
import UserContext from '../../utils/context';
import ThreadItem from '../ThreadItem/ThreadItem';



class ThreadCategory extends React.Component {

  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  mostPopular = () => {
    if(!this.context.categoryItems) {
      return 'No threads yet!'
    }
    let movies = this.context.categoryItems;
    movies.sort((a,b) => (a.imdb_rating < b.imdb_rating));
    let amount = 3;
    if (movies.length < 3) { amount = movies.length }
    let results = [];
    for (let i=0;i < amount; i++) {
      results.push(<ThreadItem details={movies[i]} key={movies[i].id} />);
    }
    return results;
  }

  checkIfHome = () => {
    if (this.props.location.pathname === '/') {
      return <Link to={`category/${this.context.categoryID}`}>see more</Link>
    }
  }


  render(){
    return (
      <div className='threads-list'>
        <h3>POPULAR MOVIES</h3>
        <h4><Link to="/category/1">(see all)</Link></h4>
          <div className="threads-list-container">
            {this.mostPopular()}
          </div>
      </div>
    )
  }
}

export default withRouter(ThreadCategory);