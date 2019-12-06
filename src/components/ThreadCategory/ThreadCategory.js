import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import './ThreadCategory.css';
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
    if(!this.context.filteredCategoryItems || this.context.filteredCategoryItems.length <= 3){
      return null
    }
    let movies = this.context.filteredCategoryItems;
    let first = movies[0];
    let second = movies[1];
    let third = movies[2];
    for(let i = 0; i < movies.length; i++){
      if(movies[i].imdb_rating > first.imdb_rating){
        first = movies[i]
      } else if (movies[i].imdb_rating > second.imdb_rating){
        second = movies[i]
      } else if (movies[i].imdb_rating > third.imdb_rating){
        third = movies[i]
      }
    }
    console.log(movies)
    let results = [first, second, third]
    console.log(results)
    return results.map(movie => {
      console.log('details' + movie)
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
      <div className='thread-category'>
        <h3>Popular</h3>
        <h4>{this.context.category} {this.checkIfHome()}</h4>
        {this.mostPopular()}
      </div>
    )
  }
}

export default withRouter(ThreadCategory);