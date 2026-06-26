const pool = require("../config/db");

// Get all teachers
exports.getTeachers = async () => {
    const result = await pool.query(
        "SELECT * FROM teachers ORDER BY id"
    );

    return result.rows;
};

// Get teacher by ID
exports.getTeacherById = async (id) => {
    const result = await pool.query(
        "SELECT * FROM teachers WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

// Create teacher
exports.createTeacher = async (name, email) => {
    const result = await pool.query(
        `
        INSERT INTO teachers(name, email)
        VALUES($1, $2)
        RETURNING *
        `,
        [name, email]
    );

    return result.rows[0];
};

// Update teacher
exports.updateTeacher = async (id, name, email) => {
    const result = await pool.query(
        `
        UPDATE teachers
        SET
            name = $1,
            email = $2
        WHERE id = $3
        RETURNING *
        `,
        [name, email, id]
    );

    return result.rows[0];
};

// Delete teacher
exports.deleteTeacher = async (id) => {
    const result = await pool.query(
        `
        DELETE FROM teachers
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};