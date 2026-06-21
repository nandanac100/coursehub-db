const pool = require("../config/db");

exports.createEnrollment = async (
    studentId,
    courseId
) => {

    const result = await pool.query(
        `
        INSERT INTO enrollments(
            student_id,
            course_id
        )
        VALUES($1,$2)
        RETURNING *
        `,
        [studentId, courseId]
    );

    return result.rows[0];
};