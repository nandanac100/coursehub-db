const pool = require("../config/db");

// Get all courses
exports.getCourses = async () => {

    const result = await pool.query(`
        SELECT
            c.id,
            c.title,
            c.description,
            c.created_at,
            t.id AS teacher_id,
            t.name AS teacher_name,
            t.email AS teacher_email

        FROM courses c

        JOIN teachers t
            ON c.teacher_id = t.id

        ORDER BY c.created_at DESC
    `);

    return result.rows;
};

// Get course by ID
exports.getCourseById = async (id) => {

    const result = await pool.query(`
        SELECT
            c.id,
            c.title,
            c.description,
            c.created_at,
            t.id AS teacher_id,
            t.name AS teacher_name,
            t.email AS teacher_email

        FROM courses c

        JOIN teachers t
            ON c.teacher_id = t.id

        WHERE c.id = $1
    `,[id]);

    return result.rows[0];
};

// Create course
exports.createCourse = async (
    title,
    description,
    teacherId
) => {

    const result = await pool.query(
        `
        INSERT INTO courses(
            title,
            description,
            teacher_id
        )
        VALUES($1,$2,$3)
        RETURNING *
        `,
        [title, description, teacherId]
    );

    return result.rows[0];
};

// Update course
exports.updateCourse = async (
    id,
    title,
    description,
    teacherId
) => {

    const result = await pool.query(
        `
        UPDATE courses

        SET
            title=$1,
            description=$2,
            teacher_id=$3

        WHERE id=$4

        RETURNING *
        `,
        [title, description, teacherId, id]
    );

    return result.rows[0];
};

// Delete course
exports.deleteCourse = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM courses

        WHERE id=$1

        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};

// Get students enrolled in a course
exports.getCourseStudents = async (courseId) => {

    const result = await pool.query(
        `
        SELECT
            s.id,
            s.name,
            s.email

        FROM enrollments e

        JOIN students s
            ON e.student_id = s.id

        WHERE e.course_id = $1
        `,
        [courseId]
    );

    return result.rows;
};