const { fail } = require("../utils/responseFormatter");

exports.isAuth = async (req, res, next) => {
    try {
        let token;
        if (
          req.headers.authorization &&
          req.headers.authorization.startsWith("Bearer")
        ) {
          token = req.headers.authorization.split(" ")[1];
        } else if (req.cookies?.token) {
          token = req.cookies?.token;
        }
    
        if (!token) {
          return res.status(400).json({ message: "Login first" });
        } else {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          req.user = await PersonalDetail.findById(decoded._id)        
          if (req.user) {
            return next(); //userProfessionalPackageInfo
          } else {
            return res.status(401).json(fail("No user found", 401));
          }
        }
      }catch(e){
        return res.status(500).json(fail(e.message));
      }

}