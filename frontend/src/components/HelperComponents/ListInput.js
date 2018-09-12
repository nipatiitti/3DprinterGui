import React, {Component} from 'react'

import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

import ExpandMoreIcon from 'react-icons/lib/md/expand-more'
import AddIcon from 'react-icons/lib/md/add'
import RemoveIcon from 'react-icons/lib/md/remove'

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        flex: 1
    },
    addIcon: {
        color: 'white',
        backgroundColor: '#DF8712'
    },
    removeIcon: {
        color: 'red'
    }
})

class ListInput extends Component {
    constructor(props) {
        super(props)

        this.state = {
            open: true
        }

    }

    expansionPanelChange = () => (
        this.setState(previusState => ({
            open: !previusState.open
        }))
    )

    render() {
        const { _key, classes } = this.props

        return (
            <div className="listInput" >
                <ExpansionPanel expanded={this.state.expanded} onChange={this.expansionPanelChange} >
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>{this.props.label}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.container} >
                        {
                            this.props.inputs.map(item => (
                                <div key={item.id} className="listInput-item" >
                                    <Input
                                        className={classes.input}
                                        value={item.text}
                                        onChange={e => this.props.onChange(_key, item.id)(e)}
                                        placeholder={`${this.props.label}...`}                                        
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton className="listInput-deleteButton" onClick={() => this.props.removeInput(_key, item.id)} >
                                                    <Tooltip title="Delete" >                                                    
                                                        <RemoveIcon className={classes.removeIcon + ' deleteIcon'} />
                                                    </Tooltip>
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </div>
                            ))
                        }
                    </ExpansionPanelDetails>
                    <ExpansionPanelActions>
                        <IconButton onClick={this.props.addInput(_key)} >
                            <AddIcon className={classes.addIcon} />
                        </IconButton>
                    </ExpansionPanelActions>
                </ExpansionPanel>
            </div>
        )
    }
}

export default withStyles(styles)(ListInput)