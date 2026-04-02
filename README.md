# 🔐 Authentication + Protected Routes + AI Interview System (MERN)

## 📌 Overview

This project includes:

* Full **Authentication System (JWT + Cookies)**
* **Protected Routes (Frontend + Backend)**
* **Global Loading State**
* **Centralized Axios API Instance**
* Structured **AI Interview Analysis Schema**

---

## ⚙️ Tech Stack

* React (Context API)
* Node.js + Express
* MongoDB + Mongoose
* JWT (jsonwebtoken)
* bcryptjs
* Axios

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

* Restricts access to authenticated users only

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
* Used during:

  * Login
  * Register
  * Logout
  * Fetching user (`getMe`)

Example:

```js
setLoading(true);
// API call
setLoading(false);
```

---

### 🌐 Axios API Instance

Centralized Axios configuration:

```js
const api = axios.create({
  baseURL: "http://localhost:10000",
  withCredentials: true
});
```

## 🧠 AI Interview Analysis Schema

### 📊 Structure

```js
{
  jobDescription: String,
  resumeText: String,
  selfDescription: String,

  matchScore: Number,

  technicalQuestions: [
    {
      question: String,
      answer: String,
      intention: String
    }
  ],

  behavioralQuestions: [
    {
      question: String,
      answer: String,
      intention: String
    }
  ],

  skillGaps: [
    {
      skill: String,
      severity: {
        type: String,
        enum: ["low", "medium", "high"]
      }
    }
  ],

  preparationPlans: [
    {
      day: Number,
      focus: String,
      tasks: [String]
    }
  ]
}
```

---

## 🎯 Purpose

* Evaluate candidate-job fit (**matchScore**)
* Generate **technical & behavioral questions**
* Identify **skill gaps**
* Provide **structured preparation plan**

---

## ⚠️ Fixes Implemented

* Fixed **400 Bad Request**
* Fixed **401 Unauthorized (cookies not sent)**
* Enabled:

  * `withCredentials` in Axios
  * `credentials: true` in CORS
* Added `cookie-parser`
* Created reusable Axios instance (`api`)
* Added Protected Routes
* Implemented global loading state
* Fixed inconsistent API response keys

---

## 🛠️ Setup

### Backend

```bash
cd backend
npm install
npm run start
```

`.env`:

```
PORT=10000
MONGO_URI=your_uri
JWT_SECRET=your_secret
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 📈 Future Improvements (Next Phase)

### 🧠 Interview Backend

* Create **Interview Schema** with:

  * Job Description, Resume, Self Description
  * Match Score
  * Technical & Behavioral Questions
  * Skill Gaps
  * Preparation Plan
  * Link to User

---

### 🔗 Routes (`/api/interview`)

* `POST /create` → Create interview
* `GET /` → Get all user interviews
* `GET /:id` → Get single interview
* `DELETE /:id` → Delete interview

---

### ⚙️ Controllers

* Create interview & save data
* Fetch all (user-specific)
* Fetch single interview
* Delete interview

---

### 🔒 Security

* Protect routes with auth middleware
* Ensure users access only their data

---

### 🎯 Goal

Build a system where users input job + resume and get structured interview analysis.
