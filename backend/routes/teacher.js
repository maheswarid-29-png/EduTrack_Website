const express = require("express");
const router = express.Router();

const Teacher = require("../models/Teacher");

console.log("Teacher route loaded");


// ========================================
// TEACHER REGISTER
// ========================================

router.post("/register", async (req, res) => {

    try {

        const { name, email, password, subject } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "Name, email and password are required"
            });

        }

        const existingTeacher =
            await Teacher.findOne({ email });

        if (existingTeacher) {

            return res.status(400).json({
                message: "Teacher already registered"
            });

        }

        const teacher =
            new Teacher({
                name,
                email,
                password,
                subject
            });

        await teacher.save();

        res.status(201).json({
            message: "Teacher registered successfully",
            teacher: {
                name: teacher.name,
                email: teacher.email,
                subject: teacher.subject
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ========================================
// TEACHER LOGIN
// ========================================

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const teacher =
            await Teacher.findOne({ email });

        if (!teacher) {

            return res.status(404).json({
                message: "Teacher not found"
            });

        }

        if (teacher.password !== password) {

            return res.status(401).json({
                message: "Invalid password"
            });

        }

        res.status(200).json({
            message: "Teacher login successful",

            teacher: {
                name: teacher.name,
                email: teacher.email,
                subject: teacher.subject
            }
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// ========================================
// GET TEACHER PROFILE
// ========================================

router.get("/profile/:email", async (req, res) => {

    try {

        const teacher =
            await Teacher.findOne({
                email: req.params.email
            });

        if (!teacher) {

            return res.status(404).json({
                message: "Teacher not found"
            });

        }

        res.status(200).json({

            message:
                "Teacher profile fetched successfully",

            teacher: {
                name: teacher.name,
                email: teacher.email,
                subject: teacher.subject
            }

        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


module.exports = router;