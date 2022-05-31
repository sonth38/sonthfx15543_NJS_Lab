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
  const product = new Product(null, title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; /* Lấy tham số edit trên URL, trả về true, false  */
  if (!editMode) {
    res.redirect('/')
  }
  const prodId = req.params.productId /* Lấy được productId trên URL */
  Product.findById(prodId, product => {
    console.log(product)
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
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updateTitle = req.body.title
  const updateImageUrl = req.body.imageUrl
  const updatePrice = req.body.price
  const updateDesc = req.body.description
  const updateProduct = new Product(prodId, updateTitle, updateImageUrl, updateDesc, updatePrice)
  updateProduct.save()
  res.redirect('/admin/products')
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
