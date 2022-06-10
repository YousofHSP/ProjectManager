const { isValidObjectId } = require("mongoose");
const { Team } = require("../../Models/Team");
const { User } = require("../../Models/User");
const { generateUrl } = require("../../Modules/functions");
const Controller = require("./Controller");

class UserController extends Controller{
    getProfile(req, res, next){
        try {
            const user = req.user;
            user.image = generateUrl(req, user.image);
            return res.json({
                status: 200,
                message: "ok",
                success: true,
                data: user
            })
        } catch (error) {
            next(error);
        }
    }
    async updateProfile(req, res, next){
        try {
            let data = req.body;
            const userId = req.user._id;
            let fields = ['firstName', 'lastName', 'skills'];
            Object.entries(data).forEach(([key, value]) => {
                if(!fields.includes(key)) delete data[key];
                if(['', ' ', null, undefined, 0, -1, NaN].includes(value)) delete data[key];
            });
            
            const result = await User.updateOne({_id: userId}, {$set: data});

            if(result.matchedCount > 0) {
                return res.json({
                    status: 200,
                    success: true,
                    message: "Profile Update successfully"
                });
            }
            throw {status: 500, message: "Profile Update Failed", success: false};
            
        } catch (error) {
            next(error);
        }
    }
    async uploadProfileImage(req, res, next){
        try {
            if(Object.keys(req.file).length == 0) throw {status: 422, message: "Invalid Image", success: false};
            const userId = req.user._id;

            const filePath = req.file?.path.substring(6);
            const result = await User.updateOne({_id: userId}, {$set: {image: filePath}});

            if(result.modifiedCount == 0) throw {status:500, message: "Image Upload Failed", success: false};

            return res.json({
                status: 200,
                message: "Image Upload successfully",
                success: true,
            });
            
            
        } catch (error) {
            next(error);
        }
    }
    getSkills(){}
    updateSkills(){}
    async indexTeams(req, res, next){
        try {
            const user = req.user._id;

            const teams = await Team.find({$or: [{owner: user}, {users: user}]});
            return res.json({
                status: 200,
                success: true,
                data: teams
            });
        } catch (error) {
            next(error);
        }
    }
    async indexRequest(req, res, next){
        try {
            const {status} = req.query;
            const userID = req.user._id;
            let filter = 1;
            if(['pending', 'accepted', 'rejected'].includes(status)){
                filter = {
                    $filter: {
                        input: "$inviteRequests",
                        as: "requests",
                        cond: {
                            $eq: ["$$requests.status", status]
                        }
                    }
                };
            }
            const requests = await (User.aggregate([
                {
                    $match: {_id: userID}
                },
                {
                    $project: {
                        _id: 0,
                        inviteRequests: filter
                    }
                }
            ]))
            return res.json({requests: requests?.[0]?.inviteRequests || []});
        } catch (error) {
            next(error);
        }
    }
    getProjects(){}
    async changeStatusInvite(req, res, next){
        try {
            const {id, status} = req.params;
            const request = await User.findOne({"inviteRequests._id": id});
            const findRequest = request.inviteRequests.find(item => item.id == id);
            if(findRequest.status !== 'pending') throw {status: 400, message: "Request Already accepted or rejected"};
            
            const result = await User.updateOne({"inviteRequests._id": id}, {
                $set: {"inviteRequests.$.status": status}
            });
            if(result.modifiedCount == 0) throw {status: 500, message: "Change Request Statut Failed", success: false};
            return res.json({
                success: true,
                status: 200,
                message: "Request Status Changed Successfully"
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = {
    UserController: new UserController()
}