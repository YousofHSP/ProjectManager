const Application = require('./app/server');
const DBURL = "mongodb://localhost:27017/ProjectManagerDB";
new Application(3500, DBURL);