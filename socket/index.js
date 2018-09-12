import socketInitializer from 'socket.io'

export const createSocket = server => {
    const io = socketInitializer(server)
    console.log('Socket ready for action')

    io.on('connect', connection)
}


const connection = socket => {
    socket.emit('message', 'Helloworld')
    console.log('user connected')
}