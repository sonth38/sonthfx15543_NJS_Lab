const MongoDb = require('mongodb')
const getDb = require("../util/database").getDb;

class Product {
  constructor(title, price, description, imageUrl) {
    (this.title = title),
    (this.price = price),
    (this.description = description),
    (this.imageUrl = imageUrl);
  }

  save() {
    const db = getDb();
    return db
      .collection("products")
      .insertOne(this)
      .then(result => console.log("save Product", result))
      .catch(err => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then(product => {
        console.log('fetchAll Product', product)
        return product
      })
      .catch(err => console.log(err));
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({_id: new MongoDb.ObjectId(prodId) })
      .next()
      .then(product => {
        console.log('fetchAll Product', product)
        return product
      })
      .catch(err => console.log(err));
  }
}

module.exports = Product;
