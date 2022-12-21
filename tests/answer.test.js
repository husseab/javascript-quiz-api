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
          answer: 'Correct Answer',
          result: 'correct'
        })
        const newAnswerRecord = await Answer.findByPk(response.body.id, {
          raw: true
        })

        expect(response.status).to.equal(201)
        expect(response.body.answer).to.equal('Correct Answer')
        expect(newAnswerRecord.answer).to.equal('Correct Answer')
      })
      it('does not create a new answer in the database--no text', async () => {
        const response = await request(app).post('/answers').send({
          answer: "",
          result: 'correct'
        })
        const newAnswerRecord = await Answer.findByPk(response.body.id, {
          raw: true
        })

        expect(response.status).to.equal(404)
        expect(newAnswerRecord).to.equal(null)
        expect(response.body.errors.toString()).to.equal('Answer cannot be empty')
      })
      it('does not create a new answer in the database--NULL', async () => {
        const response = await request(app).post('/answers').send({
          answer: null,
          result: 'correct'
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
  describe('with records in the database', () => {
    let answers

    beforeEach(async () => {
      answers = await Promise.all([
        Answer.create({
          answer: 'Correct Answer1',
          result: 'correct1'
        }),
        Answer.create({
          answer: 'Correct Answer2',
          result: 'correct2'
        }),
        Answer.create({
          answer: 'Correct Answer3',
          result: 'correct3'
        })
      ])
    })

    describe('GET /answers', () => {
      it('gets all answer records', async () => {
        const response = await request(app).get('/answers')
  
        expect(response.status).to.equal(200)
        expect(response.body.length).to.equal(3)
  
        response.body.forEach((answerItem) => {
          const expected = answers.find((a) => a.id === answerItem.id)
  
          expect(answerItem.answer).to.equal(expected.answer)
        })
      })
    })

    describe('GET /answers/:id', () => {
      it('gets answer record by id', async () => {
        const answerItem = answers[0]
        const response = await request(app).get(`/answers/${answerItem.id}`)
        expect(response.status).to.equal(200)
        expect(response.body.answer).to.equal(answerItem.answer)
      })

      it('returns a 404 if the answer does not exist', async () => {
        const response = await request(app).get('/answers/12345')

        expect(response.status).to.equal(404)
        expect(response.body.error).to.equal('The answer could not be found.')
      })
    })

    describe('PATCH /answers/:id', () => {
      it('updates answers by id', async () => {
        const answerItem = answers[0]
        const response = await request(app)
          .patch(`/answers/${answerItem.id}`)
          .send({ answer: 'updatedAnswer' })
        const updatedAnswerRecord = await Answer.findByPk(answerItem.id, {
          raw: true
        })

        expect(response.status).to.equal(200)
        expect(updatedAnswerRecord.answer).to.equal('updatedAnswer')
      })

      it('returns a 404 if the answer does not exist', async () => {
        const response = await request(app)
          .patch('/answers/12345')
          .send({ answer: 'updatedAnswer' })

        expect(response.status).to.equal(404)
        expect(response.body.error).to.equal('The answer could not be found.')
      })
    })

    describe('DELETE /answers/:id', () => {
      it('deletes answer record by id', async () => {
        const answerItem = answers[0]
        const response = await request(app).delete(`/answers/${answerItem.id}`)
        const deletedAnswer = await Answer.findByPk(answerItem.id, { raw: true })
        expect(response.status).to.equal(204)
        expect(deletedAnswer).to.equal(null)
      })

      it('returns a 404 if the answer does not exist', async () => {
        const response = await request(app).delete('/answers/nonExistentAnswer')
        expect(response.status).to.equal(404)
        expect(response.body.error).to.equal('The answer could not be found.')
      })
    })
  })
})
