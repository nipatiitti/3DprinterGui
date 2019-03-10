import socketInitializer from 'socket.io'

import * as SETTINGS from '../config/printerConfig'

import fs from 'fs'

//import { xMotor } from '../device/motors'

let io = null

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const createSocket = server => {
    io = socketInitializer(server)
    
    console.log('Socket ready for action')
    io.on('connect', connection)
}

export const startPrint = async () => {
    updateAll()
    const lines = JSON.parse(fs.readFileSync('./config/file.json'))
    const length = lines.length
    for( let i = 0; i < length; i++) {
        await sleep(300)
        const settings = SETTINGS.get()
        const newSettings = parseLine(lines[i])
        SETTINGS.set({
            CC: newSettings.CC,
            X: newSettings['X'] || settings['X'],
            Y: newSettings['Y'] || settings['Y'],
            Z: newSettings['Z'] || settings['Z'],
            F: newSettings['F'] || settings['F'],
            E: newSettings['E'] || settings['E'],
            progress: Math.round((i/length)*1000000)/10000
        })
        updateAll()
    }
}

export const updateAll = () => {
    if(io) {
        io.emit('status', SETTINGS.get())
    } else {
        throw new error('Initialize socket before updating')
    }
}

const connection = socket => {
    socket.emit('status', SETTINGS.get())
    console.log('user connected')

    socket.on('test', (...props) => {
        console.log(props)
    })
}

const parseLine = line => {
    const cleanLine = line.split('G1')[1].split(/\s/g)
    let settings = {
        CC: line,
        X: 0,
        Y: 0,
        Z: 0,
        F: 0,
        E: 0
    }
    cleanLine.forEach(part => {
        const axis = part.substring(0, 1)
        settings[axis] = parseFloat(part.substring(1), 10)
    })
    return settings
}

// const move = async steps => {
//     console.log('Moving to ' + steps)
//     const response = await xMotor.to(steps)
// }