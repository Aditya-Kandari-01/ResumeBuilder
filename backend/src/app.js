const express = require('express')
const cookieParser = require('cookie-parser')


// instance created of an app
const app = express()

// middleware to parse JSON request body
app.use(express.json())
app.use(cookieParser())
// Require all the routes here
const auth = require("../routes/auth")

// Using all the routes here
app.use("/api/auth",auth)


module.exports = app