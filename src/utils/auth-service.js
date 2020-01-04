import TokenService from './token-service'
import config from '../config'

const AuthApiService = {
    newUser(user) {
      return fetch(`${config.API_ENDPOINT}/user`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    postLogin(credentials) {
      return fetch(`${config.API_ENDPOINT}/auth/token`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(err => Promise.reject(err))
            : res.json()
        )
    },
    refreshToken() {
      return fetch(`${config.API_ENDPOINT}/auth/token`, {
        method: 'PUT',
        headers: {
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },
    getMain() {
      return fetch(config.API_ENDPOINT + '/main', 
      {method: 'GET',
       headers: {
        'content-type': 'application/json',
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json(),
      )
    },
    getSpecificThreads(thread) {
      return fetch(config.API_ENDPOINT + `/main/${thread}`, 
      {method: 'GET',
       headers: {
        'content-type': 'application/json',
      },
    })
    .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
    )
    },
    getSpecificEvent(thread, id) {
      return fetch(`${config.API_ENDPOINT}/main/${thread}/${id}`, 
        { method: 'GET',
        header: {
          'content-type': 'application/json'
        }
      })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json(),
      )
      .catch(error => Promise.reject(error))
    },
    getMovieComments(thread,id) {
      return fetch(config.API_ENDPOINT + `/main/movies/${id}/movie_comments`,
      {method: 'GET',
      header: {
        'content-type': 'application/json'
      }
    })
    .then(res => 
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json(),
    )
  },
    getTVShowComments(thread,id) {
      return fetch(config.API_ENDPOINT + `/main/tv_shows/${id}/tv_show_comments`,
      {method: 'GET',
      header: {
        'content-type': 'application/json'
      }
    })
    .then(res => 
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json(),
    )
  },
    getPodcastComments(thread,id) {
      return fetch(config.API_ENDPOINT + `/main/podcasts/${id}/podcast_comments`,
      {method: 'GET',
      header: {
        'content-type': 'application/json'
      }
    })
    .then(res => 
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json(),
    )
  },
    getBookComments(thread,id) {
      return fetch(config.API_ENDPOINT + `/main/books/${id}/book_comments`,
      {method: 'GET',
      header: {
        'content-type': 'application/json'
      }
    })
    .then(res => 
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json(),
      )
    },
    makeThread(obj, thread){
      fetch(`${config.API_ENDPOINT}/main/${thread}`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(obj),
      })
       .then(res =>
          (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json(),
       )
    },
    postComment(category, commentBody) {
      return fetch(`${config.API_ENDPOINT}/comments/${category}_comments`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(commentBody),
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(err => Promise.reject(err))
            : res.json()
        )
  },
    postCommentHappenings(reqBody) {
      return fetch(`${config.API_ENDPOINT}/happening`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${TokenService.getAuthToken()}`,
        },
        body: JSON.stringify(reqBody),
      })
        .then(res =>
          (!res.ok)
            ? res.json().then(err => Promise.reject(err))
            : res.json()
        )
  },
  getHappeningEvents() {
    return fetch(`${config.API_ENDPOINT}/happening`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => 
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  deleteHappeningEvent(id) {
    return fetch(`${config.API_ENDPOINT}/happening/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(res => {
      if(!res.ok) {
        return res.json().then(err => Promise.reject(err))
      }
    })
  },
  getVideoLink(movie_id) {
    return fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${config.API_KEY}&language=en-US`)
    .then(res => 
      (!res.ok)
      ? res.json().then(e => Promise.reject(e))
      : res.json()
    )
  }
}
  
  export default AuthApiService
  

//will include all fetch request here