const { UserController } = require('../app/Http/Controllers/UserController');
const { checkLogin } = require('../app/Http/Middlewares/autoLogin');

const router = require('express').Router()

router.get('/profile', checkLogin, UserController.getProfile);

module.exports = {
    UserRouter: router
}