const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
    isAuthenticated: req.isLoggedIn
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
    userId : req.user
  });
  product
    .save()
    .then(result => {
      console.log("Created Product");
      res.redirect("/products");
    })
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // Lấy tham số edit trên URL, trả về true, false
  if (!editMode) {
    res.redirect("/");
  }
  const prodId = req.params.productId; // Lấy được productId trên URL
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        res.redirect("/");
      }
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/add-product",
        editing: editMode,
        product: product,
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updateTitle = req.body.title;
  const updateImageUrl = req.body.imageUrl;
  const updatePrice = req.body.price;
  const updateDesc = req.body.description;
  // console.log(updatePrice);

  Product.findById(prodId).then(product => {
    product.title = updateTitle,
    product.price = updatePrice,
    product.description = updateDesc,
    product.imageUrl = updateImageUrl
    return product.save()
  })
    .then(() => {
      console.log("UPDATED PRODUCT!");
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByIdAndRemove(prodId)
    .then(() => {
      console.log("Destroy Product");
      res.redirect("/admin/products");
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.find()
  // .select( 'title price -_id')     // Cách để lấy trường
  // .populate('userId', 'name')      // Cách lấy thêm thông tin chi tiết của trường
    .then(products => {
      console.log('Product  nhận được', products)
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
        isAuthenticated: req.isLoggedIn
      });
    })
    .catch(err => console.log(err));
};
