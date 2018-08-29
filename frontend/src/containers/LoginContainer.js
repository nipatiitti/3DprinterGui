import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'


import Login from '../components/Login'

const mapStateToProps = (state, props) => {
  return {
    location: props.location
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

const LoginContainer = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Login))

export default LoginContainer
