const { Product } = require('../models/index')

class ProductController {
    static findAll(req, res, next){
        const userId = req.loggedInUser.id
        Product.findAll({
            where: {UserId: userId}
        })
        .then( product => {
            
            res.status(200).json(product)
        })
        .catch(err => {
            next(err)
        })
    }

    static addProduct(req, res, next){
        const { name, image_url, price, stock } = req.body
        const UserId = req.loggedInUser.id
        Product.create({
            name,
            image_url,
            price,
            stock,
            UserId
        },{
            returning:true
        })
        .then(todo => {
            res.status(201).json(todo)
        })
        .catch(err => {
            next(err)
        })
    }
    static editProduct(req, res, next){
        const { name, image_url, price, stock} = req.body
        Product.update({
            name,
            image_url,
            price,
            stock
        },
        {
            where: {
                id: +req.params.id
            },
            returning: true
        })
        .then(product => {
            if(product[0] !== 1){
                throw {
                    error: 'nothing updated'
                }
            }
            res.status(200).json(product[1][0])
        })
        .catch(err => {
            next(err)
        })
    }
    static deleteProduct(req, res, next){
        Product.destroy({
            where: {
                id: +req.params.id
            },
            returning: true
        })
        .then(data => {
            res.status(200).json({message: 'success delete product'})
        })
        .catch(err => {
            console.log('erorrr deletee', err)
            next(err)
        })
    }
}


module.exports = ProductController