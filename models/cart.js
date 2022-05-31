const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
  );

module.exports = class Carts {
    static addProduct(id, productPrice) {
        // Lấy thông tin giỏ hàng cũ
        fs.readFile(p, (err, fileContent) =>{
            let cart = { products: [], totalPrice: 0}
            if (!err) {
                cart = JSON.parse(fileContent)
            } else {

            }
            // Phân tích giỏ hàng, tìm sản phẩm đã thêm vào giỏ
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            console.log('cartModel',cart.products)
            const existingProduct = cart.products[existingProductIndex]
            let updateProduct
            // Thêm sản phẩm / tăng slg
            if (existingProduct) {
                updateProduct = {...existingProduct}
                updateProduct.qty = updateProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updateProduct;
            } else {
                updateProduct = { id: id, qty: 1}
                cart.products = [...cart.products, updateProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err)
            })
        })
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) =>{
            if (err) {
                return
            }
            const updateCart = { ...JSON.parse(fileContent)}
            const product = updateCart.products.find(prod => prod.id === id) // Lấy ra product có ID cần delete
            const productQty = product.qty                                      // Lấy ra số lượng của product cần delete
            updateCart.products = updateCart.products.filter(prod => prod.id !== id)   // Cập nhật lại product trong Cart
            updateCart.totalPrice = updateCart.totalPrice - productQty*productPrice
            fs.writeFile(p, JSON.stringify(updateCart), err => {
                console.log(err)
            })
        })
    }

    static getCart (cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                cb(null);
            } else {
                const cart = JSON.parse(fileContent)
                cb(cart);
            }
        })
    }
}