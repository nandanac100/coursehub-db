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



exports.getEnrollments = async (req,res,next)=>{

    try{

        const enrollments =
            await enrollmentService.getEnrollments();

        res.json(enrollments);

    }catch(err){

        next(err);

    }
};

exports.getEnrollmentById = async (
    req,
    res,
    next
)=>{

    try{

        const enrollment =
            await enrollmentService.getEnrollmentById(
                req.params.id
            );

        if(!enrollment){

            return res.status(404).json({
                message:"Enrollment not found"
            });

        }

        res.json(enrollment);

    }catch(err){

        next(err);

    }
};

exports.deleteEnrollment = async (
    req,
    res,
    next
)=>{

    try{

        const enrollment =
            await enrollmentService.deleteEnrollment(
                req.params.id
            );

        if(!enrollment){

            return res.status(404).json({
                message:"Enrollment not found"
            });

        }

        res.json({
            message:"Enrollment deleted successfully",
            enrollment
        });

    }catch(err){

        next(err);

    }
};