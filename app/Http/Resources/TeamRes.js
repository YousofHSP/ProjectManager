const autoBind = require("auto-bind");
const Resource = require("./Resource");
const { UserRes } = require("./UserRes");

class TeamRes extends Resource{

    handle(data){
        return {
            id: data._id,
            name: data.name,
            description: data.description,
            username: data.username,
            users: UserRes.collection(data.users),
            owner: UserRes.handle(data.owner),
            createdAt: data.createdAt
        }
    }

    
}

module.exports ={
    TeamRes: new TeamRes()
}