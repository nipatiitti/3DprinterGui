import gpio from 'rpi-gpio'

const pins = gpio.promise

class MotorDriver {
    constructor(pin1, pin2, pin3, pin4, steps) {
        this.steps = steps || 200
        this.stepNumber = 0
        this.lastStep = 0
        this.stepDelay = 60

        this.pin1 = pin1
        this.pin2 = pin2
        this.pin3 = pin3
        this.pin4 = pin4

        await pins.setup(pin1, gpio.DIR_OUT)
        await pins.setup(pin2, gpio.DIR_OUT)
        await pins.setup(pin3, gpio.DIR_OUT)
        await pins.setup(pin4, gpio.DIR_OUT)
    }

    setSpeed = speed => {
        this.stepDelay = 60 * 1000 * 1000 / this.steps / speed
    }

    step = (stepsToMove) => {
        const stepsLeft = Math.abs(stepsToMove)
        const direction = 0

        if (stepsToMove > 0) direction = 1
        if (stepsToMove < 0) direction = 0

        while (stepsLeft > 0) {
            const now = new Date().now()
            
            if (now - this.lastStep >= this.stepDelay) {
                this.lastStep = now
                if (direction == 1) {
                    this.stepNumber++
                    if (this.stepNumber == this.steps) {
                        this.stepNumber = 0
                    }
                } else {
                    if (this.stepNumber == 0) {
                        this.stepNumber = this.steps
                    }
                    this.stepNumber--
                }
                stepsLeft--
                this.stepMotor(this.stepNumber % 4)
            }
        }
    }

    stepMotor = async thisStep => {
        switch (thisStep) {
            case 0:  // 1010
                await pins.write(this.pin1, true)
                await pins.write(this.pin2, false)
                await pins.write(this.pin3, true)
                await pins.write(this.pin4, false)
            break;
            case 1:  // 0110
                await pins.write(this.pin1, false)
                await pins.write(this.pin2, true)
                await pins.write(this.pin3, true)
                await pins.write(this.pin4, false)
            break;
            case 2:  //0101
                await pins.write(this.pin1, false)
                await pins.write(this.pin2, true)
                await pins.write(this.pin3, false)
                await pins.write(this.pin4, true)
            break;
            case 3:  //1001
                await pins.write(this.pin1, true)
                await pins.write(this.pin2, false)
                await pins.write(this.pin3, false)
                await pins.write(this.pin4, true)
            break;
        }
    }
}

export default MotorDriver