import React, { Component, createElement as e } from 'react'
import { Grid, Row, Col } from 'react-flexbox-grid'

const Loading = () =>
  e(
    'div',
    {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
      },
    },
    e(
      'svg',
      {
        width: '38',
        height: '38',
        viewBox: '0 0 38 38',
        xmlns: 'http://www.w3.org/2000/svg',
        stroke: '#0055AA',
      },
      e(
        'g',
        {
          fill: 'none',
          fillRule: 'evenodd',
        },
        e(
          'g',
          {
            transform: 'translate(1 1)',
            strokeWidth: '2',
          },
          e('circle', {
            strokeOpacity: '.5',
            cx: '18',
            cy: '18',
            r: '18',
          }),
          e(
            'path',
            {
              d: 'M36 18c0-9.94-8.06-18-18-18',
            },
            e('animateTransform', {
              attributeName: 'transform',
              type: 'rotate',
              from: '0 18 18',
              to: '360 18 18',
              dur: '1s',
              repeatCount: 'indefinite',
            })
          )
        )
      )
    )
  )

export default Loading
