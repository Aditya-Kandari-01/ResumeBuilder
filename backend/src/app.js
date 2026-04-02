const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require("cors")

// instance created of an app
const app = express()

// middleware to parse JSON request body
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
// Require all the routes here
const auth = require("../routes/auth")

// Using all the routes here
app.use("/api/auth",auth)


module.exports = app