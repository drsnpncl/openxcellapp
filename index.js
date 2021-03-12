const express = require('express')
const cors = require('cors')
const HOST = '127.0.0.1'
const PORT = 8080
const logger = require('morgan')
const db = require('./db-handler');
var user = require('./routes/user')

var app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(logger('dev'))

app.use('/user', user)

var http = require('http').createServer(app)

http.listen(PORT, HOST, function() {
    console.log('SERVER STARTED on http://' + HOST + '/' + PORT)
    db.connect()
})