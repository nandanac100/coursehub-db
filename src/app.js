require("dotenv").config();

const express = require("express");
const pool = require("./config/db");
const errorHandler =require("./middleware/error.middleware");


const studentRoutes = require("./routes/student.routes");
const teacherRoutes =require("./routes/teacher.routes");
const courseRoutes =require("./routes/course.routes");
const enrollmentRoutes =require("./routes/enrollment.routes");



const app = express();

app.use(express.json());
app.use("/students", studentRoutes);
app.use("/teachers", teacherRoutes);
app.use("/courses", courseRoutes);
app.use("/enrollments",enrollmentRoutes);

pool.query("SELECT NOW()", (err, result) => {
    if (err) {
        console.log("Database connection failed");
        console.log(err.message);
    } else {
        console.log("Database connected!");
        console.log(result.rows[0]);
    }
});

app.get("/", (req, res) => {
    res.send("CourseHub Backend Running");
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});