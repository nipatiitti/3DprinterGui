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
        this.sleep = 5
        this.modePins = modePins || [8, 10, 12]
        this.SPR = SPR || 200
        this.mode = MODES[mode] || MODES['1/4']
        this.stop = false
        this.steps = 0
    }

    async initalize() {
        await pins.setup(this.dirPin, gpio.DIR_OUT)
        await pins.write(this.dirPin, true)
        console.log("Direction pin setup'd")

        await pins.setup(this.stepPin, gpio.DIR_OUT)

        await pins.setup(this.modePins[0], gpio.DIR_OUT)
        await pins.setup(this.modePins[1], gpio.DIR_OUT)
        await pins.setup(this.modePins[2], gpio.DIR_OUT)

        await pins.write(this.modePins[0], this.mode.pins[0])
        await pins.write(this.modePins[1], this.mode.pins[1])
        await pins.write(this.modePins[2], this.mode.pins[2])
        
        console.log(`Pins ${this.dirPin}, ${this.stepPin}, ${JSON.stringify(this.modePins, null, 2)}, setupped and ready to roll`)
    }

    step (onStep = () => {}) {
        return new Promise(async (resolve, reject) => {
            try {
                await pins.write(this.stepPin, true)
                await sleep(this.sleep/this.mode.speed)
                await pins.write(this.stepPin, false)
                await sleep(this.sleep/this.mode.speed)
                onStep()
                resolve({value: 200})
            } catch (e) {
                reject({value: 500, message: e.toString()})
            }
        })
    }

    rotate (n, onStep) {
        return new Promise(async (resolve, reject) => {
            try {
                await pins.write(this.dirPin, n > 0)
                const multiplier = n > 0 ? 1 : -1
                const steps = Math.abs(n)
        
                for(let i = 0; i <= steps; i++) {
                    if(this.stop) {
                        this.stop = false
                        reject({value: 500, message: 'Stopped by user'})
                    }
    
                    await this.step(onStep)
                    this.steps += multiplier * 1
                }
    
                this.clear()
                resolve({value: 200})
            } catch (e) {
                reject({value: 500, message: e.toString()})
            }
        })
    }

    async to (step, onStep) {
        return await this.rotate(step-this.steps, onStep)
    }

    async clear () {
        console.log('Clearing')
        await pins.write(this.stepPin, false)
    }

    async revolutions (n) {
        return await this.rotate(n * this.SPR * this.mode.speed)
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