const express = require("express");
const router = express.Router();

const Performance = require("../models/Performance");

// ================================
// ADD PERFORMANCE
// ================================
router.post("/", async (req, res) => {
    console.log("Performance API called");

    try {
        const performance = new Performance(req.body);

        await performance.save();

        res.status(200).json({
            message: "Performance saved successfully",
            performance: performance
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

// ================================
// GET PERFORMANCE FOR A STUDENT
// ================================
router.get("/:email", async (req, res) => {
    console.log("Get Performance API called");

    try {
        const performance = await Performance.find({
            studentEmail: req.params.email
        });

        res.status(200).json({
            message: "Performance fetched successfully",
            performance: performance
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

console.log("Performance route loaded");

module.exports = router;