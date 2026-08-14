const express = require("express");
const router = express.Router();

const Attendance = require("../models/Attendance");

// ================================
// ADD ATTENDANCE
// ================================
router.post("/", async (req, res) => {

    console.log("Attendance API called");

    try {

        // ================================
        // SAVE ATTENDANCE
        // ================================

        const attendance =
            new Attendance(req.body);

        await attendance.save();


        // ================================
        // CALCULATE ATTENDANCE PERCENTAGE
        // ================================

        const allAttendance =
            await Attendance.find({
                studentEmail:
                    attendance.studentEmail
            });


        const total =
            allAttendance.length;


        const present =
            allAttendance.filter(
                record =>
                    String(record.status)
                        .toLowerCase() ===
                    "present"
            ).length;


        let attendancePercentage = 0;


        if (total > 0) {

            attendancePercentage =
                (present / total) * 100;

        }


        console.log(
            "Attendance Percentage:",
            attendancePercentage
        );


        // ================================
        // SEND DATA TO N8N
        // ================================

        try {

            await fetch(
                "https://samueldaniel03.app.n8n.cloud/webhook/cfeaaf3c-4fcf-4c53-8795-07bfc096d669",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        body: {

                            "Attendance Percentage ":
                                attendancePercentage,

                            studentEmail:
                                attendance.studentEmail,

                            date:
                                attendance.date,

                            status:
                                attendance.status

                        }

                    })

                }
            );


            console.log(
                "Attendance data sent to n8n"
            );


        } catch (n8nError) {

            /*
             * n8n failure should NOT
             * break attendance saving.
             */

            console.error(
                "n8n notification error:",
                n8nError.message
            );

        }


        // ================================
        // SEND SUCCESS TO WEBSITE
        // ================================

        res.status(200).json({

            message:
                "Attendance saved successfully",

            attendance:
                attendance,

            attendancePercentage:
                attendancePercentage

        });


    } catch (error) {

        console.error(
            "Attendance Error:",
            error
        );


        res.status(500).json({

            message:
                error.message

        });

    }

});


// ================================
// GET ATTENDANCE FOR A STUDENT
// ================================
router.get("/:email", async (req, res) => {

    console.log(
        "Get Attendance API called"
    );

    try {

        const attendance =
            await Attendance.find({

                studentEmail:
                    req.params.email

            }).sort({
                date: -1
            });


        res.status(200).json({

            message:
                "Attendance fetched successfully",

            attendance:
                attendance

        });


    } catch (error) {

        res.status(500).json({

            message:
                error.message

        });

    }

});


console.log(
    "Attendance route loaded"
);


module.exports = router;