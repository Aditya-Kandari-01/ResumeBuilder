const pdfParse = require("pdf-parse");
const {generateInterviewReport,generateResumePdf} = require("../services/aiService");
const interviewReportModel = require("../models/interviewReportModel");


/**
 * 
 * @description generate report based on user's selfDescription,resume and jobDescription
 */
const generateReportController = async (req, res) => {
  const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
  const { selfDescription, jobDescription } = req.body;
  const interviewReportByAi = await generateInterviewReport({
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
  });
  const interviewReport = await interviewReportModel.create({
    user: req.user.id,
    resume: resumeContent.text,
    selfDescription,
    jobDescription,
    ...interviewReportByAi,
  });
  res.status(201).json({
    message: "Interview report generated successfully",
    interviewReport
  });
};

/**
 * 
 * @description get the report by interviewId
 */

const getReportByIdController = async(req,res) =>{
  const {interviewId} = req.params
  const report = await interviewReportModel.findOne({
  _id : interviewId,
  user:req.user.id
  })

  if (!report){
    return res.status(404).json({
      message:"Interview report not found"
    })
  }
  res.status(200).json({
      message:"Interview report fetched successfully",
      report
    })
}

/**
 * 
 * @description get all report of logged in user
 */

const getAllReportsController = async(req,res) =>{
  const reports = await interviewReportModel.find({
    user:req.user.id
  }).sort({
    createdAt:-1
  }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

  res.status(201).json({
    message:"Interview reports fetched successfully",
    reports
  })

}


/**
 * @description generate resume pdf base on user details
 * 
 */

const generateResumePdfController = async(req,res)  =>{
  const {interviewReportId} = req.params;
  const interviewReport = await interviewReportModel.findById(interviewReportId)

  if (!interviewReport){
    return res.status(401).json({
      message:"Interview report not found"
    })
  }
  const {resume,jobDescription,selfDescription} = interviewReport
  const pdfBuffer = await generateResumePdf({
    resume,jobDescription,selfDescription
  })
  res.set({
    "Content-Type":"application/pdf",
    "Content-Disposition":`attachement; filename=resume_${interviewReportId}.pdf`
  })
  res.send(pdfBuffer)
}

module.exports = { generateReportController,getReportByIdController,getAllReportsController,generateResumePdfController };
