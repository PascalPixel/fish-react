import React, { Component, createElement as e } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Logo from './Logo'
import { app } from '../firebase'

const color = '#32251A'

const Navigation = props =>
  e(
    MenuBar,
    {},
    e(
      Grid,
      {},
      e(
        Row,
        {},
        e(
          Col,
          {
            xs: 12,
          },
          e(
            MenuLinks,
            {},
            e(
              'span',
              {},
              e(
                MenuLink,
                {
                  to: '/',
                },
                e(Logo, {
                  color: color,
                  style: {
                    height: '1.4em',
                    width: 'auto',
                    lineHeight: '1em',
                    verticalAlign: 'middle',
                  },
                }),
                e(
                  'span',
                  {
                    style: {
                      color: color,
                    },
                  },
                  ' Fish'
                )
              )
            ),
            e(
              'span',
              {},
              props.authenticated
                ? e(
                    'span',
                    {},
                    e(
                      MenuLink,
                      {
                        to: '/',
                      },
                      'Home'
                    ),
                    e(
                      MenuLink,
                      {
                        to: '/projects',
                      },
                      'Projects'
                    ),
                    e(
                      MenuLink,
                      {
                        to: '/projects/new',
                      },
                      'New Project'
                    ),
                    e(
                      MenuLink,
                      {
                        to: '/logout',
                      },
                      'Log Out'
                    )
                  )
                : e(
                    'span',
                    {},
                    e(
                      MenuLink,
                      {
                        to: '/login',
                      },
                      'Log In'
                    ),
                    e(
                      MenuLink,
                      {
                        to: '/signup',
                      },
                      'Sign Up'
                    )
                  )
            )
          )
        )
      )
    )
  )

const MenuBar = styled.div`
  width: 100%;
`

const MenuLinks = styled.div`
  display: flex;
  justify-content: space-between;
`

const MenuLink = styled(Link)`
  display: inline-block;
  padding: 1rem 0.65rem;
`

export default Navigation
