const product = []

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
    product.push({title:req.body.title})
    res.redirect('/')
}

exports.getProduct = (req, res, next)=>{
    res.render('shop', {prods:product,
        pageTitle: 'Shop',
        path: '/',
        hasProduct: product.length >0,
        productCSS: true,
        activeShop: true
    })
}