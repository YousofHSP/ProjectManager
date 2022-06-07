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
router.get('/:id', 
    checkLogin,
    ProjectController.show
);

router.post('/', 
    checkLogin, 
    fileupload(), 
    storeProjectValidateion(), 
    expressValidatorMapper, 
    uploadFile,
    ProjectController.store
);
router.patch('/:id/uploadImage', 
    checkLogin, 
    fileupload(),
    uploadFile,
    ProjectController.uploadImage
);
router.patch('/:id', 
    checkLogin, 
    storeProjectValidateion(), 
    expressValidatorMapper, 
    ProjectController.update
);
router.delete('/:id', 
    checkLogin,
    ProjectController.destroy
);

module.exports = {
    ProjectRouter: router
}