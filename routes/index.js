const router = require('express').Router()
const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
// const ProductController = require('../controllers/productController')

router.post('/login', userController.login)

router.use(authentication)
router.get('/products', productController.findAll)
router.post('/products', productController.addProduct)

router.put('/products/:id', authorization ,productController.editProduct)
router.delete('/products/:id', authorization, productController.deleteProduct)

module.exports = router