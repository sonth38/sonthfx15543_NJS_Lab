const productsController = require('../controllers/product')

const express = require('express')

const router = express.Router()

router.get('/',productsController.getProduct)

module.exports = router