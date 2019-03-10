const initialState = {
  status: 'loading',
  progress: 0,

}

const login = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_STATUS':
      return action.status

    default:
      return state
  }
}

export default login
