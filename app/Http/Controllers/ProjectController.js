const { isValidObjectId } = require("mongoose");
const { Project } = require("../../Models/Project");
const Controller = require("./Controller");

class ProjectController extends Controller{
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
    async show(req, res, next){
        try {
            const {id: _id} = req.params;
            const owner = req.user._id;
            if(!isValidObjectId(_id)) throw {status: 422, message: "Invalid Id", success: false};

            const project = await this.findOne({owner, _id}, Project, "Project");

            return res.json({
                status: 200,
                success: true,
                data: project
            });

        } catch (error) {
            next(error);
        }
    }
    async store(req, res, next){
        try {
            const {title, text, image, tags} = req.body;
            const owner = req.user._id;
            const result = await Project.create({title, text, owner, image, tags});
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
    async destroy(req, res, next){
        try {
            const {id: _id} = req.params;
            const owner = req.user._id;

            if(!isValidObjectId(_id)) throw {status: 422, success: false, message: "Invalid Id"};
            const project = await this.findOne({_id, owner}, Project, "Project");

            const result = await Project.deleteOne({_id});
            if(result.deletedCount == 0) throw {status: 500, success: false, message: "Project Delete Failed"};

            return res.json({
                status: 200,
                success: true,
                message: "Project Deleted Successfuly"
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    ProjectController: new ProjectController()
}