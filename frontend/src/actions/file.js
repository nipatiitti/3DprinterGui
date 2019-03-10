import axios from 'axios'

import {loading, error, message, baseUrl} from './utils.js'

export const sendFile = lines => {
  return async (dispatch) => {
    dispatch(loading(true))
    try {
      const {data : { msg }} = await axios.post(baseUrl + '/api', {
        lines
      })
      dispatch(loading(false))
      dispatch(message(msg))
    } catch ( e ) {
      dispatch(loading(false))
      console.error(e)
      dispatch(error(e.response.data.msg))
    }
  }
}

