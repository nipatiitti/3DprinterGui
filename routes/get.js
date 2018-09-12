import { getTop } from '../database/querys'
import { itemModel} from '../database/models'

async function handleGet(req, res) {
  try {
    let data = await getTop(itemModel, 20)
    res.json(data)
  } catch(msg) {
    console.log(msg)
    res.status(500).send(msg)
  }
}

export default handleGet
