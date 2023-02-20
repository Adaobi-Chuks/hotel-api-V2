const {ENUM, MESSAGES} = require("../constants/constants");

class Authorize {
    authorizeAdmin(req, res, next){
        console.log(req.body)
        if (req.user.role !== ENUM.ADMIN) {
            return res.status(403)
                .send({
                    success: false, 
                    message: MESSAGES.AUTH.DENIED
                })
        }
        next();
    }
}
module.exports = new Authorize();