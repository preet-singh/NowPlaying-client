import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../ThreadsList/ThreadsList.css';
import ThreadsList from '../ThreadsList/ThreadsList';
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
    if(!this.context.categoryItems){
      return 'No threads yet!'
    }
    let movies = this.context.categoryItems;
    let first = movies[0];
    let second = movies[1];
    let third = movies[2];
    for(let i = 3; i < movies.length; i++){
      if(movies[i].imdb_rating > first.imdb_rating){
        first = movies[i]
      } else if (movies[i].imdb_rating > second.imdb_rating){
        second = movies[i]
      } else if (movies[i].imdb_rating > third.imdb_rating){
        third = movies[i]
      }
    }
    let results = [first, second, third]
    return results.map(movie => {
      return <ThreadItem details={movie} key={movie.id} />
    })
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