const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const errorController = require("./controllers/error");
// const mongoConnect = require("./util/database").mongoConnect;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const User = require("./models/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findById("629d6a86a9dfd36036ec046e")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// mongoConnect(client => {
//   console.log(client);
//   app.listen(3000);
// });

mongoose
  .connect(
    "mongodb+srv://root:3893@cluster0.oiywn.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'Son',
          email: 'sontahvac@gmail.com',
          cart: {
            items: []
          }
        })
      }
      user.save()
    })
    app.listen(3000)
  })
  .catch(err => console.log(err));
