import React, { Component, createElement as e } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

const Landing = () =>
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
          'div',
          {
            style: {
              textAlign: 'center',
            },
          },
          e('p', {}, "Try Fish. It's tasty")
        )
      )
    )
  )

export default Landing
