const express = require("express")
const  router = express.Router()
const authController = require("../controller/auth")

router.post("/sign-up",authController.signUp)
router.post("/login",authController.login)
router.get("/confirm/:token",authController.confirmAccount)
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);
router.post('/login-with-google', authController.signUpLoginWithGoogle);

module.exports = router