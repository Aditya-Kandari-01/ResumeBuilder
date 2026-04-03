require("dotenv").config()
const app = require('./src/app')
const PORT = process.env.PORT || 3000
const connectToDb = require('./config/db')
const {resume,selfDescription,jobDescription} = require("./services/temp")
const generateInterviewReport = require("./services/aiService")

generateInterviewReport({resume,selfDescription,jobDescription})
connectToDb()

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`)
})