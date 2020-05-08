const fs = require('fs')
const { getAnswer, getQuestions } = require('./actions')

const QUESTIONS = `./botAPI/questions.json`
const ANSWERS = `./botAPI/answers.json`

module.exports.readFile = (action) => {
    return new Promise((resolve, reject) => {
        switch (action) {
            case getQuestions:
                fs.readFile(QUESTIONS, 'utf8', (err, data) => {
                    if (err) {
                        reject(`Error reading file: ${err}`)
                    } else {
                        resolve(JSON.parse(data))
                    }
                })
                break
            case getAnswer:
                fs.readFile(ANSWERS, 'utf8', (err, data) => {
                    if (err) {
                        reject(`Error reading file: ${err}`)
                    } else {
                        
                        resolve(JSON.parse(data))
                    }
                })
                break
            default:
                break
        }
        
    })
}