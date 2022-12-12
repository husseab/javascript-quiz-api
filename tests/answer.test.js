const { expect } = require('chai')
const request = require('supertest')
const { Answer } = require('../src/models')
const app = require('../src/app')

describe('/answers', () => {
  before(async () => Answer.sequelize.sync())

  beforeEach(async () => {
    await Answer.destroy({ where: {} })
  })

  describe('with no records in the database', () => {
    describe('POST /answers', () => {
      it('creates a new answer in the database', async () => {
        const response = await request(app).post('/answers').send({
          answer: 'Correct Answer'
        })
        const newAnswerRecord = await Answer.findByPk(response.body.id, {
          raw: true
        })

        expect(response.status).to.equal(201)
        expect(response.body.answer).to.equal('Correct Answer')
        expect(newAnswerRecord.answer).to.equal('Correct Answer')
      })
      xit('does not create a new answer in the database--no text', async () => {
        const response = await request(app).post('/answers').send({
          answer: ""
        })
        const newAnswerRecord = await Answer.findByPk(response.body.id, {
          raw: true
        })

        expect(response.status).to.equal(404)
        expect(newAnswerRecord).to.equal(null)
        expect(response.body.errors.toString()).to.equal('Answer cannot be empty')
      })
      xit('does not create a new answer in the database--NULL', async () => {
        const response = await request(app).post('/answers').send({
          answer: null
        })
        const newAnswerRecord = await Answer.findByPk(response.body.id, {
          raw: true
        })

        expect(response.status).to.equal(404)
        expect(newAnswerRecord).to.equal(null)
        expect(response.body.errors.toString()).to.equal('Answer cannot be null')
      })
    })
  })
})