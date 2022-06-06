const { AuthRouter } = require('./AuthRouter');
const { ProjectRouter } = require('./ProjectRouter');
const { TeamRouter } = require('./TeamRouter');
const { UserRouter } = require('./UserRouter');

const router = require('express').Router()

router.use('/auth', AuthRouter);
router.use('/users', UserRouter);
router.use('/projects', ProjectRouter);
router.use('/teams', TeamRouter);

module.exports = {
    router
}