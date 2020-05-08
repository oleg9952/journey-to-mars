const express = require('express')
const router = express.Router()
const { getQuestions, getAnswer } = require('../utils/actions')
const { readFile } = require('../utils/readFile')

// get questions
router.get('/questions', async (req, res, next) => {
    try {
        const questions = await readFile(getQuestions)
        res.send(questions)
    } catch (error) {
        next(error)
    }
})

// get questions
router.get('/answer/:id', async (req, res, next) => {
    try {
        const answers = await readFile(getAnswer)
        const result = answers.find(answer => answer.id === parseInt(req.params.id))
        res.send(result)
    } catch (error) {
        next(error)
    }
})

module.exports = router