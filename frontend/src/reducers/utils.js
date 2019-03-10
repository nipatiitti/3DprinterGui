const initialState = {
  loading: false,
  error: {
      text: '',
      open: false
  },
  message: {
      text: '',
      open: false
  }
}

const login = (state = initialState, action) => {
  switch (action.type) {
      case 'LOADING_ACTION':
          return Object.assign({}, state, {
              loading: action.bool
          })

      case 'ERROR_ACTION':
          return Object.assign({}, state, {
              error: {
                  text: action.text,
                  open: action.open
              }
          })
      
      case 'MESSAGE_ACTION':
          return Object.assign({}, state, {
              message: {
                  text: action.text,
                  open: action.open
              }
          })

      default:
          return state
  }
}

export default login
