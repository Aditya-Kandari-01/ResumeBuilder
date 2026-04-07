# 🎯 ResumeBuilder(Report Generator)

# Today's Work
interview frontend integration with API, context, and hooks

## Backend

- Created `interviewController.js` with:
  - generateReportController
  - getReportByIdController
  - getAllReportsController
- Implemented PDF parsing using pdf-parse
- Used multer with memory storage (5MB limit)
- Created interview routes for:
  - generating report
  - fetching single report
  - fetching all reports
- Fixed pdfParse usage issue by correctly parsing buffer
- Added `title` field in interviewReportSchema

---

## Frontend

### API Integration
- Created `interviewApi.js`
- Implemented:
  - generateInterviewReport (multipart/form-data)
  - getInterviewReportById
  - getAllInterviewReports
- Configured Axios with baseURL and credentials

### State Management
- Created `InterviewContext.jsx`
- Managing:
  - loading
  - report
  - reports

### Custom Hook
- Created `useInterview.js`
- Handles:
  - generating report
  - fetching report by ID
  - fetching all reports

### UI (In Progress)
- Working on `Home.jsx`
- Capturing:
  - job description
  - self description
  - resume file
- Triggering report generation
- Navigating to `/interview/:id`

### App Setup
- Wrapped application with:
  - AuthProvider
  - InterviewProvider

---

## Fixed error while integrating frontend and backend to showcase the generated output
-useInterview.js:32 AxiosError: Request failed with status code 500 at settle (settle.js:20:7) at XMLHttpRequest.onloadend (xhr.js:62:9) at Axios$1.request (Axios.js:46:41) at async generateInterviewReport (interviewApi.js:21:22) at async generateReport (useInterview.js:25:24) at async handleGenerateReport (Home.jsx:15:22)
-Home.jsx:16 undefined Home.jsx:17 Uncaught (in promise) TypeError: Cannot read properties of undefined (reading '_id') at handleGenerateReport (Home.jsx:17:37)
---
