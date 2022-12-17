const { createItem } = require('../controllers/helpers')

const createQuestion = (req, res) => createItem(res, 'question', req.body)


module.exports = {
  createQuestion,
}