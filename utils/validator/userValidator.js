const { body } = require("express-validator");
const bcrypt = require("bcryptjs");

const validator = [
    body('email').trim().isEmail(),
    body('password').trim().customSanitizer(async value=>{
        const salt = await bcrypt.genSalt();
        newPass = await  bcrypt.hash(value,salt);
        return newPass;
    })
]

module.exports = validator;