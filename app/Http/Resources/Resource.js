const autoBind = require("auto-bind");

module.exports = class Resource {
    constructor(){
        autoBind(this);
    }
    collection(data){
        return data.map(item => this.handle(item));
    }
}