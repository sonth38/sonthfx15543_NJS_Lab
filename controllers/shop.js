const Product = require("../models/product");
const user = require("../models/user");
const Order = require("../models/order");

exports.getProducts = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products"
      });
    })
    .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render("shop/product-detail", {
        product: product,
        pageTitle: product.title,
        path: "/products"
      });
    })
    .catch(err => console.log(err));

  // Product.findByPk(prodID)
  // .then((product) => {
  //   console.log(product)
  //   res.render('shop/product-detail', {
  //     product: product,
  //     pageTitle: product.title,
  //     path: '/products'
  //   })
  // })
  // .catch(err => console.log(err))
};

exports.getIndex = (req, res, next) => {
  Product.find()
    .then(products => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/"
      });
    })
    .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user
    .populate(['cart.items.productId'])
    .then(user => {
      const products = user.cart.items
      // console.log(products)
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products
      });
    })
    .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      // console.log("Product nhận được", product);
      return req.user.addCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect("/cart");

    })
    .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  console.log('id xóa',prodId)
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  Order.find({'user.userId': req.user._id})
    .then(orders => {
      res.render("shop/orders", {
        path: "/orders",
        pageTitle: "Your Orders",
        orders: orders
      });
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    // .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc}}
      })
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      })
      return order.save()
    })
    .then(() => {
      req.user.clearCart()
    })
    .then(result => {
      res.redirect("/orders");
    })
    .catch(err => console.log(err));
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout"
  });
};
