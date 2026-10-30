# ResumeBuilder

A full-stack Resume Builder application with user authentication.  
This project includes a backend built with Node.js/Express and a frontend built with React.

### 🌐 Frontend
- Login & Register UI
- Auth API integration
- Context API setup for global state
- Basic styling with SCSS

---

## 🛠️ Tech Stack

### Frontend
- React
- React Router
- Context API
- SCSS

---

## 📁 Project Structure

```bash
ResumeBuilder/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── userModel.js
│   │   └── blackListModel.js
│   ├── routes/
│   │   └── auth.js
│   ├── src/
│   │   └── app.js
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── features/
│   │   │   ├── ai/
│   │   │   └── authentication/
│   │   │       ├── components/
│   │   │       ├── pages/
│   │   │       │   ├── Login.jsx
│   │   │       │   └── Register.jsx
│   │   │       ├── services/
│   │   │       │   └── authApi.js
│   │   │       └── AuthContext.jsx
│   │   ├── styles/
│   │   │   └── button.scss
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── routes.jsx
│   │   └── button.scss
│   └── index.html
│
└── README.md

# 4 layers architecture

# UI 
- Component
- Pages

# HOOKS
- For managing states and api layers
- Hooks

# STATE
- AuthContext.jsx
- AiContext.jsx

# API
- Communication between frontend and bcakend
- Services
- authApi.jsx

