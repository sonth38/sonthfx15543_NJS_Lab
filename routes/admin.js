const path = require('path')

const rootDir = require('../util/path')

const express = require('express')

const router = express.Router()

const product = []

router.get('/add-product',(req, res, next)=>{
    res.render('add-product', { pageTitle: ' Add Product'})
})
router.post('/product',(req, res)=>{
    product.push({title:req.body.title})
    res.redirect('/')
})

exports.routes = router
exports.product = product