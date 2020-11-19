const { Cart, Product } = require("../models/index.js")
const nodemailer = require("nodemailer")

class CartController {
    static listCart(req, res, next) {
        console.log('cek masuk');
        const userId = req.loggedInUser.id
        Cart.findAll({
            where: { UserId: userId },
            attributes: {
                include: ['id'],
            },
            include: [{ model: Product }],
        })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                console.log({ err });
                next(err)
            })
    }
    static addToCart(req, res, next) {
        console.log('cek masuk', req.body);
        const UserId = req.loggedInUser.id
        console.log(UserId, 'ini user id')
        const ProductId = req.body.dataProduct.id
        const stock = req.body.dataProduct.stock
        Cart.findOne({
            where: {ProductId, UserId}
        }).then(cart => {
            console.log(cart, stock, 'ini stock dan cart');
            if (!cart) {
                return Cart.create({
                    ProductId,
                    UserId,
                    quantity: 1,
                })
            } else {
                if (stock > cart.quantity) {
                    return Cart.increment({
                        quantity: +1
                    }, {
                        where: {
                            ProductId,
                            UserId
                        }
                    })
                } else {
                    throw 'Stok Habis'
                }
            }
        }).then(updatedCart => {
            // console.log(updatedCart, 'ini dari add to cart');
            res.status(201).json(updatedCart)
        }).catch((err) => {
            console.log('gagal add to cart', err);
            next(err)
        });
    }

    static updateQuantity(req, res, next) {
        const id = req.params.id
        console.log(id, 'server update quantity');
        Cart.findOne({
            where: {id: id},
            include: [Product]
        })
            .then(data => {
                console.log('stock product', data.Product.stock);
                console.log('dari update', data);
                if (data.Product.stock < req.body.quantity) {
                    return res.status(403).json({
                        message: `stock barang hanya ${data.Product.stock}`
                    })
                } else {
                    return Cart.update({
                        quantity: req.body.quantity
                    }, {
                        where: {
                            id: req.params.id
                        }
                    })
                }
            }).then(data => {
                res.status(200).json(data)
            }).catch((err) => {
                console.log('masuk erorr update quantity', err);
                next(err)
            });

    }

    static delete(req, res, next) {
        let id = req.params.id
        console.log(id, 'body delete carttttttttttttttt');

        Cart.destroy({
            where: { id: id }
        })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = CartController