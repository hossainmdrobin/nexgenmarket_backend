const { fail } = require("../../utils/responseFormatter")

exports.createOrder = async(req, res, next) => {
    try{

    }catch(e){
        res.status(500).json(fail(e.message));
    }
}