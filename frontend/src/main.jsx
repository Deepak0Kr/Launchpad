import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/login/Login.jsx'
import SignUp from './pages/signup/SignUp.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OtpVerification from './pages/OtpVerification/OtpVerification.jsx'
import CreateProject from './pages/createProject/CreateProject.jsx'
import ProjectBuild from './pages/projectBuild/ProjectBuild.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/otp-verification" element={<OtpVerification />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/project-build" element={<ProjectBuild />} />
      </Routes>
    </Router>
  </StrictMode>
)
