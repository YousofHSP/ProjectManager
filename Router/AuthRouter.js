const {AuthController} = require('../app/Http/Controllers/AuthController');
const { expressValidatorMapper } = require('../app/Http/Middlewares/checkErrors');
const { registerValidator, loginValidator } = require('../app/Http/Validations/AuthValidation');

const router = require('express').Router()

router.post('/register', registerValidator(), expressValidatorMapper, AuthController.register)
router.post('/login', loginValidator(), expressValidatorMapper, AuthController.login)

module.exports = {
    AuthRouter: router
}