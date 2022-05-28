const Product = require('../models/product')

exports.getAddProduct = (req, res, next)=>{
    res.render('add-product', {
        pageTitle: ' Add Product',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}

exports.postAddProduct = (req, res)=>{
    const product = new Product(req.body.title)
    console.log('postAddProduct', product)
    product.save()
    res.redirect('/')
}

exports.getProduct = (req, res, next)=>{
    const product = Product.fetchAll()
    res.render('shop', {prods:product,
        pageTitle: 'Shop',
        path: '/',
        hasProduct: product.length >0,
        productCSS: true,
        activeShop: true
    })
}