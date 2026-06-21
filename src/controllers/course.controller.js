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