require("dotenv").config();

const express = require("express");
const pool = require("./config/db");

const app = express();

app.use(express.json());

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
const studentRoutes=require("./routes/student.routes");

app.use("/students",studentRoutes);