import gpio from 'rpi-gpio'
import { MotorDriver, MODES } from './gpio-helpers'

const pins = gpio.promise

const motorDriver = new MotorDriver()

let state = true

const main = async () => {
    await motorDriver.initalize()
    console.log('Initialized motors!')
    blink().catch(e => {
        console.log('Error: ', e.toString())
    })
}

const sleep = async ms => (
    new Promise(resolve => setTimeout(resolve, ms))
)

const blink = async () => {
    try {
        console.log("They see me rolling they hatin")
        await motor()
        state = !state
        await sleep(1000)
        blink()    
    } catch(e) {
        console.log(e)
    }
}

const motor = async () => {
    await motorDriver.resolve(2)
}

main().catch(e => {
    console.log('Error: ', e.toString())
})