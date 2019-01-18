import React, { Component, createElement as e } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

const Footer = () =>
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
        e('code', {}, new Date().getFullYear(), ' (c) Fishisfast'),
        e('br'),
        e('br')
      )
    )
  )

export default Footer
