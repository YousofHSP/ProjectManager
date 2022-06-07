const { UserController } = require('../app/Http/Controllers/UserController');
const { checkLogin } = require('../app/Http/Middlewares/autoLogin');
const { expressValidatorMapper } = require('../app/Http/Middlewares/checkErrors');
const { imageValidator } = require('../app/Http/Validations/UserValidation');
const { uploadMulter } = require('../app/Modules/multer');

const router = require('express').Router()

router.get('/profile', 
    checkLogin, 
    UserController.getProfile
);

router.patch('/profile', 
    checkLogin, 
    UserController.updateProfile
);

router.put('/profile-image', 
    checkLogin, 
    uploadMulter.single('image'), 
    imageValidator(), 
    expressValidatorMapper, 
    UserController.uploadProfileImage
);

module.exports = {
    UserRouter: router
}