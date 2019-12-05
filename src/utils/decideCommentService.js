import AuthService from './auth-service'
import moment from 'moment';

function decideCommentService(context, id) {
  if (!context || !id) { return false }
  let slicedWord = context.category.slice(0,context.category.length-1);
  if (slicedWord === 'movie') {
    return AuthService.getMovieComments('movies',id)
    .then(comments => {
      if (comments.length > 0) {
        let final = comments[comments.length-1] || {}
        let date = moment(final.date_created).format('MMMM Do YYYY, h:mm:ss a')
          return date;
      }
    })
  }
  else if (slicedWord === 'tv_show') {
    return AuthService.getTVShowComments('tv_shows',id)
    .then(comments => {
      if (comments.length > 0) {
        let final = comments[comments.length-1] || {}
        let date = moment(final.date_created).format('MMMM Do YYYY, h:mm:ss a')
          return date;
      }
    })
  }
  else if (slicedWord === 'podcast') {
    return AuthService.getPodcastComments('podcasts',id)
    .then(comments => {
      if (comments.length > 0) {
        let final = comments[comments.length-1] || {}
        let date = moment(final.date_created).format('MMMM Do YYYY, h:mm:ss a')
          return date;
      }
    })
  }
  else if (slicedWord === 'book') {
    return AuthService.getBookComments('books',id)
    .then(comments => {
      if (comments.length > 0) {
        let final = comments[comments.length-1] || {}
        let date = moment(final.date_created).format('MMMM Do YYYY, h:mm:ss a')
          return date;
      }
    })
  }
  return false;
}

export default decideCommentService;