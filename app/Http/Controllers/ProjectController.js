const { isValidObjectId } = require("mongoose");
const { Project } = require("../../Models/Project");
const Controller = require("./Controller");
const { generateUrl } = require('../../Modules/functions');
class ProjectController extends Controller{
    async index(req, res, next){
        try {
            const owner = req.user._id;
            const projects = await Project.find({owner});
            projects.map(project =>{
                project.image = generateUrl(req, project.image);
                return project;
            })
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
                message: "Project Created successfully",
                success: true
            });
        } catch (error) {
            next(error);
        }
    }
    async update(req, res, next){
        try {
            const data = {...req.body};
            const {id: _id} = req.params;
            const owner = req.user._id;

            if(!isValidObjectId(_id)) throw {status: 422, success: false, message: "Invalid Id"};
            const project = await this.findOne({_id, owner}, Project, "Project");
            Object.entries(data).forEach(([key, value]) => {
                if(['', null, undefined, NaN, -1, " "].includes(value)) delete data[key];
                if(!['title', 'text', 'tags'].includes(key)) delete data[key];
                if(data[key].constructor === Array){
                    data[key] = data[key].filter(val => {
                        if(!['', null, undefined, NaN, -1, " "].includes(val)) return val;
                    });
                    if(data[key].length == 0) delete data[key];
                }
            });

            const result = await Project.updateOne({_id}, {$set: data});
            if(result.modifiedCount == 0) throw {status: 500, success: false, message: "Project Update Failed"};

            return res.json({
                status: 200,
                message: "Project Updated successfully",
                success: true
            });
        } catch (error) {
            next(error);
        }
    }
    async destroy(req, res, next){
        try {
            const {id: _id} = req.params;
            const owner = req.user._id;

            if(!isValidObjectId(_id)) throw {status: 422, success: false, message: "Invalid Id"};
            await this.findOne({_id, owner}, Project, "Project");

            const result = await Project.deleteOne({_id});
            if(result.deletedCount == 0) throw {status: 500, success: false, message: "Project Delete Failed"};

            return res.json({
                status: 200,
                success: true,
                message: "Project Deleted successfully"
            });
        } catch (error) {
            next(error);
        }
    }
    async uploadImage(req, res, next){
        try {
            const {image} = req.body;
            const owner = req.user._id;
            const {id: _id} = req.params;

            if(!isValidObjectId(_id)) throw {status: 422, success: false, message: "Invalid Id"};
            await this.findOne({_id, owner}, Project, "Project");

            const result = await Project.updateOne({_id}, {$set: {image}});
            if(result.modifiedCount == 0) throw {status: 500, success: false, message: "Project Image Upload Failed"};

            return res.json({
                status: 200,
                success: true,
                message: "Project Image Uploaded Successfuly"
            });

        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    ProjectController: new ProjectController()
}