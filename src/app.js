const express = require('express')
const bodyParser = require('body-parser')
const consign = require('consign')
const models = require('./models')
const auth = require('./auth')

models.sequelize.sync().done()

const app = express()

app.use(bodyParser.json())
app.use(auth.config().initialize())

consign({ cwd: 'src'})
    .include('livros')
    .include('usuarios')
    .include('auth')
    .into(app)

module.exports = app