const express = require('express')
const app = express()

// instance created of an app
// to read the url data
app.use(express.json())

module.exports = app