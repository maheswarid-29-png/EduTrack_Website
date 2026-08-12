const mongoose = require("mongoose");

const performanceSchema = new mongoose.Schema({
    studentEmail: {
        type: String,
        required: true
    },

    subject: {
        type: String,
        required: true
    },

    exam: {
        type: String,
        required: true
    },

    marks: {
        type: Number,
        required: true
    },

    totalMarks: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Performance", performanceSchema);