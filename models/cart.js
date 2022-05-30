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
}