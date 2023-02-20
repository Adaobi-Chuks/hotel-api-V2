const jwt = require("jsonwebtoken");

// check json web token exists & is verified
class Authenticate {
    async authenticate(req, res, next){
        const token = req.header('token');
        if (!token) {
            return res.status(401)
            .send({ 
                success: false, 
                message: 'Access Denied: Token not provided' 
            });
        } else {
            const decodedToken = jwt.verify(token, "secret");
            req.user = decodedToken;
            next();
        }
    }
}
module.exports = new Authenticate();