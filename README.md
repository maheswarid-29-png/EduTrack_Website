# EduTrack: AI-Powered Student Performance & Attendance Management System

## Project Overview

EduTrack is an AI-powered student performance and attendance management system developed for the MANTRA IGNITE 2026 Project Competition.

The system helps teachers and students monitor attendance, academic performance, subject-wise marks and overall academic progress through a responsive full-stack web application.

EduTrack integrates:

- Full-Stack Web Application
- MongoDB Database
- REST API Backend
- Power BI Analytics
- Generative AI Student Assistant
- n8n Automation Workflow
- Responsive Web Design

---

## Domain

**Education**

## Project Title

**EduTrack: AI-Powered Student Performance & Attendance Management System**

---

## Objectives

- Monitor student attendance efficiently
- Track academic performance and subject-wise marks
- Analyze student progress
- Provide teachers with student management features
- Provide students with their academic information
- Provide AI-based assistance for academic queries
- Provide data visualization through Power BI
- Automate academic-related workflows using n8n

---

# Main Features

## 1. Student Module

Students can:

- Login to the student portal
- View their profile
- View attendance percentage
- View present and absent records
- View subject-wise marks
- View average academic performance
- Identify their best-performing subject
- Identify subjects that need improvement
- Access the AI Student Assistant
- View Power BI analytics

---

## 2. Teacher Module

Teachers can:

- Login to the teacher portal
- View total registered students
- View average attendance
- View average academic performance
- View registered students
- Open individual student profiles
- View student attendance details
- View student performance details
- Access Power BI analytics
- Access the AI Student Assistant

---

## 3. Attendance Management

The application provides:

- Student attendance records
- Present and absent status
- Attendance percentage
- Individual attendance details
- Teacher access to student attendance information

---

## 4. Academic Performance

The application provides:

- Subject-wise marks
- Exam details
- Percentage calculation
- Average performance
- Best-performing subject
- Subject requiring improvement

---

## 5. Power BI Analytics

Power BI is used to provide detailed analytics and visualization of:

- Student attendance
- Academic performance
- Subject-wise performance
- Key performance indicators
- Student progress

The Power BI dashboard provides interactive analytics for better academic decision-making.

---

## 6. AI Student Assistant

EduTrack includes an AI-based student assistant that helps students ask questions about:

- Attendance
- Average performance
- Subject marks
- Best subject
- Subjects requiring improvement
- Course information
- Academic progress

Example queries:

- "What is my attendance?"
- "What is my average performance?"
- "Which subject is my best?"
- "Which subject needs improvement?"
- "Show me my marks."

---

## 7. n8n Automation

n8n is used for workflow automation.

The automation component can be used for:

- Automated notifications
- Data synchronization
- Academic-related workflow automation
- Trigger-based actions
- Scheduled tasks

This reduces repetitive manual work and demonstrates automation integration in the project.

---

# Technologies Used

## Frontend

- HTML5
- CSS3
- JavaScript

## Backend

- Node.js
- Express.js
- REST APIs

## Database

- MongoDB
- Mongoose

## Analytics

- Microsoft Power BI

## Artificial Intelligence

- Generative AI
- AI Student Assistant

## Automation

- n8n

## Version Control

- Git
- GitHub

---

# Project Structure

```text
EduTrack_Website/
│
├── index.html
├── about.html
├── contact.html
│
├── student-login.html
├── dashboard.html
├── attendance.html
├── performance.html
├── chatbot.html
│
├── teacher-login.html
├── teacher-dashboard.html
├── teacher-students.html
├── teacher-student-profile.html
├── teacher-attendance.html
├── teacher-performance.html
│
├── style.css
├── script.js
│
├── images/
│   └── education.jpg
│
├── backend/
│   ├── server.js
│   ├── test.js
│   ├── package.json
│   ├── package-lock.json
│   │
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── Attendance.js
│   │   ├── Performance.js
│   │   ├── Student.js
│   │   └── Teacher.js
│   │
│   └── routes/
│       ├── attendance.js
│       ├── chatbot.js
│       ├── dashboard.js
│       ├── performance.js
│       ├── student.js
│       └── teacher.js
│
├── .gitignore
└── README.md