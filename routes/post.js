import { saveFile, set } from '../config/printerConfig'
import { startPrint } from '../socket'

function handlePost(req, res) {
  if(req.body.lines && req.body.lines.length >= 1) {
    saveFile(req.body.lines)
      .then(() => {
        set({status: 'ready'})
        startPrint()
        res.json({msg: 'File saved successfully'})
      })
      .catch(e => {
        console.log(e)
        res.status(500).send({msg: e})
      })
  }
}

export default handlePost
