const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description
  })
    .then(result => {
      console.log(result)
      res.redirect('/products')
    })
    .catch(err => console.log(err))

};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; /* Lấy tham số edit trên URL, trả về true, false  */
  if (!editMode) {
    res.redirect('/')
  }
  const prodId = req.params.productId /* Lấy được productId trên URL */
  Product.findByPk(prodId)
    .then(product => {
        if (!product) {
          res.redirect('/')
        }
        res.render('admin/edit-product', {
          pageTitle: 'Edit Product',
          path: '/admin/add-product',
          editing: editMode,
          product: product
        });
    })
    .catch(err => console.log(err))
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updateTitle = req.body.title
  const updateImageUrl = req.body.imageUrl
  const updatePrice = req.body.price
  const updateDesc = req.body.description
  console.log(updatePrice)
  Product.findByPk(prodId)
    .then(product => {
      product.title = updateTitle,
      product.imageUrl = updateImageUrl,
      product.price = updatePrice,
      product.description = updateDesc
      return product.save()
    })
    .then(result => {
      console.log(result)
      res.redirect('/products')
    })
    .catch(err => console.log(err))
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findByPk(prodId)
    .then(product => {
      return product.destroy()
    })
    .then(() => {
      console.log('Destroy Product')
      res.redirect('/admin/products')
    })
    .catch(err => console.log(err))
}

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(product => {
      res.render('admin/products', {
        prods: product,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => console.log(err));

};
