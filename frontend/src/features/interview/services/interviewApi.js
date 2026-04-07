import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:10000",
    withCredentials:true
})

/**
 * 
 * @description to generate report based on user details
 */

export const generateInterviewReport = async({
    jobDescription,selfDescription,resumeFile
}) =>{
    const formData = new FormData()
    formData.append("jobDescription",jobDescription)
    formData.append("selfDescription",selfDescription)
    formData.append("resumeFile",resumeFile)
    
    const response = await api.post("/api/interview",formData,{
        headers:{
            "Content-Type" : "multipart/form-data"
        }
    })

    return response.data

}
/**
 * 
 * @description to get report by id
 */
export const getInterviewReportById = async(interviewId) =>{
    const response = await api.get(`/api/interview/report/${interviewId}`)
    return response.data
}
/**
 * 
 * @description to get all the report of the cur user
 */
export const getAllInterviewReports = async() =>{
    const response = await api.get("/api/interview/")
    return response.data
}