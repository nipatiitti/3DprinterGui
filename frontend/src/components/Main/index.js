import React, {Component} from 'react'

import { Container, Button, Input } from '../HelperComponents'

class Login extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount = () => {
        this.props.socket.on('message', msg => {
            console.log(msg)
        })
    }

    render() {
        return (
            <Container wide >

            </Container>
        )
    }
}

export default Login