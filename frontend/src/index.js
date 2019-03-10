import React from 'react'
import { render } from 'react-dom'

import Root from './routes/Root'

import { socket } from './socket'

import { store, persistor } from './configStore'

import './styles/all.css'

render(
  <Root store={store} persistor={persistor} socket={socket} />,
  document.getElementById('root')
)
