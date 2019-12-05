import React from 'react';
import './ThreadItem.css';
import { Link } from 'react-router-dom';
import AuthService from '../../utils/auth-service';
import UserContext from '../../utils/context';
import moment from 'moment';
import playbutton from '../Images/play-button.svg'


class ThreadItem extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  

  getComments = async (context,id) => {
    let slicedWord = context.category.slice(0,context.category.length-1);
    if (slicedWord === 'movie') {
      AuthService.getMovieComments('movies',id)
      .then(comments => {
        if (comments.length > 0) {
          let final = comments[comments.length-1] || {}
          let date = moment(final.date_created).format('MMMM Do YYYY, h:mm:ss a')
          if (!this.state.lastComment) {
            this.setState({lastComment: date})
          }
        }
      })
    }
    else if (slicedWord === 'tv_show') {
      AuthService.getTVShowComments('tv_shows',id)
      .then(comments => {
        if (comments.length > 0) {
          let final = comments[comments.length-1] || {}
          let date = moment(final.date_created).format('MMMM Do YYYY, h:mm:ss a')
          if (!this.state.lastComment) {
            this.setState({lastComment: date})
          }
        }
      })
    }
    else if (slicedWord === 'podcast') {
      AuthService.getPodcastComments('podcasts',id)
      .then(comments => {
        if (comments.length > 0) {
          let final = comments[comments.length-1] || {}
          let date = moment(final.date_created).format('MMMM Do YYYY, h:mm:ss a')
          if (!this.state.lastComment) {
            this.setState({lastComment: date})
          }
        }
      })
    }
    else if (slicedWord === 'book') {
      AuthService.getBookComments('books',id)
      .then(comments => {
        if (comments.length > 0) {
          let final = comments[comments.length-1] || {}
          let date = moment(final.date_created).format('MMMM Do YYYY, h:mm:ss a')
          if (!this.state.lastComment) {
            this.setState({lastComment: date})
          }
        }
      })
    }
  }

  componentDidMount() {
    this.getComments(this.context,this.props.details.id)
  }
  render() {
    let lastCommentExists = `Last comment: ${this.state.lastComment}` || '';
    return (
      <div className='thread-item'>
        <Link to={`/${this.context.category}/${this.props.details.id}`}>
          <h3>{this.props.details.title}</h3>
          <img src='https://img01.mgo-images.com/image/thumbnail/v2/content/MMVAF76018A477C2826A4EC8747C40B7BE27.jpeg' alt='Movie poster'/>
          <p id='last_comment'>{this.state.lastComment? lastCommentExists : 'No comments yet! Be the first!'}</p>
        </Link>
        <img id='play-button' src={playbutton} alt='play button' />
      </div>
    )
  }
}

export default ThreadItem;