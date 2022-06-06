class UserController{
    getProfile(req, res, next){
        try {
            const user = req.user;
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
    updateProfile(){}
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