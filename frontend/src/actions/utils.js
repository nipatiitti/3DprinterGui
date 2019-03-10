export const loading = (bool) => {
  return {
    type: 'LOADING_ACTION',
    bool
  }
}

export const error = (text) => {
  return (dispatch) => {
      dispatch(errorMessage(text, true))

      window.setTimeout(() => {
          dispatch(errorMessage('', false))
      }, 4000)
  }
}

const errorMessage = (text, open) => {
  return {
      type: 'ERROR_ACTION',
      text,
      open
  }
}

export const message = (text) => {
  return (dispatch) => {
      dispatch(messageMessage(text, true))

      window.setTimeout(() => {
          dispatch(messageMessage('', false))
      }, 4000)
  }
}

const messageMessage = (text, open) => {
  return {
      type: 'MESSAGE_ACTION',
      text,
      open
  }
}

export const baseUrl = "http://localhost:5000"
//export const baseUrl = "http://192.168.43.194:5000"
