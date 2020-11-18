const router = require('express').Router()
const cartRouter = require('./cartRouter')
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
// const CartController = require("../controllers/cartController")
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
// const ProductController = require('../controllers/productController')

// router.post('/login', userController.login)
router.post('/register', userController.register)
router.post('/login', userController.loginCustomer)
// router.get("/carts", CartController.listCart)

router.use(authentication)
router.use('/carts', cartRouter)
router.get('/products', productController.findAll)
router.post('/products', productController.addProduct)

router.put('/products/:id', authorization ,productController.editProduct)
router.delete('/products/:id', authorization, productController.deleteProduct)

module.exports = router