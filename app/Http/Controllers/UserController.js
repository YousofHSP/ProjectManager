const { User } = require("../../Models/User");
const { generateUrl } = require("../../Modules/functions");

class UserController{
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
                    message: "Profile Update Successfuly"
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
                message: "Image Upload Successfuly",
                success: true,
            });
            
            
        } catch (error) {
            next(error);
        }
    }
    getSkills(){}
    updateSkills(){}
    getTeams(){}
    getProjects(){}
    acceptInviteInTeam(){}
    rejectInvitInTeam(){}
}

module.exports = {
    UserController: new UserController()
}