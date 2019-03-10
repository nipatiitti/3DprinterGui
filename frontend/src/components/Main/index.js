import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { sendFile } from '../../actions/file'

import Main from './Main'

const mapStateToProps = (state, props) => {
  return {
    location: props.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendFile: (lines) => (
      dispatch(sendFile(lines))
    )
  }
}

const MainContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Main))

export default MainContainer
