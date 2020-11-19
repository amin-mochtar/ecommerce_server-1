const { User } = require('../models/index.js');
const { verifyToken } = require("../helper/jwt.js");


function authentication(req, res, next){
    const { access_token } = req.headers;

    if(!access_token){
        throw {
            message: "authentication failed"
        }
    }else {
        const decoded  = verifyToken(access_token);

        User.findOne({
            where: {
                email: decoded.email
            }
        })
        .then(user => {
            // console.log({USERRR: user});
            if(user.role !== 'customer' || user.role === undefined){
                console.log('INI bukan CUSTOMER');
                throw {message: "user not found"}
            } else {
                req.loggedInUser = decoded
                
                next()
            }
        })
        .catch(err => {
            
            next(err)
        })
    }
}

module.exports = authentication 