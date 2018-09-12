export const getTop = (Model, n = 10) => {
  if(Model) {
    return Model.find().sort('-time').limit(n).exec()
  } else {
    throw "Incorrect params"
  }
}

export const getById = (Model, id) => {
  if(Model) {
    return Model.find({ _id: id }).sort('-time').limit(1).exec()
  } else {
    throw "Incorrect params"
  }
}

export const getByTag = (Model, tag, n = 10) => {
  if(Model) {
    return Model.find({ tags: tag }).sort('-time').limit(n).exec()
  } else {
    throw "Incorrect params"
  }
}
