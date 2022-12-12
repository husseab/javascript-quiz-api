const { createItem } = require('../controllers/helpers')

const createAnswer = (req, res) => createItem(res, 'answer', req.body)


module.exports = {
  createAnswer,
}