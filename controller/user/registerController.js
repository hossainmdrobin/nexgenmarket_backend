const UserModel = require("../../models/user/user");
const { fail } = require("../../utils/responseFormatter");

exports.signup = async (req, res, next) => {
    try{
        const user = await UserModel.create(req.body);
        // save otp
        // send mail
        
        
        

    }catch(e){
        res.status(500).json(fail(e.message));
    }
};
