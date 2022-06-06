const {AuthController} = require('../app/Http/Controllers/AuthController');
const { expressValidatorMapper } = require('../app/Http/Middlewares/checkErrors');
const { registerValidator } = require('../app/Http/Validations/AuthValidation');

const router = require('express').Router()

router.post('/register', registerValidator(), expressValidatorMapper, AuthController.register)

module.exports = {
    AuthRouter: router
}