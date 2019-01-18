import React, { Component, createElement as e } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Redirect } from 'react-router-dom'
import { app, db } from '../firebase'

class SignUp extends Component {
  state = {
    redirect: false,
    name: '',
    email: '',
    password: '',
    error: {
      message: '',
    },
  }

  createUser = e => {
    e.preventDefault()
    app
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        db.post(`users/${user.uid}`, {
          data: {
            name: this.state.name,
            email: this.state.email,
          },
        })
          .then(() => {
            this.setState({
              redirect: true,
              name: '',
              email: '',
              password: '',
              error: {
                message: '',
              },
            })
          })
          .catch(error => {
            this.setState({
              error: error,
            })
          })
      })
      .catch(error => {
        this.setState({
          error: error,
        })
      })
  }

  render() {
    if (this.state.redirect) {
      return e(Redirect, {
        to: '/',
      })
    } else {
      return e(
        Grid,
        {},
        e(
          Row,
          {},
          e(
            Col,
            {
              sm: 6,
              smOffset: 3,
            },
            e(
              'p',
              {
                style: {
                  color: 'red',
                },
              },
              this.state.error.message
            ),
            e(
              'form',
              {
                onSubmit: this.createUser,
              },
              e('input', {
                name: 'name',
                type: 'text',
                placeholder: 'Full Name',
                value: this.state.name,
                onChange: e => {
                  this.setState({
                    name: e.target.value,
                  })
                },
              }),
              e('input', {
                name: 'email',
                type: 'email',
                placeholder: 'Email Address',
                value: this.state.email,
                onChange: e => {
                  this.setState({
                    email: e.target.value,
                  })
                },
              }),
              e('input', {
                name: 'password',
                type: 'password',
                placeholder: 'Password',
                value: this.state.password,
                onChange: e => {
                  this.setState({
                    password: e.target.value,
                  })
                },
              }),
              e(
                'button',
                {
                  type: 'submit',
                },
                'Submit'
              )
            )
          )
        )
      )
    }
  }
}

export default SignUp
