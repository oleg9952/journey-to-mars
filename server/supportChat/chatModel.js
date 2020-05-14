const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    userId: String,
    userName: String,
    message: String
})

const chatSchema = mongoose.Schema({
    chatId: String,
    userName: String,
    online: Boolean,
    history: [messageSchema]
})

module.exports = mongoose.model('Chat', chatSchema)