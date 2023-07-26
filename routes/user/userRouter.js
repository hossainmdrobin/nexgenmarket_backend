const { signup, verifyEmail, resendEmail, login } = require("../../controller/user/registerController");

const router = require("express").Router();

// SIGNUP AND VERIFY EMAIL
router.post('/signup',signup);
router.post('/verify',verifyEmail);
router.post("/resend_email",resendEmail);

// LOGIN
router.post("/login",login);

module.exports = router;
