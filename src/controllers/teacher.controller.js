const teacherService =
    require("../services/teacher.service");

exports.getTeachers = async (req,res,next) => {

    try{

        const teachers =
            await teacherService.getTeachers();

        res.json(teachers);

    }catch(err){

        next(err);

    }
};