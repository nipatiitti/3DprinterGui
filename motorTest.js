import gpio from 'rpi-gpio'

const pins = gpio.promise

let state = false

const sleep = async ms => (
    new Promise(resolve => setTimeout(resolve, ms))
)

const blink = async () => {
    await pins.setup(3, gpio.DIR_OUT)
    await pins.write(3, state)
    state != state
    await sleep(500)
    blink()
}


blink().catch(e => {
    console.log('Error: ', e.toString())
})