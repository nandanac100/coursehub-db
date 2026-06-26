const express = require("express");

const router = express.Router();

const enrollmentController =
require("../controllers/enrollment.controller");

router.get(
    "/",
    enrollmentController.getEnrollments
);

router.get(
    "/:id",
    enrollmentController.getEnrollmentById
);

router.post(
    "/",
    enrollmentController.createEnrollment
);

router.delete(
    "/:id",
    enrollmentController.deleteEnrollment
);

module.exports = router;