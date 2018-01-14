import React from 'react'
import { Link, BrowserRouter } from 'react-router-dom'

export default class Layout extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      loggedIn: undefined
    }

    this.styles = {
      width: '100%',
      position: 'absolute',
      backgroundColor: '#333',
      top: 0,
      left: 0
    }
  }

  render () {
    return (
      <div>
        <div className="body_container">
          {this.props.children}
        </div>
      </div>
    )
  }
}

