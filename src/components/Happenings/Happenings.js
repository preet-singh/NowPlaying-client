//Dependencies
import React, { Component } from 'react';

//Style
import './Happenings.css'


class Happenings extends Component {
  constructor(props){
    super(props);

    this.state = {
      comments: [],
      isLoading: false
    };
  }
  render(){
    return (
      <div className="Happenings">
        <h3>What's happening</h3>
        <ul className="happenings-list">
          <li>Something here</li>
          <li>Also something here</li>
          <li>Last something here</li>
        </ul>
      </div>
    );
  }
}

export default Happenings;