//Dependencies
import React from 'react';

//Components
import Header from '../../components/Header/Header';
import Directory from '../../components/Directory/Directory';
import ThreadDetails from '../../components/ThreadDetails/ThreadDetails';
import ThreadCommentList from '../../components/ThreadCommentList/ThreadCommentList';

import AuthApiService from '../../utils/auth-service';
import FixedBar from '../../components/FixedBar/FixedBar';
import UserContext from '../../utils/context'; 



//Utilities
import convertSeconds from '../../utils/convertSeconds';

//Image
import comment from '../../assets/comment.svg';

//Style
import './ThreadRoute.css'

export default class ThreadRoute extends React.Component {
  static defaultProps = [];
  static contextType = UserContext;

  state = {
    comments: [],
    checkedBackground: false
  }

  async componentDidMount() {
    this.checkBackground();
    await this.getComments()

  }

  checkBackground = () => {
    if (this.context.categoryItems) {
    let find = this.context.categoryItems.find(item => item.id === Number(this.props.match.params.id));
    let backdrop = find.backdrop;
    let fullUrl;
    if(backdrop.startsWith('/')) {
      fullUrl = `http://image.tmdb.org/t/p/original/${backdrop}`;
    } else {
      fullUrl = backdrop;
    }
    document.body.style.background = `fixed center center url('${fullUrl}')`;
    }
  }

  
  getComments = async () => {
    const mediaType = this.props.match.params;
    if(mediaType.thread === 'books'){
      await AuthApiService.getBookComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
        this.setState({comments: orderedComments})
      })
    } 
    else if(mediaType.thread === 'movies'){
      await AuthApiService.getMovieComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
        this.setState({comments: orderedComments})
      })
    }
    else if(mediaType.thread === 'podcasts'){
      await AuthApiService.getPodcastComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
        this.setState({comments: orderedComments})
      })
    }
    else if(mediaType.thread === 'tv_shows'){
      await AuthApiService.getTVShowComments(mediaType.thread, mediaType.id)
      .then(res => {
        const orderedComments = res.sort((a,b) => a.comment_timestamp - b.comment_timestamp)
        this.context.setCurrentThreadComments(orderedComments);
        this.setState({comments: orderedComments})
      })
    }
  }
  renderCommentList = () => {
    if (this.state.comments) {
      return (
        <ThreadCommentList getComments={this.getComments}/>
      )
    }
    else {
      return 'No comments in this thread yet!';
    }
  }

  render(){
    if (this.state.checkedBackground !== true) {
      this.checkBackground();
    }
    return(
      <div className="ThreadRoute">
        <Header />
        <Directory thread={this.props.match.params.thread} id={this.props.match.params.id} />
        <main>
          <ThreadDetails thread={this.props.match.params.thread} id={this.props.match.params.id}/>
          {this.renderCommentList()}
          {this.context.playing ? this.context.displayCommentBox ? <FixedBar /> : <div className="bottom-bar"><img onClick={() => this.context.displayCommentSection()} id='open_chatbox' src={comment} alt='open chat box'></img></div> : ''}
        </main>
      </div>
    );
  }
}

export function Handle({
  handle: { id, value, percent },
  getHandleProps
}) {
  return (
    <div
      style={{
        left: `${percent}%`,
        position: 'absolute',
        marginLeft: -15,
        marginTop: 25,
        zIndex: 2,
        width: 30,
        height: 30,
        border: 0,
        textAlign: 'center',
        cursor: 'pointer',
        borderRadius: '50%',
        backgroundColor: '#2C4870',
        color: '#333',
      }}
      {...getHandleProps(id)}
    >
      <div style={{ fontFamily: 'Roboto', fontSize: 11, marginTop: -35 }}>
        {convertSeconds(value)}
      </div>
    </div>
  )
}

