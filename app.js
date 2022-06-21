const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

// CSRF
const csrf = require('csurf')

const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const mongoConnect = require("./util/database").mongoConnect;
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://root:3893@cluster0.oiywn.mongodb.net/shop?retryWrites=true&w=majority';


const app = express();

// Thiết lập lưu trữ session trong mongoDb
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});

const csrfProtection = csrf()

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Sử dụng middleware session
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use(csrfProtection)

// Sử dụng 1 middleware user để gửi req.user sang middleware phía sau
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

// mongoConnect(client => {
//   console.log(client);
//   app.listen(3000);
// });

mongoose
  .connect(MONGODB_URI)
  .then(result => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
