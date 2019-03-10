import React, { Component, Fragment } from 'react'

import {
    Container,
    Button,
    Status
} from '../HelperComponents'

import {
    CircularProgress
} from '@material-ui/core'


class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            loading: false
        }
    }

    handleChange = e => {
        const file = e.target.files[0]
        const reader = new FileReader()

        this.setState({
            loading: true
        })

        reader.onload = event => {
            const file = event.target.result
            const allLines = file.split(/\r\n|\n/)
            const lines = []
            allLines.forEach(line => {
                if (line.substring(0, 2) === 'G1') {
                    lines.push(line.split(';')[0])
                }
            })

            this.props.sendFile(lines)
            this.setState({
                loading: false
            })
        }

        reader.onerror = (event) => {
            alert(event.target.error.name)
        }

        reader.readAsText(file)
    }

    render() {
        return (
            <Container wide >
                <Fragment>
                    <h3 className="slds-text-title_caps slds-p-vertical_medium">
                        Status:
                    </h3>
                    <Status />
                    { this.state.loading
                        ? <CircularProgress size={30} color="primary" />
                        : <Button
                            component="label"
                            onChange={this.handleChange}
                        >
                            Upload file
                            <input
                                type="file"
                                style={{ display: "none" }}
                            />
                        </Button>
                    }
                </Fragment>
            </Container>
        )
    }
}

export default Login