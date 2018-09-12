import React, {Component} from 'react'
import PropTypes from 'prop-types' 

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  button: {
    margin: '2em',
    color: '#375526',
    borderColor: '#375526'
  }
})

class CustomButton extends Component {
    constructor(props) {
        super(props)
        
    }


    render() {
        return (
            <Button
                onClick={this.props.onClick ? this.props.onClick : () => {}}
                className={this.props.classes.button}
                variant='outlined'    
            >
                {this.props.children}
            </Button>
        )
    }
}

export default withStyles(styles)(CustomButton)