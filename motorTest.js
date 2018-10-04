import gpio from 'rpi-gpio'

const pins = gpio.promise

const main = async () => {
    await pins.setup(2, gpio.DIR_OUT)
    pins.write(2, true)
}


main()
.catch((err) => {
    console.log('Error: ', err.toString())
})