const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(userName, email, cart, id) {
    (this.name = userName),
      (this.email = email),
      (this.cart = cart),
      (this._id = id);
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then(result => console.log("User", result))
      .catch(err => console.log(err));
  }

  addToCart(product) {
    const updateCart = { items: [{ ...product, quantity: 1 }] };
    const db = getDb();
    db.collection("user").updateOne(
      { _id: new mongodb.ObjectId(this._id) },
      {$set: {card: updateCart,}}
    );
  }

  static findById(userId) {
    const db = getDb();
    return db
      .collection("users")
      .findOne({ _id: new mongodb.ObjectId(userId) })
      .then(user => {
        console.log("fetchUserByID", user);
        return user;
      })
      .catch(err => console.log(err));
  }
}

module.exports = User;
