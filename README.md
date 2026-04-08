# Resume Builder with AI-Powered Interview Reports

## Overview

This project is a full-stack application that helps users generate **AI-powered interview reports** and **customized resumes** based on their profile, self-description, and job description.

The system allows users to:

* Generate interview reports
* View previously generated reports
* Generate ATS-friendly resumes in PDF format

---

## Frontend Updates

### 1. Recent Reports Feature

A new section was added to `Home.jsx` to display all previously generated interview reports.

### Purpose

* Show user's history
* Improve UX by enabling quick access to past reports

### Implementation

```jsx
{/*Recent reports list*/}
{reports.length > 0 && (
  <section className="recent-reports">
    <h2>My Recent Interview Plans</h2>
    <ul className="reports-list">
      {reports.map((report) => (
        <li
          key={report._id}
          className="report-item"
          onClick={() => navigate(`/interview/${report._id}`)}
        >
          <h3>{report.title || "Untitled Position"}</h3>
          <p className="report-meta">
            Generated on {new Date(report.createdAt).toLocaleDateString()}
          </p>
          <p
            className={`match-score ${
              report.matchScore >= 80
                ? "score--high"
                : report.matchScore >= 60
                ? "score--mid"
                : "score--low"
            }`}
          >
            Match Score: {report.matchScore}%
          </p>
        </li>
      ))}
    </ul>
  </section>
)}
```

### Key Features

* Displays all reports created by the user
* Shows:

  * Title
  * Date
  * Match score
* Dynamic styling based on score:

  * High (≥80)
  * Medium (60–79)
  * Low (<60)
* Click navigation to detailed report page

---

## Backend Updates

### 1. Generate Resume PDF Controller

A new controller is added to generate a resume PDF from stored interview data.

### Controller Logic

```js
const generateResumePdfController = async (req, res) => {
  const { interviewReportId } = req.params;

  const interviewReport = await interviewReportModel.findById(interviewReportId);

  if (!interviewReport) {
    return res.status(401).json({
      message: "Interview report not found",
    });
  }

  const { resume, jobDescription, selfDescription } = interviewReport;

  const pdfBuffer = await generateResumePdf({
    resume,
    jobDescription,
    selfDescription,
  });

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
  });

  res.send(pdfBuffer);
};
```

### Responsibilities

* Fetch report from database
* Extract required fields
* Generate PDF
* Send downloadable response

>>>>>>> a077cc5 (feat: recent reports UI + AI resume PDF generation)
---

### 2. API Route

```js
/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 * @description Generate resume PDF from interview report
 * @access Private
 */
interviewRouter.post(
  "/resume/pdf/:interviewReportId",
  authMiddleware.authUser,
  interviewController.generateReportController
);
```

---

## AI Resume Generation

### Function: `generateResumePdf`

This function uses an AI model to generate resume content in HTML format.

### Workflow

1. Prepare structured schema using Zod
2. Create detailed prompt
3. Call AI model
4. Parse JSON response
5. Convert HTML to PDF

```js
async function generateResumePdf({ resume, selfDescription, jobDescription }) {
  const resumePdfSchema = z.object({
    html: z.string(),
  });

  const prompt = `Generate resume for a candidate with the following details:
  Resume: ${resume}
  Self Description: ${selfDescription}
  Job Description: ${jobDescription}

  Output must be JSON with "html" field containing formatted resume HTML.
  The resume should be:
  - ATS friendly
  - Professional
  - Tailored to job description
  - 1–2 pages long
  - Human-like writing (not AI sounding)
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: zodToJsonSchema(resumePdfSchema),
    },
  });

  const jsonContent = JSON.parse(response.text);

  const pdfBuffer = await generatePdfFromHtmlContent(jsonContent.html);

  return pdfBuffer;
}
```

---

## PDF Generation with Puppeteer

### Function: `generatePdfFromHtmlContent`

Converts AI-generated HTML into a downloadable PDF.

```js
async function generatePdfFromHtmlContent(htmlContent) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: "networkidle2" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm",
    },
  });

  await browser.close();

  return pdfBuffer;
}
```

### Features

* Uses headless browser
* Converts styled HTML → PDF
* A4 optimized layout
* Clean margins for readability

---

## End-to-End Flow

1. User submits data → Interview report generated
2. Reports stored in database
3. Home page shows report history
4. User clicks report → views details
5. User requests resume PDF
6. Backend:
   * Fetches report
   * Generates AI resume (HTML)
   * Converts to PDF
7. PDF is returned for download

---

## Tech Stack

### Frontend

* React
* React Router
* SCSS

### Backend

* Node.js
* Express.js
* MongoDB

### AI + Processing

* Gemini AI (for resume generation)
* Zod (schema validation)
* Puppeteer (HTML → PDF)

---

## Key Improvements Added

* Persistent report history UI
* PDF export functionality
* Structured backend pipeline

---

## Future Enhancements

* Download button in UI
* Frontend-Backend Integration for generated pdf to download it
