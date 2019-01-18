import React, { Component, createElement as e } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

const Error = () =>
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
          sm: 6,
          smOffset: 3,
        },
        e('h1', {}, 'Error')
      )
    )
  )

export default Error
