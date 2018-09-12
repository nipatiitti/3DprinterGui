import io from 'socket.io-client'
import { baseUrl } from '../actions/utils'

export const socket = io(baseUrl)
