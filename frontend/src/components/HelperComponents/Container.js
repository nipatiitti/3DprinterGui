import React from 'react'

import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
    paper: {
        padding: '1em',
        margin: '0.5em 0.5em 10em 0.5em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }
})

const Container = ({classes, children, wide = false}) => (
    <div className='paperContainer' >
        <div className={wide ? 'wide' : 'shallow'} >
            <Paper className={classes.paper} elevation={10} >
                {children}
            </Paper>
        </div>
    </div>
)


export default withStyles(styles)(Container)