import gpio from 'rpi-gpio'

const pins = gpio.promise

let state = false

const main = async () => {
    await pins.setup(3, gpio.DIR_OUT)
    blink().catch(e => {
        console.log('Error: ', e.toString())
    })
}

const sleep = async ms => (
    new Promise(resolve => setTimeout(resolve, ms))
)

const blink = async () => {
    await pins.write(3, state)
    state != state
    await sleep(500)
    blink()
}

main().catch(e => {
    console.log('Error: ', e.toString())
})