const { signup, verifyEmail, resendEmail, login } = require("../../controller/user/registerController");
const userValidator = require("./../../utils/validator/userValidator")

const router = require("express").Router();

// SIGNUP AND VERIFY EMAIL
router.post('/signup',userValidator,signup);
router.post('/verify',verifyEmail);
router.post("/resend_email",resendEmail);

// LOGIN
router.post("/login",login);

module.exports = router;
