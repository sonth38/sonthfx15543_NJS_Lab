const db = require('../util/database')

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {


  save() {
  }

  static deleteById(id) {
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products')
  }

  static findById(id, cb) {
  }
};
