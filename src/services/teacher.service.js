const pool = require("../config/db");

exports.getTeachers = async () => {

    const result = await pool.query(
        "SELECT * FROM teachers"
    );

    return result.rows;
};