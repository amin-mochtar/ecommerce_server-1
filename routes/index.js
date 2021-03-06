const router = require('express').Router()
const cartRouter = require('./cartRouter')
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
// const CartController = require("../controllers/cartController")
const authenticationCustomer = require('../middlewares/authenticationCuntomer')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
// const ProductController = require('../controllers/productController')

// router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/login', userController.loginCustomer)
// router.get("/carts", CartController.listCart)

router.get('/products', productController.findAll)
router.use(authenticationCustomer)
router.use('/carts', cartRouter)

router.use(authentication)
router.post('/products/admin', productController.addProduct)

router.put('/products/:id', authorization ,productController.editProduct)
router.delete('/products/:id', authorization, productController.deleteProduct)

module.exports = router