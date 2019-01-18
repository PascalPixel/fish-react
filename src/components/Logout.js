import React, { Component, createElement as e } from 'react'
import { Redirect } from 'react-router-dom'
import Loading from './Loading'
import { app } from '../firebase'

class Logout extends Component {
  state = {
    redirect: false,
  }

  componentWillMount() {
    app
      .auth()
      .signOut()
      .then(() => {
        this.setState({
          redirect: true,
        })
      })
  }

  render() {
    if (this.state.redirect) {
      return e(Redirect, {
        to: '/',
      })
    } else {
      return e(Loading)
    }
  }
}

export default Logout
