const pool=require("../config/db");

exports.getStudents=async()=>{

    const result=await pool.query(
        "SELECT * FROM students"
    );

    return result.rows;

};

exports.getStudentById = async (id) => {

    const result = await pool.query(
        "SELECT * FROM students WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

exports.createStudent = async (name, email) => {

    const result = await pool.query(
        `
        INSERT INTO students(name,email)
        VALUES($1,$2)
        RETURNING *
        `,
        [name, email]
    );

    return result.rows[0];
};

exports.updateStudent = async (id, name, email) => {

    const result = await pool.query(
        `
        UPDATE students
        SET name = $1,
            email = $2
        WHERE id = $3
        RETURNING *
        `,
        [name, email, id]
    );

    return result.rows[0];
};

exports.deleteStudent = async (id) => {

    const result = await pool.query(
        `
        DELETE FROM students
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};

exports.getStudentCourses = async (studentId) => {

    const result = await pool.query(
        `
        SELECT
            c.id as course_id,
            c.title,
            c.description,
            t.name as teacher_name

        FROM enrollments e

        JOIN courses c
            ON e.course_id = c.id

        JOIN teachers t
            ON c.teacher_id = t.id

        WHERE e.student_id = $1
        `,
        [studentId]
    );

    return result.rows;
};