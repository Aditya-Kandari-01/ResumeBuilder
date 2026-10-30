const express = require("express")
const authMiddleware = require("../middlewares/authMiddleware")
const interviewController = require("../controllers/intervierwController")
const upload = require("../middlewares/fileMiddleware")


const interviewRouter = express.Router()


/**
 * @route POST /api/interview/
 * @description generate interview report for the user
 * @access private
 */

interviewRouter.post("/",authMiddleware.authUser,upload.single("resumeFile"),interviewController.generateReportController)

/**
 * @route GET /api/interview/:interviewId
 * @description generate report by interviewId
 * @access private
 */

interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.getReportByIdController)

/**
 * @route GET /api/interview/
 * @description get all generated report of the user
 * @access private
 */
interviewRouter.get("/",authMiddleware.authUser,interviewController.getAllReportsController)

/**
 * @route POST /api/interview/resume/pdf
 * @description generates report by using user details
 * @access private
 */

interviewRouter.post("/resume/pdf/:interviewReportId",authMiddleware.authUser,interviewController.generateResumePdfController)

module.exports = interviewRouter