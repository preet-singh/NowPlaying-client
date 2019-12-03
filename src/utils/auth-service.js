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
  },
    getTVShowComments(thread,id) {
      return fetch(config.API_ENDPOINT + `/main/tv_shows/${id}/tv_show_comments`,
      {method: 'GET',
      header: {
        'content-type': 'application/json'
      }
    })
  },
    getPodcastComments(thread,id) {
      return fetch(config.API_ENDPOINT + `/main/podcasts/${id}/podcast_comments`,
      {method: 'GET',
      header: {
        'content-type': 'application/json'
      }
    })
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
  }
  }
  
  export default AuthApiService
  

//will include all fetch request here