const initialState = false
  
const loading = (state = initialState, action) => {
    switch (action.type) {
      case 'LOADING_ACTION':
        return action.bool
  
      default:
        return state
    }
}
  
export default loading  