const pool = require("../config/db");

// Get all enrollments
exports.getEnrollments = async () => {

    const result = await pool.query(`
        SELECT
            e.id,
            e.created_at,
            s.id AS student_id,
            s.name AS student_name,
            c.id AS course_id,
            c.title AS course_title

        FROM enrollments e

        JOIN students s
            ON e.student_id = s.id

        JOIN courses c
            ON e.course_id = c.id

        ORDER BY e.created_at DESC
    `);

    return result.rows;
};

// Get enrollment by ID
exports.getEnrollmentById = async (id) => {

    const result = await pool.query(`
        SELECT
            e.id,
            e.created_at,
            s.id AS student_id,
            s.name AS student_name,
            c.id AS course_id,
            c.title AS course_title

        FROM enrollments e

        JOIN students s
            ON e.student_id = s.id

        JOIN courses c
            ON e.course_id = c.id

        WHERE e.id = $1
    `,[id]);

    return result.rows[0];
};

// Create enrollment
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

// Delete enrollment
exports.deleteEnrollment = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM enrollments

        WHERE id=$1

        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};