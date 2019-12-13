/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import UserContext from '../../utils/context';
import AuthApiService from '../../utils/auth-service';
import './Happenings.css'
import {Link} from 'react-router-dom';

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
    let firstHappenings = this.state.happenings;
    return (
      <div className="Happenings">
        <h3>ACTIVITY</h3>
        <ul className="happenings-list">
          {firstHappenings.map(event => {
          if (event) {
             if (event.media_title) { return(
                  <li key={event.id}><span className="happening-label">New thread:</span> <Link to={`${event.media_type}/${event.media_id}`}><span className="media-title">{event.media_title}</span></Link></li>
             ); }
             else { return(
                 <li key={event.id}><span className="happening-label">New comment:</span> <Link to={`${event.media_type}/${event.media_id}`}><span className="media-title">{event.media_title_comments}</span></Link></li>
             ); }
          }})}
        </ul>
      </div>
    );
  }
}

export default Happenings;