import io from 'socket.io-client'
import { baseUrl } from '../actions/utils'
import { store } from '../configStore'
import { setStatus } from '../actions/status'

const socket = io.connect(baseUrl)

socket.on('status', data => {
    store.dispatch(setStatus(data))
})

export {
    socket
}
