import React, { Component } from 'react';
import config from '../../config';
import './Happenings.css'

class Happenings extends Component {
  constructor(props){
    super(props);

    this.state = {
      error: null,
      happenings: [],
      isLoading: false
    };
  }

  componentDidMount() {
    fetch(`${config.API_ENDPOINT}/happening`, {
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
    .then(data => {
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
    let firstFourHappenings = this.state.happenings.slice(0,4);
    let lastHappening = this.state.happenings[4] || {};
    return (
      <div className="Happenings">
        <h3>What's happening</h3>
        <ul className="happenings-list">
          {firstFourHappenings.map(event =>
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



// Happenings table...it persists all data..we want it to have 5 items at a time

// Before we POST we NEED to check first of all IF there are 5 ITEMS IN OUR HAPPENINGS TABLE

// IF THERE IS 5, WE REMOVE THE OLDEST ITEM IN THE DATABASE BASED ON TIMESTAMP USING THE DELETE REQUEST SO THAT IT PERSISTS IN DATABASE

// NEED TO DELETE REQUEST IN OUR HAPPENINGS ROUTE 

// AND THEN ONCE IT HAS BEEN DELETED, WE CALL THE POST REQUEST AND ADD THE NEW HAPPENING EVENT TO DATABASE