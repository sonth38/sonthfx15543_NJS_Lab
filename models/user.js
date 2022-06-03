const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class User {
  constructor(userName, email) {
    (this.name = userName), (this.email = email);
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .then(result => console.log("User", result))
      .catch(err => console.log(err));
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
