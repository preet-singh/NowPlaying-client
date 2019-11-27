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
    postLogin({ username, password }) {
      return fetch(`${config.API_ENDPOINT}/auth/token`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
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
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json(),
      )
    },
    getAllThreads(thread) {
      return fetch(config.API_ENDPOINT + `/main/${thread}`, 
      {method: 'GET',
       headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json(),
      )
    },
  }
  
  export default AuthApiService
  

//will include all fetch request here