import React, {useState} from 'react';
import './ThreadDetails.css';
import AuthApi from '../../utils/auth-service'

export default function ThreadDetails(props) {

  const [event] = useState(0)

// AuthApi.getSpecificEvent('movies', 1)
// .then(resJSON => this.setState({
//   event: resJSON
// }))

  console.log(props.thread)
  console.log(props.id)
  console.log(event)

  return (
  <div className='thread-details'>
    <h3>{event.title}</h3>
    <p>{event.description}</p>
    <p>{event.date}</p>
  </div>
  )
}