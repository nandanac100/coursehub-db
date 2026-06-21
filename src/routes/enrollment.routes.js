const express = require("express");

const router = express.Router();

const enrollmentController =
    require("../controllers/enrollment.controller");

router.post(
    "/",
    enrollmentController.createEnrollment
);

module.exports = router;