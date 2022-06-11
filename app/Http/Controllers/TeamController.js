const { isValidObjectId } = require("mongoose");
const { Team } = require("../../Models/Team");
const { User } = require("../../Models/User");
const { TeamRes } = require("../Resources/TeamRes");
const Controller = require("./Controller");

class TeamController extends Controller{
    async index(req, res, next){
        try {
            const owner = req.user._id;
            const teams = await Team.find({owner}).populate(['owner', 'users']);
            return res.json({
                status: 200,
                success: true,
                data: TeamRes.collection(teams)
            });
        } catch (error) {
            next(error);
        }
    }
    async show(req, res, next){
        try {
            const {id: _id} = req.params;
            if(!isValidObjectId(_id)) throw {status: 422, success: false, message: "Invalid Id"};
            const team = await this.findOne({_id}, Team, 'Team');
            if(!team) throw {status: 404, message: "Team Not Found", success: false};
            return res.json({
                status: 200,
                success: true,
                data: TeamRes.handle(team)
            });
        } catch (error) {
            next(error);
        }
    }
    async store(req, res, next){
        try {
            const {name, description, username} = req.body;
            const owner = req.user._id;
            const team = await Team.create({name, description, owner, username});
            if(!team) throw {status: 500, success:false, message: "Team Create Failed"};
            return res.status(201).json({
                status: 201,
                success: true,
                message: "Team Created Successfully"
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

            await this.findOne({_id, owner}, Team, "Team");

            Object.entries(data).forEach(([key, value]) => {
                if(['', null, undefined, 'null', -1, 0, false].includes(value)) delete data[key];
                if(!['name', 'description'].includes(key)) delete data[key];
            });

            const result = await Team.updateOne({_id}, {$set: data});
            if(result.modifiedCount == 0) throw {status: 500, message: "Team Update Failed", success: false};

            return res.json({
                status: 200,
                message: "Team Updated Successfully",
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
            if(!isValidObjectId(_id)) throw {status:422, message: "Invalid Id", success: false};
            await this.findOne({_id, owner}, Team, "Team");

            const result = await Team.deleteOne({_id});
            if(result.deletedCount == 0) throw {status: 500, success: false, message: "Team Delete Failed"};

            return res.json({
                status: 200,
                success: true,
                message: "Team Deleted Successfully"
            });
        } catch (error) {
            next(error);
        }
    }
    getProject(){}
    async invite(req, res, next){
        try {
            const userId = req.user._id;
            const {username, teamID} = req.params;
            if(!isValidObjectId(teamID)) throw {status: 422, message: "Invalid Team Id"};

            const team = await Team.findOne({
                $or: [{owner: userId}, {users: userId }],
                _id: teamID
            });
            if(!team) throw {status: 404, message: "Team Not Found", success:false};
            
            const user = await User.findOne({username});
            if(!user) throw {status: 404, message: "User Not Found", success: false};

            const userInvited = await Team.findOne({
                $or: [{owner: user._id}, {users: user._id}],
                _id: team._id
            });
            if(userInvited) throw {status: 400, message: "User Already Invited", success: false};

            const request = {
                caller: req.user.username,
                teamID,
                status: 'pending'
            }

            const result = await User.updateOne({username}, {
                $push: {inviteRequests: request}
            });

            if(result.modifiedCount == 0) throw {status: 500, message: "User Invite Failed", success: false};
            return res.status(201).json({
                message: "User Invited Successfully",
                status: 201,
                success: true
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports ={
    TeamController: new TeamController()
}