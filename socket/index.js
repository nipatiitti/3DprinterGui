import socketInitializer from 'socket.io'

import { xMotor } from '../device/motors'

export const createSocket = server => {
    const io = socketInitializer(server)
    console.log('Socket ready for action')

    io.on('connect', connection)
}


const connection = socket => {
    socket.emit('message', 'Helloworld')
    console.log('user connected')

    socket.on('move', move)
}

const move = async steps => {
    const response = await xMotor.to(steps)
}