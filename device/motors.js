import { MotorDriver } from '../gpio-helpers'

const xMotor = new MotorDriver()

xMotor.initalize()

export {
    xMotor
}