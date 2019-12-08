import React, { Component } from 'react';
import UserContext from '../../utils/context';
import AuthApiService from '../../utils/auth-service';
import './Happenings.css'

class Happenings extends Component {
  static contextType = UserContext;

  constructor(props){
    super(props);

    this.state = {
      error: null,
      happenings: [],
      isLoading: false
    };
  }

  componentDidMount() {
    AuthApiService.getHappeningEvents()
      .then(data => {
        this.context.setHappenings(data);
        this.setState({
          happenings: data
        })
      })
      .catch(res => {
        this.setState({
          error: res.error
        })
      })
    }

  render() {
    let firstHappenings = this.state.happenings.slice(0,this.state.happenings.length - 1);
    let lastHappening = this.state.happenings[this.state.happenings.length - 1] || {};
    return (
      <div className="Happenings">
        <h3>What's happening</h3>
        <ul className="happenings-list">
          {firstHappenings.map(event =>
              (event.media_title)
               ? <>
                  <li className="thread-created">A thread for the {event.media_type.slice(0,event.media_type.length - 1)}, <span className="media-title">{event.media_title}</span>, was created</li>
                  <hr className="underline" />
                 </>
               : 
                <>
                 <li className="comment-created">{event.username} commented <span className="user-comment">"{event.user_comment}"</span> in the <span className="media-title">{event.media_title_comments}</span> thread</li>
                 <hr className="underline" />
                </>
          )}
          {(lastHappening.media_title)
              ? 
                <li className="thread-created">A thread for the {lastHappening.media_type.slice(0,lastHappening.media_type.length - 1)}, <span className="media-title">{lastHappening.media_title}</span>, was created</li>
              : 
                <li className="comment-created">{lastHappening.username} commented <span className="user-comment">"{lastHappening.user_comment}"</span> in the <span className="media-title">{lastHappening.media_title_comments}</span> thread</li> 
          }
        </ul>
      </div>
    );
  }
}

export default Happenings;