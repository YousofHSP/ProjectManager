const { generateUrl } = require("../../Modules/functions");
const Resource = require("./Resource");

class UserRes extends Resource{
    handle(data){
        return {
            id: data._id,
            username: data.username,
            mobile: data.mobile,
            roles: data.roles,
            email: data.email,
            skills: data.skills,
            teams: data.teams,
            firstName: data.firstName,
            lastName: data.lastName,
            image: generateUrl(null, data.image)
        }
    }
}

module.exports = {UserRes: new UserRes()}