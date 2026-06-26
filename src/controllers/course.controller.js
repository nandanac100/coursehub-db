const courseService =
    require("../services/course.service");

exports.getCourses = async (req,res,next)=>{

    try{

        const courses =
            await courseService.getCourses();

        res.json(courses);

    }catch(err){

        next(err);

    }
};



exports.getCourseById = async (req,res,next)=>{
    try{

        const course = await courseService.getCourseById(
            req.params.id
        );

        if(!course){
            return res.status(404).json({
                message:"Course not found"
            });
        }

        res.json(course);

    }catch(err){
        next(err);
    }
};

exports.createCourse = async (req,res,next)=>{
    try{

        const {
            title,
            description,
            teacher_id
        } = req.body;

        if(
            !title ||
            !description ||
            !teacher_id
        ){
            return res.status(400).json({
                message:"All fields are required"
            });
        }

        const course =
            await courseService.createCourse(
                title,
                description,
                teacher_id
            );

        res.status(201).json(course);

    }catch(err){
        next(err);
    }
};

exports.updateCourse = async (req,res,next)=>{
    try{

        const { id } = req.params;

        const {
            title,
            description,
            teacher_id
        } = req.body;

        const course =
            await courseService.updateCourse(
                id,
                title,
                description,
                teacher_id
            );

        if(!course){
            return res.status(404).json({
                message:"Course not found"
            });
        }

        res.json(course);

    }catch(err){
        next(err);
    }
};

exports.deleteCourse = async (req,res,next)=>{
    try{

        const course =
            await courseService.deleteCourse(
                req.params.id
            );

        if(!course){
            return res.status(404).json({
                message:"Course not found"
            });
        }

        res.json({
            message:"Course deleted successfully",
            course
        });

    }catch(err){
        next(err);
    }
};

exports.getCourseStudents = async (req,res,next)=>{
    try{

        const students =
            await courseService.getCourseStudents(
                req.params.id
            );

        res.json(students);

    }catch(err){
        next(err);
    }
};