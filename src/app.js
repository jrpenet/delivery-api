const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
require('./db/mongoose')
const hbs = require('hbs')
const userRouter = require('./routers/user')
const productRouter = require('./routers/product')

const app = express()
//define paths for express
const publicDirPublic = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirPublic))
app.use(express.json())
app.use(userRouter)
app.use(productRouter)

module.exports = app