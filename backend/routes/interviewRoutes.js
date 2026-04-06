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

interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.generateReportController)

/**
 * @route GET /api/interview/:interviewId
 * @description generate report by interviewId
 * @access private
 */

interviewRouter.get("/report/:interviewId",authMiddleware.authUser,upload.single("resume"),interviewController.getReportByIdController)

/**
 * @route GET /api/interview/
 * @description get all generated report of the user
 * @access private
 */
interviewRouter.get("/",authMiddleware.authUser,upload.single("resume"),interviewController.getAllReportsController)


module.exports = interviewRouter