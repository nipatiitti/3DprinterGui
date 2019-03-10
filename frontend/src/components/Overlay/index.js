import { connect } from 'react-redux'

import Overlay from './Overlay'

const mapStateToProps = (state) => {
    return {
        error: state.utils.error,
        message: state.utils.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


const OverlayContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Overlay)

export default OverlayContainer