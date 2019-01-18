import React, { Component, createElement as e } from 'react'
import { Link, Redirect, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { app, db } from '../firebase'
import { WithContext as ReactTags } from 'react-tag-input'
import Markdown from 'react-markdown'
import validator from 'email-validator'
import Loading from './Loading'
import Error from './Error'

const MarkdownLogo = () => {
  return e(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      version: '1.1',
      width: '208',
      height: '128',
      viewBox: '0 0 208 128',
      style: {
        height: '0.8em',
        width: 'auto',
      },
    },
    e('rect', {
      style: {
        fill: 'none',
        stroke: '#0055AA',
        strokeWidth: '10',
      },
      width: '198',
      height: '118',
      x: '5',
      y: '5',
      ry: '10',
    }),
    e('path', {
      style: {
        fill: '#0055AA',
      },
      d:
        'm 30,98 0,-68 20,0 20,25 20,-25 20,0 0,68 -20,0 0,-39 -20,25 -20,-25 0,39 z',
    }),
    e('path', {
      style: {
        fill: '#0055AA',
      },
      d: 'm 155,98 -30,-33 20,0 0,-35 20,0 0,35 20,0 z',
    })
  )
}

const ProjectsIndex = props => {
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
        e('h1', {}, 'Projects'),
        Object.keys(props.projects).map(key => {
          return e(
            'li',
            {
              key: key,
            },
            e(
              Link,
              {
                to: `/projects/${key}`,
              },
              props.projects[key].title
            )
          )
        })
      )
    )
  )
}

const ProjectsShow = props => {
  return e(
    Grid,
    {},
    e(
      Row,
      {},
      e(
        Col,
        {
          sm: 8,
          smOffset: 2,
        },
        props.project.title !== undefined
          ? e('h1', {}, props.project.title)
          : null,
        e('hr'),
        e('b', {}, 'Owner: '),
        props.project.owner !== undefined
          ? e('code', {}, props.project.owner)
          : null,
        e('br'),
        e('b', {}, 'Users: '),
        props.project.users !== undefined
          ? e('code', {}, props.project.users.map(user => `${user}, `))
          : null,
        e('br'),
        e('b', {}, 'Actions: '),
        e(
          Link,
          {
            className: 'button',
            to: `/projects/${props.id}/edit`,
          },
          'Edit'
        ),
        props.project.description !== undefined
          ? e(Markdown, {
              source: props.project.description,
            })
          : null
      )
    )
  )
}

class ProjectsForm extends Component {
  state = {
    redirect: false,
    error: {
      message: '',
    },
    owner: '',
    tagsError: '',
    users: [],
    title: this.props.project ? this.props.project.title : '',
    description: this.props.project ? this.props.project.description : '',
  }

  handleDelete = i => {
    this.setState({
      users: this.state.users.filter((user, index) => index !== i),
    })
  }

  handleAddition = user => {
    if (validator.validate(user.text)) {
      this.setState({
        users: [...this.state.users, ...[user]],
        tagsError: '',
      })
    } else {
      this.setState({
        tagsError: 'That email is invalid',
      })
    }
  }

  addProject = e => {
    var user, users
    e.preventDefault()
    user = app.auth().currentUser
    // Array from objects
    users = []
    this.state.users.forEach(obj => {
      users.push(obj.text)
    })
    if (this.props.project) {
      db.update(`projects/${this.props.id}`, {
        data: {
          owner: user.email,
          users: [user.email, ...users],
          title: this.state.title,
          description: this.state.description,
        },
      })
        .then(() => {
          this.setState({
            redirect: true,
          })
        })
        .catch(error => {
          this.setState({
            error: error,
          })
        })
    } else {
      db.push('projects', {
        data: {
          owner: user.email,
          users: [user.email, ...users],
          title: this.state.title,
          description: this.state.description,
        },
      })
        .then(() => {
          this.setState({
            redirect: true,
          })
        })
        .catch(error => {
          this.setState({
            error: error,
          })
        })
    }
  }

  render() {
    if (this.state.redirect) {
      return e(Redirect, {
        to: '/projects',
      })
    } else {
      return e(
        Grid,
        {},
        e('h1', {}, 'New Project'),
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
            onSubmit: this.addProject,
          },
          e('label', {}, 'Who else is working on this?'),
          e(
            'div',
            {
              className: 'ReactTags__wrap',
              style:
                this.state.tagsError !== ''
                  ? {
                      borderColor: 'red',
                    }
                  : undefined,
            },
            e(ReactTags, {
              tags: this.state.users,
              placeholder:
                this.state.tagsError !== ''
                  ? this.state.tagsError
                  : 'e.g. great@person.yay',
              handleDelete: this.handleDelete,
              handleAddition: this.handleAddition,
              delimiters: [32, 188, 13],
            })
          ),
          e('label', {}, 'Project Title'),
          e('input', {
            name: 'title',
            type: 'text',
            placeholder: 'e.g. Cool new idea ❄︎',
            value: this.state.title,
            onChange: e => {
              this.setState({
                title: e.target.value,
              })
            },
          }),
          e(
            'label',
            {},
            'Project description',
            e(
              'small',
              {},
              ' ',
              e(
                Link,
                {
                  to: 'https://guides.github.com/features/mastering-markdown/',
                },
                e(MarkdownLogo),
                ' Markdown'
              ),
              ' compatible.'
            )
          ),
          e('textarea', {
            name: 'description',
            type: 'text',
            placeholder:
              'e.g. We agree to be super nice and have a good working relationship...',
            value: this.state.description,
            onChange: e => {
              this.setState({
                description: e.target.value,
              })
            },
            rows: '10',
          }),
          e(
            'button',
            {
              className: 'primary',
              type: 'submit',
            },
            'Save'
          )
        )
      )
    }
  }
}

class Projects extends Component {
  state = {
    projects: {},
    loading: true,
  }

  componentWillMount() {
    db.bindToState('projects', {
      context: this,
      state: 'projects',
      then: () => {
        this.setState({
          loading: false,
        })
      },
    })
  }

  render() {
    return e(
      Switch,
      {},
      e(Route, {
        exact: true,
        path: `${this.props.match.url}`,
        render: props => {
          if (this.state.loading) {
            return e(Loading)
          } else {
            return e(ProjectsIndex, {
              projects: this.state.projects,
            })
          }
        },
      }),
      e(
        Route,
        {
          exact: true,
          path: `${this.props.match.url}/new`,
        },
        e(ProjectsForm, {
          project: null,
          id: null,
        })
      ),
      e(Route, {
        exact: true,
        path: `${this.props.match.url}/:projectId/edit`,
        render: props => {
          if (this.state.loading) {
            return e(Loading)
          } else {
            return e(ProjectsForm, {
              project: this.state.projects[props.match.params.projectId],
              id: props.match.params.projectId,
            })
          }
        },
      }),
      e(Route, {
        exact: true,
        path: `${this.props.match.url}/:projectId`,
        render: props => {
          if (this.state.loading) {
            return e(Loading)
          } else {
            return e(ProjectsShow, {
              project: this.state.projects[props.match.params.projectId],
              id: props.match.params.projectId,
            })
          }
        },
      }),
      e(Route, {}, e(Error))
    )
  }
}

export default Projects
