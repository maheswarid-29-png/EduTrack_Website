require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();


// ========================================
// MIDDLEWARE
// ========================================

// Allow frontend to communicate with backend
app.use((req, res, next) => {

    res.header(
        "Access-Control-Allow-Origin",
        "*"
    );

    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );

    res.header(
        "Access-Control-Allow-Headers",
        "Content-Type"
    );

    if (req.method === "OPTIONS") {

        return res.sendStatus(200);

    }

    next();

});


app.use(express.json());


// ========================================
// CONNECT MONGODB
// ========================================

connectDB();


// ========================================
// ROUTES
// ========================================

const studentRoutes = require("./routes/student");

const attendanceRoutes =
    require("./routes/attendance");

const performanceRoutes =
    require("./routes/performance");

const dashboardRoutes =
    require("./routes/dashboard");

const chatbotRoutes =
    require("./routes/chatbot");
const teacherRoutes =
    require("./routes/teacher");

// ========================================
// USE ROUTES
// ========================================

app.use(
    "/api/students",
    studentRoutes
);

app.use(
    "/api/attendance",
    attendanceRoutes
);

app.use(
    "/api/performance",
    performanceRoutes
);

app.use(
    "/api/dashboard",
    dashboardRoutes
);

app.use(
    "/api/chatbot",
    chatbotRoutes
);
app.use(
    "/api/teachers",
    teacherRoutes
);

// ========================================
// TEST ROUTE
// ========================================

app.get("/", (req, res) => {

    res.send(
        "EduTrack Backend API is running successfully"
    );

});


// ========================================
// SERVER
// ========================================

const PORT = 5001;

app.listen(
    PORT,
    () => {

        console.log(
            `Server running on port ${PORT}`
        );

    }
);