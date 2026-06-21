const enrollmentService =
    require("../services/enrollment.service");

exports.createEnrollment = async (
    req,
    res,
    next
) => {

    try {

        const {
            student_id,
            course_id
        } = req.body;

        if (!student_id || !course_id) {
            return res.status(400).json({
                message:
                    "student_id and course_id are required"
            });
        }

        const enrollment =
            await enrollmentService.createEnrollment(
                student_id,
                course_id
            );

        res.status(201).json(enrollment);

    } catch (err) {

        next(err);

    }
};