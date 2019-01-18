import React, { Component, createElement as e } from 'react'
import ReactDOM from 'react-dom'
import { Route, Redirect, BrowserRouter, Switch } from 'react-router-dom'
import 'normalize.css'

import './index.css'
import { app } from './firebase'

import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Loading from './components/Loading'
import Error from './components/Error'
import Landing from './components/Landing'
import Projects from './components/Projects'
import SignUp from './components/SignUp'
import Login from './components/Login'
import Logout from './components/Logout'

const AuthRoute = props => {
  if (props.authenticated) {
    return e(Route, { ...props })
  } else {
    return e(Redirect, {
      to: '/login',
    })
  }
}

class App extends Component {
  state = {
    authenticated: false,
    loading: true,
    users: [],
  }

  authListener = () => {
    app.auth().onAuthStateChanged(user => {
      this.setState({
        authenticated: user ? true : false,
        loading: false,
      })
    })
  }

  componentWillMount() {
    this.authListener()
  }

  componentWillUnmount() {
    this.authListener()
  }

  render() {
    if (this.state.loading) {
      return e(Loading)
    } else {
      return e(
        BrowserRouter,
        {},
        e(
          'div',
          {
            style: {
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'column',
              height: '100%',
            },
          },
          e(Navigation, {
            authenticated: this.state.authenticated,
          }),
          e(
            'div',
            {},
            e(
              Switch,
              {},
              e(Route, {
                exact: true,
                path: '/',
                component: Landing,
              }),
              e(Route, {
                exact: true,
                path: '/login',
                component: Login,
              }),
              e(Route, {
                exact: true,
                path: '/signup',
                component: SignUp,
              }),
              e(AuthRoute, {
                path: '/projects',
                component: Projects,
                authenticated: this.state.authenticated,
              }),
              e(AuthRoute, {
                exact: true,
                path: '/logout',
                component: Logout,
                authenticated: this.state.authenticated,
              }),
              e(Route, {
                component: Error,
              })
            )
          ),
          e(Footer)
        )
      )
    }
  }
}

ReactDOM.render(e(App), document.getElementById('root'))
