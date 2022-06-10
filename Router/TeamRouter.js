const { TeamController } = require('../app/Http/Controllers/TeamController');
const { checkLogin } = require('../app/Http/Middlewares/autoLogin');
const { expressValidatorMapper } = require('../app/Http/Middlewares/checkErrors');
const { teamValidation } = require('../app/Http/Validations/TeamValidation');

const router = require('express').Router()

router.get('/', checkLogin, TeamController.index);
router.get('/:id', checkLogin, TeamController.show);
router.delete('/:id', checkLogin, TeamController.destroy);
router.patch('/:id', checkLogin, TeamController.update);
router.post('/', 
    checkLogin,
    teamValidation(),
    expressValidatorMapper,
    TeamController.store
);
router.post('/:teamID/invite/:username', checkLogin, TeamController.invite);

module.exports = {
    TeamRouter: router
}