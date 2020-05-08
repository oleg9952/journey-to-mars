const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 4500

// Enable CORS for requests from client
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

app.listen(port, () => console.log(`Server running on port: ${port}`))