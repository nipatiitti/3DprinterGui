import React from 'react'
import PropTypes from 'prop-types'

import {
  Router,
  Route,
  Switch
} from 'react-router-dom'

import { PersistGate } from 'redux-persist/integration/react'

import { Provider } from 'react-redux'

import history from './history'

import Main from '../components/Main'
import Overlay from '../components/Overlay'

const SendFile = () => <div>hjello</div>

const Root = ({ store, persistor }) => (
  <Provider store={store}>
    <PersistGate loading={<h1>Loading</h1>} persistor={persistor}>
      <Router history={history}>
        <div className="root-container">
          <Overlay />
          <Switch>
            <Route exact path='/' >
              <Main />
            </Route>
            <Route exact path='/sendfile' >
              <SendFile />
            </Route>
          </Switch>
        </div>
      </Router>
    </PersistGate>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  persistor: PropTypes.object.isRequired
}

export default Root
