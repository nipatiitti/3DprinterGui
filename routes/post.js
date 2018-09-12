import { itemModel } from '../database/models'

function handlePost(req, res) {

  if(validatePostItem(req.body)) {

    // Create instance of the data
    const data = new itemModel(Object.assign(req.body, {
      createdAt: Date.now(),
    }))

    // Save data
    data.save(err => {
      if(err) {
        res.status(500).send({ msg: 'Error saving data!: ' + err})
        return
      }
      res.json(req.body)
    })
  } else {
    res.status(500).send({ msg: 'Not item object' });
  }

}

export default handlePost
