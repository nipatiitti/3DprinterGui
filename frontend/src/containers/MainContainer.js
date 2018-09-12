import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import {socket} from '../socket'

import Main from '../components/Main'

const mapStateToProps = (state, props) => {
  return {
    socket,
    location: props.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const MainContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Main))

export default MainContainer
