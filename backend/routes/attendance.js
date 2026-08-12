const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");

// ================================
// ADD ATTENDANCE
// ================================
router.post("/", async (req, res) => {
    console.log("Attendance API called");

    try {
        const attendance = new Attendance(req.body);

        await attendance.save();

        res.status(200).json({
            message: "Attendance saved successfully",
            attendance: attendance
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// ================================
// GET ATTENDANCE FOR A STUDENT
// ================================
router.get("/:email", async (req, res) => {
    console.log("Get Attendance API called");

    try {
        const attendance = await Attendance.find({
            studentEmail: req.params.email
        }).sort({ date: -1 });

        res.status(200).json({
            message: "Attendance fetched successfully",
            attendance: attendance
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

console.log("Attendance route loaded");

module.exports = router;