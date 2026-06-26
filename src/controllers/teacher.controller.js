const teacherService = require("../services/teacher.service");

// Get all teachers
exports.getTeachers = async (req, res, next) => {
    try {
        const teachers = await teacherService.getTeachers();
        res.json(teachers);
    } catch (err) {
        next(err);
    }
};

// Get teacher by ID
exports.getTeacherById = async (req, res, next) => {
    try {
        const teacher = await teacherService.getTeacherById(
            req.params.id
        );

        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        res.json(teacher);

    } catch (err) {
        next(err);
    }
};

// Create teacher
exports.createTeacher = async (req, res, next) => {
    try {

        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const teacher =
            await teacherService.createTeacher(
                name,
                email
            );

        res.status(201).json(teacher);

    } catch (err) {
        next(err);
    }
};

// Update teacher
exports.updateTeacher = async (req, res, next) => {
    try {

        const { id } = req.params;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const teacher =
            await teacherService.updateTeacher(
                id,
                name,
                email
            );

        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        res.json(teacher);

    } catch (err) {
        next(err);
    }
};

// Delete teacher
exports.deleteTeacher = async (req, res, next) => {
    try {

        const teacher =
            await teacherService.deleteTeacher(
                req.params.id
            );

        if (!teacher) {
            return res.status(404).json({
                message: "Teacher not found"
            });
        }

        res.json({
            message: "Teacher deleted successfully",
            teacher
        });

    } catch (err) {
        next(err);
    }
};