const { Project } = require("../../Models/Project");

class ProjectController{
    async index(req, res, next){
        try {
            const owner = req.user._id;
            const projects = await Project.find({owner});
            return res.json({
                status: 200,
                success: true,
                data: projects
            });
        } catch (error) {
            next(error);
        }
    }
    show(){}
    async store(req, res, next){
        try {
            const {title, text, image} = req.body;
            const owner = req.user._id;
            const result = await Project.create({title, text, owner, image});
            if(!result) throw {status: 500, message: "Project Create Failed", success: false};
            
            return res.status(201).json({
                status: 201,
                message: "Project Created Successfuly",
                success: true
            });
        } catch (error) {
            next(error);
        }
    }
    update(){}
    destroy(){}
}

module.exports = {
    ProjectController: new ProjectController()
}