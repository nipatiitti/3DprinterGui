export const loading = (bool) => {
  return {
    type: 'LOADING_ACTION',
    bool
  }
}

export const error = (text) => {
  return {
    type: 'ERROR_MESSAGE',
    msg: text.msg
  }
}

//export const baseUrl = "http://localhost:5000"
export const baseUrl = "http://192.168.43.194:5000"
