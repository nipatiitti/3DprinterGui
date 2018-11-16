import gpio from 'rpi-gpio'

const pins = gpio.promise

export const MODES = {
    '1/1': {
        pins: [false, false, false],
        speed: 1
    },
    '1/2': {
        pins: [true, false, false],
        speed: 2
    },
    '1/4': {
        pins: [false, true, false],
        speed: 4
    },
    '1/8': {
        pins: [true, true, false],
        speed: 8
    },
    '1/16': {
        pins: [false, false, true],
        speed: 16
    },
    '1/32': {
        pins: [true, false, true],
        speed: 32
    }
}

const sleep = async ms => (
    new Promise(resolve => setTimeout(resolve, ms))
)

class MotorDriver {
    constructor(dirPin, stepPin, modePins, SPR, mode) {
        this.dirPin = dirPin || 38
        this.stepPin = stepPin || 40
        this.sleep = 100
        this.modePins = modePins || [8, 10, 12]
        this.SPR = SPR || 200
        this.mode = mode || MODES['1/16']
        this.stop = false
    }

    async initalize() {
        await pins.setup(this.dirPin, gpio.DIR_OUT)
        await pins.write(this.dirPin, true)

        await pins.setup(this.stepPin, gpio.DIR_OUT)
        this.modePins.forEach(async pin => await pins.setup(pin, gpio.DIR_OUT))

        await pins.write(this.modePins[0], this.mode.pins[0])
        await pins.write(this.modePins[1], this.mode.pins[1])
        await pins.write(this.modePins[2], this.mode.pins[2])
        
        console.log(`Pins ${this.dirPin}, ${this.stepPin}, ${this.direction}, ${JSON.stringify(this.modePins, null, 2)}, setupped and ready to roll`)
    }

    step () {
        return new Promise(async (resolve, reject) => {
            try {
                await pins.write(this.stepPin, true)
                await sleep(this.sleep/this.mode.speed)
                await pins.write(this.stepPin, false)
                await sleep(this.sleep/this.mode.speed)
                resolve({value: 200})
            } catch (e) {
                reject({value: 500, message: e.toString()})
            }
        })
    }

    revolutions (n) {
        return new Promise(async (resolve, reject) => {
            try {
                await pins.write(this.dirPin, n > 0)

                const steps = Math.abs(n) * this.SPR * this.mode.speed
        
                for(let i = 0; i <= steps; i++) {
                    if(this.stop) {
                        this.stop = false
                        reject({value: 500, message: 'Stopped by user'})
                    }

                    await this.step()
                }

                resolve({value: 200})
            } catch (e) {
                reject({value: 500, message: e.toString()})
            }
        })
    }

    stop(bool) {
        this.stop = bool || true
    }

    direction (direction) {
        if(direction) {
            this.direction = direction
        } else {
            return this.direction
        }
    }

    mode (mode) {
        if(mode && MODES.hasOwnProperty(mode)) {
            this.mode = mode
        } else {
            return mode
        }
    }
}

export default MotorDriver