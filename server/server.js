const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const mongoose = require('mongoose')
const path = require('path')
const port = process.env.PORT || 4500
const DB_PASS = process.env.DB_PASS || 'marsDb2599'


// connect to MongoDB
mongoose.connect(
    `mongodb+srv://mars-admin:${DB_PASS}@cluster0-2u9kc.mongodb.net/test?retryWrites=true&w=majority`, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`MongoDB - connected`)
});

// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    
    next()
})

// set view engine
app.set('view engine', 'pug')
app.set('views', './views')

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, '../client/dist')))

// botAPI requests
app.use('/bot', require('./routes/botAPI'))

// handle errors
app.use((err, req, res, next) => {
    console.log(err)
    res.render('error', {title: 'Oops...', error: err})
})

// chat sockets
module.exports.io = io
const { chat } = require('./supportChat/supportSocket')
io.on('connection', chat)

server.listen(port, () => console.log(`Server running on port: ${port}`))