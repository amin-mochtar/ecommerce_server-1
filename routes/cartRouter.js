const router = require("express").Router()
const CartController = require("../controllers/cartController")
const authorization = require('../middlewares/authorizationCustomer.js')

router.get("/", CartController.listCart)

router.post("/:id", authorization, CartController.addToCart)

router.put("/:id", authorization, CartController.addQuantity)

router.delete("/:id", authorization, CartController.delete)
// router.patch("/checkout", authorization, CartController.checkout)


module.exports = router