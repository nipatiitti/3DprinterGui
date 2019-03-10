import { connect } from 'react-redux'

import Status from './Status'

const mapStateToProps = (state) => ({
    status: state.status
})

const mapDispatchToProps = (dispatch) => ({
    
})


const StatusContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Status)

export default StatusContainer