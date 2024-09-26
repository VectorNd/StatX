const express = require("express");
const { UserController } = require("../../controllers");
const router = express.Router();
const { AuthMiddleware } = require('../../middleware')

router.get('/googleOAuth', UserController.googleOAuth);
router.get('/googleOAuth/callback', UserController.googleOAuthCallback);
router.get('/githubOAuth', UserController.githubOAuth);
router.get('/githubOAuth/callback', UserController.githubOAuthCallback);
router.post('/enable2FA', AuthMiddleware.checkUserAuth, UserController.enable2FA);
router.post('/verify2FA', AuthMiddleware.checkUserAuth, UserController.verify2FA);
router.post('/forgotPassword', UserController.forgotPassword);
router.post('/resetPassword/:token', UserController.resetPassword);


module.exports = router;