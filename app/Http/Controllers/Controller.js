const autoBind = require("auto-bind");

module.exports = class Controller {
    constructor(){
        autoBind(this)
    }
    async findOne(params, model, modelName){
        const result = await model.findOne(params);
        if(!result) throw {status: 404, success: false, message: `${modelName} Not Found`};
        return result;
    }
}

