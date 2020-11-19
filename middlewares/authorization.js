const { Product } = require("../models/index.js")

function authorization(req, res, next){
    const id  = +req.params.id
    Product.findOne({
        where:  id
    })
    .then(data => {
        if(!data){
            throw{ message : 'product not found', status: 404}
        } else if (data.UserId === req.loggedInUser.id && req.loggedInUser.role === 'admin'){
            next()
        } else {
            throw { message: 'Unauthorized', status: 401}
        }
    })
    .catch( err => {
        next(err)
    })
}

module.exports = authorization