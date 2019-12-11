/* eslint-disable no-restricted-globals */
//Dependencies
import React from 'react';
import {Link, withRouter} from 'react-router-dom';

//Utilities
import UserContext from '../../utils/context';
import AuthApiService from '../../utils/auth-service';
import config from '../../config';

//Style
import './CreateNewThread.css'

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
      showMovies: null,
      selectedMovieImg: null,
      selectedMovieTrailerKey: null,
    });
    let findItems = this.context.categoryItems.filter(item => item.title.toLowerCase().includes(this.state.title.toLowerCase()));
    let API_Key = config.API_KEY;
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
      findItems: findItems,
      title: ''
    })
  })
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
    let alreadyMadeItems = [];
    let notCreatedItems = this.state.allMovieResults.results.map(movie => {
      let tryFind = this.state.findItems.find(item => movie.id === item.movie_id && movie.title === item.title);
      if (tryFind) {
        movie.nowplaying_id = tryFind.id;
        alreadyMadeItems.push(movie);
      }
      else {
        return(
      <li className='displayedSearch' key={movie.id}>
        <Link onClick={() => this.setState({ selectedMovie: true, selectedMovieId: movie.id, selectedMovieImg: movie.poster_path })}>
          <h2>{movie.title}</h2>
          <p>Release Date: {movie.release_date}</p>
          <img src={`http://image.tmdb.org/t/p/w185//${movie.poster_path}`} alt={movie.title} />
        </Link>
      </li>);
    }
  });
  let alreadyMadeItemsMap = alreadyMadeItems.map(movie => {
    return(
      <li key={movie.id}>
        <Link to={`/movie/${movie.nowplaying_id}`}>
          <h2>{movie.title}</h2>
          <p>Release Date: {movie.release_date}</p>
          <img src={`http://image.tmdb.org/t/p/w185//${movie.poster_path}`} alt={movie.title} />
        </Link>
      </li>);
  })
    let finalJSX = [];
    if (notCreatedItems.length >0) {
      finalJSX.push(
      <section className="results">
        <div className="notCreatedItems">
          {notCreatedItems}
        </div>
        {alreadyMadeItems.length > 0 ? <div className="createdItems"><h4>Previously created items:</h4>{alreadyMadeItemsMap}</div> : ''}
      </section>);
    }
    else {
      if (alreadyMadeItems.length > 0) {
        finalJSX.push(
          <section className="results">
            <div className="notCreatedItems">
              <h4>All items with this title have been created!</h4>
              <h4>Previously created items:</h4>
              {alreadyMadeItemsMap}
            </div>
          </section>
        )
      }
    }
    return finalJSX;
  }

  autoFillMovie = () => {

    let API_Key = config.API_KEY;

    if(this.state.title){
      console.log('movie selected still');
    } else if(this.state.showMovies !== false) {
      fetch(`https://api.themoviedb.org/3/movie/${this.state.selectedMovieId}?api_key=${API_Key}&language=en-US`)
        .then(res => 
          (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
        )
        .then(resJSON => {
          if(this.state.showMovies !== false && this.state.autoFillMovie !== resJSON) {
            this.setState({
              showMovies: false,
              autoFillMovie: resJSON
            })
          }
          let resultTrailer = resJSON.videos.results.find(result => result.type === 'Trailer' && result.site === 'YouTube');
          if(resultTrailer) {
            this.setState({
              selectedMovieTrailerKey: resultTrailer.key
            })
          }
        } 
      )
    }

    return this.state.autoFillMovie ? 
          <div className='autoFill_form'>
            <h2>{this.state.autoFillMovie.title}</h2>
            <img src={this.state.selectedMovieImg ? 
            `http://image.tmdb.org/t/p/w185//${this.state.selectedMovieImg}`
            : 
            '#'} 
            alt={this.state.autoFillMovie.title}/>
            <p>{this.state.autoFillMovie.overview}</p>
            <p>Release Date: {this.state.autoFillMovie.release_date}</p>
            <form onSubmit={(e) => this.handleNewThread(e)}>
              <button type='submit'>Make new Thread</button>
            </form>
          </div>
          : 
          null
  }

  handleNewThread = async ev => {
    ev.preventDefault()
    // title, event_description, id, media_runtime, release_date, genre, imdb_rating, mpaa_rating, poster
    let allMovieInfo = {
      title: this.state.autoFillMovie.title,
      event_description: this.state.autoFillMovie.overview,
      media_runtime: this.state.autoFillMovie.runtime,
      release_date: this.state.autoFillMovie.release_date,
      imdb_rating: Math.floor(this.state.autoFillMovie.vote_average),
      mpaa_rating: "PG-13",
      movie_id: this.state.autoFillMovie.id,
      poster: this.state.autoFillMovie.poster_path,
      backdrop: this.state.autoFillMovie.backdrop_path,
      media_id: this.state.selectedMovieId,
      video_key: this.state.selectedMovieTrailerKey
    }
    await AuthApiService.makeThread(allMovieInfo, 'movies')
    await this.context.updateCategoryItems();
    let lastId = this.context.categoryItems[this.context.categoryItems.length-1].id
    await AuthApiService.getSpecificEvent(this.context.category, lastId)
      .then(res => {
        const commentBodyHappenings = {
          username: this.context.user.username,
          user_comment: this.state.comment,
          media_title: allMovieInfo.title,
          media_type: this.context.category,
          media_id: lastId
        }
        AuthApiService.postCommentHappenings(commentBodyHappenings)
      })
    this.props.history.push(`/${this.context.category}/${lastId}`)
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
        <div className='grid_for_desktop'>
          <ul className='UL_displayMovies'>
            {this.state.showMovies ? this.displayMovies() : null}
          </ul>
          {this.state.selectedMovie ? this.autoFillMovie() : null}
        </div>
      </div>
    );
  }
}

export default withRouter(CreateNewThreadForm);