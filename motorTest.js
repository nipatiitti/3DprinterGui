import gpio from 'rpi-gpio'
import { MotorDriver } from './gpio-helpers'

const pins = gpio.promise

const motorDriver = new MotorDriver(35, 36, 37, 38)

let state = true

const main = async () => {
    await motorDriver.initalize()
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
        motor()
        state = !state
        await sleep(3000)
        blink()    
    } catch(e) {
        console.log(e)
    }
}

const motor = () => {
    motorDriver.step(state ? 200 : -200)
}

main().catch(e => {
    console.log('Error: ', e.toString())
})