//Dependencies
import React from 'react';
import {Link} from 'react-router-dom';

//Utilities
import UserContext from '../../utils/context';
import AuthApiService from '../../utils/auth-service';

class CreateNewThreadForm extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      existError: false
    }
  }

  //Check if the item exists in our database alraedy. 
  //If not, query the 3rd-party API
  //gather the details
  //send them to the NowPlaying server
  //gather the response
  //direct user to the new link
  checkForm = (e) => {
    e.preventDefault();
    this.setState({
      existError: false,
      autoFillMovie: null,
      allMovieResults: null,
      selectedMovieId: null,
      selectedMovie: null,
      showMovies: null
    });
    let find = this.context.categoryItems.find(item => item.title.toLowerCase() === this.state.title.toLowerCase());
    if (find) {
      this.context.setSearchedCategoryItems([find])
      this.setState({existError: find})
    }
    else {
      let API_Key = '4ac5392bc939c102a89ae2c2fd81ed8d'
      let search = this.state.title
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&language=en-US&query=${search}&page=1`)
      .then(res => 
        (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
      )
      .then(resJSON => {
        this.setState({
        allMovieResults: resJSON,
        showMovies: true,
        title: ''
      })
      } 
    )}

  }

  threadExists = () => {
    return(
      <div className="error">
        <h3>There is already a thread that exists!</h3>
        <p>Visit the link below or search again for something new!</p>
      </div>
    );
  }

  displayMovies = () => {
    console.log('display movies ran')
    console.log(this.state.allMovieResults)
    return this.state.allMovieResults.results.map(movie => 
      <li key={movie.id}>
        <Link onClick={() => this.setState({ selectedMovie: true, selectedMovieId: movie.id })}>
          <h2>{movie.title}</h2>
          <p>Release Date: {movie.release_date}</p>
          <img src={`http://image.tmdb.org/t/p/w185//${movie.poster_path}`} alt={movie.title} />
        </Link>
      </li>
    )
  }

  autoFillMovie = () => {

    let API_Key = '4ac5392bc939c102a89ae2c2fd81ed8d'

    if(this.state.title){
      console.log('movie selected still');
    } else {
      fetch(`https://api.themoviedb.org/3/movie/${this.state.selectedMovieId}?api_key=${API_Key}&language=en-US`)
        .then(res => 
          (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
        )
        .then(resJSON => {
          console.log(resJSON)
          if(this.state.showMovies !== false && this.state.autoFillMovie !== resJSON){
            this.setState({
              showMovies: false,
              autoFillMovie: resJSON
            })
          }
        } 
      )
    }

    console.log(this.state.autoFillMovie)

    return this.state.autoFillMovie ? 
          <div>
            <h2>{this.state.autoFillMovie.original_title}</h2>
            <img src={this.state.autoFillMovie.belongs_to_collection ? 
            `http://image.tmdb.org/t/p/w185/${this.state.autoFillMovie.belongs_to_collection.poster_path}`
            : 
            '#'} 
            alt={this.state.autoFillMovie.original_title}/>
            <p>{this.state.autoFillMovie.overview}</p>
            <form onSubmit={this.handleNewThread}>
              <label>Description</label>
              <textarea type='text'></textarea>
              <button type='submit'></button>
            </form>
          </div>
          : 
          null
  }

  handleNewThread = ev => {
    ev.preventDefault()
    // title, event_description, id, media_runtime, release_date, genre, imdb_rating, mpaa_rating, poster
    let allMovieInfo = {
      title: this.state.autoFillMovie.original_title,
      event_description: this.state.autoFillMovie.overview,
      id: this.state.selectedMovieId,
      media_runtime: this.state.autoFillMovie.runtime,
      release_date: this.state.autoFillMovie.release_date,
      genre: this.state.autoFillMovie.genres[0].name,
      imdb_rating: this.state.autoFillMovie.vote_average,
      mpaa_rating: this.state.autoFillMovie.vote_average,
      poster: this.state.autoFillMovie.poster_path,
    }
    AuthApiService.makeThread(allMovieInfo)
    console.log('new thread created')
  }

  render() {
    return(
      <div>
        <form className="CreateNewThreadForm" onSubmit={(e) => this.checkForm(e)}>
          <legend>Start a new thread!</legend>
          {this.state.existError ? this.threadExists() : ''}
          <label htmlFor="newThreadTitle" id="newThreadTitleLabel" name="newThreadTitleLabel">{this.context.category} title:</label>
          <input type="text" id="newThreadTitle" name="newThreadTitle" placeholder="Game of Thrones" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})} />
          <button type="submit">Search!</button>
        </form>
        <div>
          <ul>
            {this.state.showMovies ? this.displayMovies() : null}
          </ul>
          {this.state.selectedMovie ? this.autoFillMovie() : null}
        </div>
      </div>
    );
  }
}

export default CreateNewThreadForm;