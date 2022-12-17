const { Answer, Question } = require('../models')

const get404Error = (model) => ({ error: `The ${model} could not be found.` })

const getModel = (model) => {
  const models = {
    answer: Answer,
    question: Question,
  }

  return models[model]
}


const getAllItems = (res, model) => {
  const Model = getModel(model)
  if (Model === Question) {
    return Model.findAll({ include: Answer  }).then((items) => {
      res.status(200).json(items)
    })
  } else {
    return Model.findAll({ include: Question }).then((items) => {
      res.status(200).json(items)
    })
  }
}

const createItem = (res, model, item) => {
  const Model = getModel(model)
  return Model.create(item)
    .then((newItemCreated) => {
      res.status(201).json(newItemCreated)
    })
    .catch((error) => {
      const errorMessages = error.errors.map((e) => e.message)

      return res.status(404).json({ errors: errorMessages })
    })
}

const updateItem = (res, model, item, id) => {
  const Model = getModel(model)

  return Model.update(item, { where: { id } }).then(([recordsUpdated]) => {
    if (!recordsUpdated) {
      res.status(404).json(get404Error(model))
    } else {
      getModel(model)
        .findByPk(id)
        .then((updatedItem) => {
          res.status(200).json(updatedItem)
        })
    }
  })
}

const getItemById = (res, model, id) => {
  const Model = getModel(model)
  if (Model === Question) {
    return Model.findByPk(id, { include: Answer }).then((item) => {
      if (!item) {
        res.status(404).json(get404Error(model))
      } else {
        res.status(200).json(item)
      }
    })
  } else {
    return Model.findByPk(id, { include: Question }).then((item) => {
      if (!item) {
        res.status(404).json(get404Error(model))
      } else {
        res.status(200).json(item)
      }
    })
  }
}

const deleteItem = (res, model, id) => {
  const Model = getModel(model)

  return Model.findByPk(id).then((foundItem) => {
    if (!foundItem) {
      res.status(404).json(get404Error(model))
    } else {
      Model.destroy({ where: { id } }).then(() => {
        res.status(204).send()
      })
    }
  })
}

module.exports = {
  getAllItems,
  createItem,
  updateItem,
  getItemById,
  deleteItem
}