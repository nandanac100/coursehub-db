const express = require("express");

const router = express.Router();

const teacherController =
    require("../controllers/teacher.controller");

router.get("/", teacherController.getTeachers);

module.exports = router;