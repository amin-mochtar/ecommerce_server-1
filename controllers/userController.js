const { User } = require('../models/index.js')
const { generateToken } = require('../helper/jwt')
const {comparePassword } = require('../helper/bcrypt')

class UserController {
    static register(req, res, next){
        const {email, password, role} = req.body
        User.create({
            email,
            password,
            role:'customer'
        })
        .then(user => {
            res.status(201).json({
                id: user.id,
                email:user.email,
                role: user.role
            })
        })
        .catch(err => {
            next(err)
        })
    }
    static loginCustomer(req, res) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }

        User.findOne({
            where: {
                email: payload.email,
                role: 'customer' 
            }
        })
            .then(user => {
                if (!user) {
                    res.status(401).json({
                        message: 'wrong email/password'
                    })
                } else if (!comparePassword(payload.password, user.password)) {
                    res.status(401).json({
                        message: 'wrong email/password'
                    })
                } else {
                    const access_token = generateToken({
                        id: user.id,
                        email: user.email
                    })
                    res.status(200).json({
                        access_token: access_token,
                        email: user.email
                    })
                }
            })
            .catch(err => {
               next(err)
            })
    }
    static login(req, res) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }

        User.findOne({
            where: {
                email: payload.email 
            }
        })
            .then(user => {
                if (!user) {
                    res.status(401).json({
                        message: 'wrong email/password'
                    })
                } else if (!comparePassword(payload.password, user.password)) {
                    res.status(401).json({
                        message: 'wrong email/password'
                    })
                } else {
                    const access_token = generateToken({
                        id: user.id,
                        email: user.email
                    })
                    res.status(200).json({
                        access_token: access_token,
                        email: user.email
                    })
                }
            })
            .catch(err => {
               next(err)
            })
    }
}

module.exports = UserController