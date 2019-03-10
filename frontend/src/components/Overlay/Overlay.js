import React, { Component, Fragment } from 'react'

import { withStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'

import ErrorIcon from 'react-icons/lib/md/error-outline'


const styles = theme => ({
    container: {
        display: 'flex',
        alignItems: 'center'
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    errorText: {
        color: 'white'
    }
})

class Overlay extends Component {
    constructor(props) {
        super(props)

    }


    render = () => (
        <Fragment>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.props.message.open}
                message={(
                    <span>
                        {this.props.message.text}
                    </span>
                )}   
            />
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={this.props.error.open}
                
            >
                <SnackbarContent
                    className={this.props.classes.error}
                    message={(
                        <div className={this.props.classes.container} >
                            <ErrorIcon className='icon' />
                            <span className={this.props.classes.errorText}>
                                {this.props.error.text}
                            </span>
                        </div>
                    )}
                />
            </Snackbar>
        </Fragment>
    )

}

export default withStyles(styles)(Overlay)