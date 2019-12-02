import React from 'react';
import './ThreadDetails.css';
import AuthApi from '../../utils/auth-service'

export default class ThreadDetails extends React.Component {

  state = {
    
  }

  componentDidMount(){
    let thread = this.props.thread;
    let id = this.props.id;
    AuthApi.getSpecificEvent(thread, id)
    .then(resJSON => this.setState({
      event: {...resJSON}
    }))

    console.log(this.state)
  }

  convertDate = date => {

    let newDate = new Date(date)

    return `${newDate.toDateString()}`
  }

  render(){
    console.log(this.state)
    return (
      <div className='thread-details'>
        <h3>{this.state.event ? this.state.event[0].title : 'Loading...'}</h3>
        <p>{this.state.event ? this.state.event[0].event_description : 'Loading...'}</p>
        <p>{this.state.event ? this.convertDate(this.state.event[0].date_created) : 'Loading...'}</p>
      </div>
      )
  }
}