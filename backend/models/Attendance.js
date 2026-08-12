const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
    studentEmail: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    status: {
        type: String,
        enum: ["Present", "Absent"],
        required: true
    }
});

module.exports = mongoose.model("Attendance", attendanceSchema);