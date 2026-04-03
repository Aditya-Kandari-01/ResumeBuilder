# 🔐 Authentication + Protected Routes + AI Interview System (MERN)

## 📌 Overview

This project includes:

* Full **Authentication System (JWT + Cookies)**
* **Protected Routes (Frontend + Backend)**
* **Global Loading State**
* **Centralized Axios API Instance**
* Structured **AI Interview Analysis System**

---

## ⚙️ Tech Stack

* React (Context API)
* Node.js + Express
* MongoDB + Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* Axios
* Gemini API (@google/genai)
* Zod (Schema Validation)

---

## 🚀 Features

### 🔐 Authentication

* User Registration & Login
* JWT stored in **HTTP-only cookies**
* Persistent login using `/get-me`
* Logout with token invalidation

---

### 🛡️ Protected Routes

#### Frontend (`Protected.jsx`)

```js
if (!user) {
  return <Navigate to="/login" />;
}
return children;
```

---

#### Backend Middleware

* Verifies JWT from cookies
* Returns **401 Unauthorized** if invalid/missing

---

### ⏳ Loading State

* Global loading handled via Context

```js
setLoading(true);
// API call
setLoading(false);
```

---

### 🌐 Axios API Instance

```js
const api = axios.create({
  baseURL: "http://localhost:10000",
  withCredentials: true
});
```

---

## 🧠 AI Interview Analysis System

### 📊 Data Structure

```js
{
  jobDescription: String,
  resume: String,
  selfDescription: String,
  matchScore: Number,
  technicalQuestions: [{ question, answer, intention }],
  behavioralQuestions: [{ question, answer, intention }],
  skillGaps: [{ skill, severity }],
  preparationPlan: [{ day, focus, tasks }],
  title: String
}
```

---
## AI Response Schema Issue & Fix (Important)
❌ Problem

While integrating the AI interview analysis using @google/genai, the API response did not match the expected schema.

Instead of getting:

{
  matchScore,
  technicalQuestions,
  behavioralQuestions,
  skillGaps,
  preparationPlan
}

We were receiving unrelated fields like:

{
  interviewId,
  strengths,
  overallRecommendation,
  redFlags,
  notes
}

👉 This clearly indicated that the AI model was ignoring our schema definition.

🔍 Root Cause

The issue was caused by Zod v4 incompatibility with zod-to-json-schema.

Installed versions:

zod@4.3.6
zod-to-json-schema@3.25.2

When converting schema:

zodToJsonSchema(interviewReportSchema)

Output was:

{
  "$schema": "http://json-schema.org/draft-07/schema#"
}

⚠️ This means the schema was empty, so Gemini had no structure to follow → it generated a generic response.

## Fix Implemented

Downgraded to compatible versions:

npm install zod@3.23.8 zod-to-json-schema@3.23.5

Now schema conversion works correctly:

const { zodToJsonSchema } = require("zod-to-json-schema");

responseSchema: zodToJsonSchema(interviewReportSchema)
🧪 Verification Step

Added temporary debug:

console.log(JSON.stringify(zodToJsonSchema(interviewReportSchema), null, 2));

✔️ Confirmed schema now includes:

matchScore
technicalQuestions
behavioralQuestions
skillGaps
preparationPlan
title
🎉 Final Result

AI now returns properly structured data:

{
  matchScore: 92,
  technicalQuestions: [...],
  behavioralQuestions: [...],
  skillGaps: [...],
  preparationPlan: [...],
  title: "Senior Frontend Engineer"
}
⚠️ Note

If you see [Array] in console logs:

tasks: [Array]

👉 That’s just Node.js truncating nested output.

Use this to view full data:

console.log(JSON.stringify(response, null, 2));
💡 Key Takeaway

If your AI ignores schema → always verify schema conversion output first.