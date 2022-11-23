const express = require('express');
const authRouter  = express.Router();
const authController = require('../controllers/auth-controller');
const jwtHelper = require('../config/jwtHelper');

authRouter.post('/register', authController.register);
authRouter.post('/authenticate', authController.authenticate)
authRouter.get('/userProfile',jwtHelper.verifyJwtToken, authController.userDetails);


module.exports = authRouter;