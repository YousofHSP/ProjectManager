const {ProjectController} = require('../app/Http/Controllers/ProjectController');
const { checkLogin } = require('../app/Http/Middlewares/autoLogin');
const { expressValidatorMapper } = require('../app/Http/Middlewares/checkErrors');
const { storeProjectValidateion } = require('../app/Http/Validations/ProjectValidation');
const { uploadFile } = require('../app/Modules/express-fileupload');
const fileupload = require('express-fileupload');
const router = require('express').Router()

router.get('/', 
    checkLogin,
    ProjectController.index
);

router.post('/', 
    checkLogin, 
    fileupload(), 
    storeProjectValidateion(), 
    expressValidatorMapper, 
    uploadFile,
    ProjectController.store
);

module.exports = {
    ProjectRouter: router
}