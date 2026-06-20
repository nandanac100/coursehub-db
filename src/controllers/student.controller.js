const studentService = require("../services/student.service");

exports.getStudents = async (req,res)=>{
    try{
        const students=await studentService.getStudents();

        res.json(students);

    }catch(err){

        res.status(500).json({
            message:"Internal Server Error"
        });

    }
};