import fs from 'fs'

let tempSettings = JSON.parse(fs.readFileSync('./config/config.json'))

const get = () => tempSettings

const set = settings => tempSettings = Object.assign({}, tempSettings, settings)

const saveFile = lines => new Promise( (res, rej) => {
    try {
        fs.writeFileSync('./config/file.json', JSON.stringify(lines, null, 2))
        res()
    } catch ( e ) {
        rej( e )
    }
})

export { get, set, saveFile }