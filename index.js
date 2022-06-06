const Application = require('./app/server');
const DBURL = "mongodb://localhost:27017/ProjectManagerDB";
require('dotenv').config();
global.config = require('./config');
new Application(config.prot, DBURL);