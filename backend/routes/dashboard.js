const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const Performance = require("../models/Performance");

// ================================
// GET STUDENT DASHBOARD
// ================================
router.get("/:email", async (req, res) => {
    console.log("Dashboard API called");

    try {
        const email = req.params.email;

        // Get student
        const student = await Student.findOne({
            email: email
        });

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        // Get attendance
        const attendance = await Attendance.find({
            studentEmail: email
        }).sort({ date: -1 });

        // Calculate attendance percentage
        const totalClasses = attendance.length;

        const presentClasses = attendance.filter(
            record => record.status === "Present"
        ).length;

        let attendancePercentage = 0;

        if (totalClasses > 0) {
            attendancePercentage =
                (presentClasses / totalClasses) * 100;
        }

        // Get performance
        const performance = await Performance.find({
            studentEmail: email
        });

        // Calculate average marks percentage
        let averagePercentage = 0;

        if (performance.length > 0) {
            const totalPercentage = performance.reduce(
                (sum, record) => {
                    return sum + (record.marks / record.totalMarks) * 100;
                },
                0
            );

            averagePercentage =
                totalPercentage / performance.length;
        }

        // Send dashboard data
        res.status(200).json({
            message: "Dashboard data fetched successfully",

            student: {
                name: student.name,
                email: student.email,
                course: student.course
            },

            attendance: {
                totalClasses: totalClasses,
                presentClasses: presentClasses,
                absentClasses: totalClasses - presentClasses,
                percentage: attendancePercentage.toFixed(2)
            },

            performance: {
                records: performance,
                averagePercentage: averagePercentage.toFixed(2)
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

console.log("Dashboard route loaded");

module.exports = router;