import { combineReducers } from 'redux'
import status from './status.js'
import utils from './utils.js'


const main = combineReducers({
  status,
  utils
})

export default main
