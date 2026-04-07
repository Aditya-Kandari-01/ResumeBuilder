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

## Current Focus

- Connecting frontend UI with backend APIs
- Handling file uploads properly
- Managing navigation after report generation
- Improving state handling with context and hooks

---
