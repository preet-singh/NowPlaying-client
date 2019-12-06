import React, { Component } from 'react'
import AuthApiService from './auth-service'

const HappeningContext = React.createContext({
  happenings: [],
  setHappenings: () => {}
})

export default HappeningContext;

export class HappeningProvider extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       happenings: []
    }
  }
  
  setHappenings = events => {
    this.setState({
      happenings: events
    })
  }

  render() {
    const value = {
      happenings: this.state.happenings,
      setHappenings: this.setHappenings
    }
    return (
      <HappeningContext.Provider value={value}>
        {this.props.children}
      </HappeningContext.Provider>
    )
  }
}
