import React, { Component, Fragment } from 'react'

import { Container, Button, Input } from '../HelperComponents'

import Slider from '@material-ui/lab/Slider'


class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            value: 0
        }
    }

    componentDidMount = () => {
        this.props.socket.on('message', msg => {
            console.log(msg)
        })
    }

    handleChange = (event, value) => {
		this.setState({ value })
	}

    render() {
        return (
            <Container wide >
                <Fragment>
                    <h1 className="slds-text-title_caps slds-p-vertical_medium">
                        Move to scroll
                    </h1>
                    <Slider
                        value={this.state.value}
                        min={-400}
                        max={400}
                        step={1}
                        onChange={this.handleChange}
                    />
                </Fragment>
            </Container>
        )
    }
}

export default Login