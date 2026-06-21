const pool = require("../config/db");

exports.getCourses = async () => {

    const result = await pool.query(`
        SELECT
            c.id,
            c.title,
            c.description,
            c.created_at,
            t.id as teacher_id,
            t.name as teacher_name,
            t.email as teacher_email

        FROM courses c

        JOIN teachers t
            ON c.teacher_id = t.id

        ORDER BY c.created_at DESC
    `);

    return result.rows;
};