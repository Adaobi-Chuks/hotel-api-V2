class Authorize {
    authorizeAdmin(req, res, next){
        console.log(req.body)
        if (req.user.role !== "admin") {
            return res.status(403)
                .send({
                    success: false, 
                    message: 'Access Denied: Unauthorized request'
                })
        }
        next();
    }
}
module.exports = new Authorize();