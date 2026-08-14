const express = require("express");
const router = express.Router();

const Student = require("../models/Student");


// ================================
// ADD STUDENT FROM TEACHER
// ================================

router.post("/", async (req, res) => {

    console.log("Add Student API called");

    try {

        const {
            name,
            email,
            course,
            password
        } = req.body;


        // Check required fields

        if (
            !name ||
            !email ||
            !course ||
            !password
        ) {

            return res.status(400).json({

                message:
                    "Name, email, course and password are required."

            });

        }


        // Check if student already exists

        const existingStudent =
            await Student.findOne({
                email: email
            });


        if (existingStudent) {

            return res.status(409).json({

                message:
                    "A student with this email already exists."

            });

        }


        // Create new student

        const student =
            new Student({

                name: name,

                email: email,

                course: course,

                password: password

            });


        // Save student

        await student.save();


        // Send success response

        res.status(201).json({

            message:
                "Student added successfully",

            student: student

        });


    } catch (error) {

        console.error(
            "Add Student Error:",
            error
        );


        res.status(500).json({

            message:
                error.message

        });

    }

});


// ================================
// REGISTER STUDENT
// ================================

router.post("/register", async (req, res) => {

    console.log("Register API called");

    try {

        const student =
            new Student(req.body);

        await student.save();

        res.status(200).json({

            message:
                "Student registered successfully",

            student: student

        });

    } catch (error) {

        res.status(500).json({

            message:
                error.message

        });

    }

});


// ================================
// LOGIN STUDENT
// ================================

router.post("/login", async (req, res) => {

    console.log("Login API called");

    try {

        const {
            email,
            password
        } = req.body;


        const student =
            await Student.findOne({
                email: email
            });


        if (!student) {

            return res.status(404).json({

                message:
                    "Student not found"

            });

        }


        if (
            student.password !== password
        ) {

            return res.status(401).json({

                message:
                    "Invalid password"

            });

        }


        res.status(200).json({

            message:
                "Login successful",

            student: student

        });


    } catch (error) {

        res.status(500).json({

            message:
                error.message

        });

    }

});


// ================================
// GET STUDENT PROFILE
// ================================

router.get("/profile/:email", async (req, res) => {

    console.log("Profile API called");

    try {

        const student =
            await Student.findOne({

                email:
                    req.params.email

            });


        if (!student) {

            return res.status(404).json({

                message:
                    "Student not found"

            });

        }


        res.status(200).json({

            message:
                "Student profile fetched successfully",

            student: student

        });


    } catch (error) {

        res.status(500).json({

            message:
                error.message

        });

    }

});


// ================================
// GET ALL STUDENTS
// ================================

router.get("/", async (req, res) => {

    console.log(
        "Get Students API called"
    );

    try {

        const students =
            await Student.find(
                {},
                {
                    name: 1,
                    email: 1,
                    course: 1
                }
            );


        res.status(200).json({

            message:
                "Students fetched successfully",

            students:
                students

        });


    } catch (error) {

        console.error(
            "Get Students Error:",
            error
        );


        res.status(500).json({

            message:
                error.message

        });

    }

});


// ================================
// SHOW LOADED ROUTES
// ================================

console.log(
    "Student route loaded"
);

console.log(
    "Login route loaded"
);

console.log(
    "Student routes:",
    router.stack.map(
        (r) =>
            r.route &&
            r.route.path
    )
);


module.exports = router;