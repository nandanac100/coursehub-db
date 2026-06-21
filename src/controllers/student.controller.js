const studentService = require("../services/student.service");

exports.getStudents = async (req,res,next)=>{
    try{
        const students =await studentService.getStudents();
        res.json(students);
    }catch(err){
        next(err);
    }

};


exports.getStudentById = async (req, res,next) => {
    try {
        const student = await studentService.getStudentById(
            req.params.id
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (err) {

        next(err);
    }
};

exports.createStudent = async (req, res,next) => {
    try {

        const { name, email } = req.body;

        const student = await studentService.createStudent(
            name,
            email
        );

        res.status(201).json(student);

    } catch (err) {

        next(err);

    }
};

exports.updateStudent = async (req, res,next) => {
    try {

        const { id } = req.params;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({
                message: "Name and email are required"
            });
        }

        const student = await studentService.updateStudent(
            id,
            name,
            email
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(student);

    } catch (err) {

        next(err);
    }
};

exports.deleteStudent = async (req, res,next) => {
    try {

        const { id } = req.params;

        const student = await studentService.deleteStudent(id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully",
            student
        });

    } catch (err) {

       next(err);
    }
};

exports.getStudentCourses = async (
    req,
    res,
    next
) => {

    try {

        const courses =
            await studentService.getStudentCourses(
                req.params.id
            );

        res.json(courses);

    } catch (err) {

        next(err);

    }

};