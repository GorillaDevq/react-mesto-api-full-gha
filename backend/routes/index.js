const rootRouter = require('express').Router();
const cardRouter = require('./card');
const userRouter = require('./user');

rootRouter.use('/', cardRouter);
rootRouter.use('/', userRouter);

module.exports = rootRouter;
