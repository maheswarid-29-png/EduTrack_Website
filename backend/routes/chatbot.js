const express = require("express");
const router = express.Router();

const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const Performance = require("../models/Performance");

console.log("Chatbot route loaded");


// ========================================
// AI STUDENT ASSISTANT
// ========================================

router.post("/:email", async (req, res) => {

    console.log("Chatbot API called");

    try {

        const email = req.params.email;
        const question = req.body.question;


        // ------------------------------------
        // CHECK QUESTION
        // ------------------------------------

        if (!question) {

            return res.status(400).json({
                message: "Question is required"
            });

        }


        // ------------------------------------
        // FIND STUDENT
        // ------------------------------------

        const student =
            await Student.findOne({
                email: email
            });


        if (!student) {

            return res.status(404).json({
                message: "Student not found"
            });

        }


        // ------------------------------------
        // GET ATTENDANCE
        // ------------------------------------

        const attendance =
            await Attendance.find({
                studentEmail: email
            }).sort({
                date: -1
            });


        const totalClasses =
            attendance.length;


        const presentClasses =
            attendance.filter(
                record =>
                    record.status === "Present"
            ).length;


        const absentClasses =
            attendance.filter(
                record =>
                    record.status === "Absent"
            ).length;


        const attendancePercentage =
            totalClasses > 0
                ? (
                    presentClasses /
                    totalClasses
                ) * 100
                : 0;


        // ------------------------------------
        // GET PERFORMANCE
        // ------------------------------------

        const performance =
            await Performance.find({
                studentEmail: email
            });


        let averagePerformance = 0;


        if (performance.length > 0) {

            const totalPercentage =
                performance.reduce(
                    (sum, record) => {

                        return sum +
                            (
                                record.marks /
                                record.totalMarks
                            ) * 100;

                    },
                    0
                );


            averagePerformance =
                totalPercentage /
                performance.length;

        }


        // ------------------------------------
        // FIND BEST SUBJECT
        // ------------------------------------

        let bestSubject = null;
        let bestPercentage = 0;


        performance.forEach(record => {

            const percentage =
                (
                    record.marks /
                    record.totalMarks
                ) * 100;


            if (percentage > bestPercentage) {

                bestPercentage =
                    percentage;

                bestSubject =
                    record.subject;

            }

        });


        // ------------------------------------
        // FIND SUBJECT NEEDING IMPROVEMENT
        // ------------------------------------

        let improvementSubject = null;
        let lowestPercentage = 101;


        performance.forEach(record => {

            const percentage =
                (
                    record.marks /
                    record.totalMarks
                ) * 100;


            if (percentage < lowestPercentage) {

                lowestPercentage =
                    percentage;

                improvementSubject =
                    record.subject;

            }

        });


        // ------------------------------------
        // CONVERT QUESTION TO LOWERCASE
        // ------------------------------------

        const q =
            question.toLowerCase();


        let answer;


        // ====================================
        // ATTENDANCE QUESTIONS
        // ====================================

        if (
            q.includes("attendance") ||
            q.includes("present") ||
            q.includes("absent")
        ) {

            answer =
                `Your attendance is ${attendancePercentage.toFixed(2)}%. You attended ${presentClasses} out of ${totalClasses} classes and were absent for ${absentClasses} classes.`;

        }


        // ====================================
        // AVERAGE PERFORMANCE QUESTIONS
        // ====================================

        else if (
            q.includes("average") ||
            q.includes("overall performance")
        ) {

            answer =
                `Your average academic performance is ${averagePerformance.toFixed(2)}%.`;

        }


        // ====================================
        // BEST SUBJECT
        // ====================================
        else if (
            q.includes("best subject") ||
            q.includes("best") ||
            q.includes("highest mark") ||
            q.includes("highest score") ||
            q.includes("best performance") ||
            q.includes("top subject")
        ) {

            if (bestSubject) {

                answer =
                    `Your best-performing subject is ${bestSubject} with ${bestPercentage.toFixed(2)}%.`;

            } else {

                answer =
                    "You don't have any performance records yet.";

            }

        }


        // ====================================
        // IMPROVEMENT
        // ====================================

        else if (
            q.includes("improve") ||
            q.includes("weak") ||
            q.includes("lowest") ||
            q.includes("need improvement")
        ) {

            if (improvementSubject) {

                answer =
                    `You may want to focus more on ${improvementSubject}. Your current score in this subject is ${lowestPercentage.toFixed(2)}%. Keep practicing and reviewing the topics regularly.`;

            } else {

                answer =
                    "You don't have enough performance data to identify an area for improvement.";

            }

        }


        // ====================================
        // SUBJECT QUESTIONS
        // ====================================

        else if (
            q.includes("marks") ||
            q.includes("subjects") ||
            q.includes("score")
        ) {

            if (performance.length === 0) {

                answer =
                    "You don't have any performance records yet.";

            } else {

                const records =
                    performance.map(record => {

                        const percentage =
                            (
                                record.marks /
                                record.totalMarks
                            ) * 100;

                        return `${record.subject}: ${record.marks}/${record.totalMarks} (${percentage.toFixed(2)}%)`;

                    });


                answer =
                    "Here are your marks: " +
                    records.join(", ") +
                    ".";

            }

        }


        // ====================================
        // STUDENT INFORMATION
        // ====================================

        else if (
            q.includes("my name") ||
            q.includes("who am i") ||
            q.includes("my course")
        ) {

            answer =
                `You are ${student.name}, and you are studying ${student.course}.`;

        }


        // ====================================
        // GREETING
        // ====================================

        else if (
            q.includes("hello") ||
            q.includes("hi") ||
            q.includes("hey")
        ) {

            answer =
                `Hello ${student.name}! 👋 How can I help you with your academic progress?`;

        }


        // ====================================
        // DEFAULT RESPONSE
        // ====================================

        else {

            answer =
                `Hi ${student.name}! I can help you with your attendance, marks, average performance, best subject, subjects needing improvement, and course information. Try asking "What is my attendance?" or "Which subject is my best?"`;

        }


        // ====================================
        // SEND RESPONSE
        // ====================================

        res.status(200).json({

            message:
                "Chatbot response generated successfully",

            answer: answer

        });


    } catch (error) {

        console.error(
            "Chatbot error:",
            error
        );


        res.status(500).json({

            message:
                error.message

        });

    }

});


module.exports = router;