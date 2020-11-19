const { Cart } = require("../models/index.js")

function authorization(req, res, next){
    const id  = +req.params.id
    console.log({IDCART: id});
    Cart.findOne({
        where:  {id}
    })
    .then(data => {
        console.log({CARTKU: data});
        console.log(req.loggedInUser.role, 'dari unauthorization');
        if(!data){
            console.log("Cart not found");
            throw{ message : 'Cart not found', status: 404}
        } else if (req.loggedInUser.role === 'customer'){
            next()
        } else {
            console.log("message: 'Unauthorized', status: 401");
            throw { message: 'Unauthorized', status: 401}
        }
    })
    .catch( err => {
        console.log({ERRRR: err});
        next(err)
    })
}

module.exports = authorization