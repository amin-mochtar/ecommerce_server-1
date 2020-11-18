const { Cart, Product } = require("../models/index.js")
const nodemailer = require("nodemailer")

class CartController {
    static listCart(req, res) {
        const userId = req.loggedInUser.id
        Cart.findAll({
            where: { UserId: userId },
            include: [{ model: Product }]
        })
            .then(product => {
                res.status(200).json(product)
            })
            .catch(err => {
                next(err)
            })
    }
    static addToCart(req, res, next) {
        const userId = req.loggedInUser.id
        const ProductId = req.params.id
        Cart.findOne({
            where: {
                ProductId,
                UserId: userId
            }
        }).then(cart => {
            if (!cart) {
                return Cart.create({
                    ProductId,
                    UserId: userId,
                    quantity: 1
                })
            } else {
                return Cart.increment({
                    quantity: +1
                }, {
                    where: {
                        ProductId,
                        UserId: userId
                    }
                })
            }
        }).then(updatedCart => {
            res.status(201).json(updatedCart)
        }).catch((err) => {
            next(err)
        });
    }

    static updateQuantity(req, res, next) {
        const id = req.body.id
        Product.findOne({
            where: id
        })
            .then(data => {
                if (data.stock < req.body.quantity) {
                    return res.status(403).json({
                        message: `stock barang hanya ${data.stock}`
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
                next(err)
            });

    }

    static delete(req, res) {
        let id = +req.params.id

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

    static addQuantity(req, res) {
        let cartId = +req.params.id
        // console.log('AAA', cartId)

        Cart.findOne({
            where: { id: cartId }
        })
            .then(data => {
                return Cart.update({ UserId: data.UserId, ProductId: data.ProductId, quantity: data.quantity + 1 }, { where: { id: cartId } })
            })
            .then(dataCart => {
                res.status(200).json(dataCart)
            })
            .catch(err => {
                next(err)
            })
    }

    static reduceQuantity(req, res) {
        let cartId = +req.params.id

        Cart.findOne({
            where: { id: cartId }
        })
            .then(data => {
                return Cart.update({ UserId: data.UserId, ProductId: data.ProductId, quantity: data.quantity - 1 }, { where: { id: cartId } })
            })
            .then(dataCart => {
                res.status(200).json(dataCart)
            })
            .catch(err => {
                next(err)
            })
    }
    // static checkout(req, res) {
    //     let email = ull
    //     var transporter = nodemailer.createTransport({
    //         service: 'gmail',
    //         auth: {
    //             user: 'projectamin123@gmail.com',
    //             pass: 'Amin1234'
    //         }
    //     });

    //     var mailOptions = {
    //         from: 'projectamin123@gmail.com',
    //         to: `${email}`,
    //         subject: 'Pembelian Produk',
    //         text: 'Terima kasih!'
    //     };

    //     transporter.sendMail(mailOptions, function (error, info) {
    //         if (error) {
    //             res.redirect(`/carts`, { carts: [] })
    //         } else {
    //             let userId = 
    //             let user = : null
    //             Cart.destroy({
    //                 where: { UserId: userId }
    //             })
    //                 .then(data => {
    //                     res.render("sendMail.ejs", { email, user })
    //                 })
    //                 .catch(err => {
    //                     res.send(err)
    //                 })
    //         }
    //     });
    // }
}

module.exports = CartController