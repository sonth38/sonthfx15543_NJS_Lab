const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
// CSRF
const csrf = require('csurf');
// flash thông báo
const flash = require('connect-flash')
const multer = require('multer');

const errorController = require('./controllers/error');
const User = require('./models/user');

const MONGODB_URI =
  'mongodb+srv://root:3893@cluster0.oiywn.mongodb.net/shop?retryWrites=true&w=majority';

const app = express();

// Thiết lập lưu trữ session trong mongoDb
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
});
const csrfProtection = csrf();

// Cấu hình nhận file
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'image')
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString()+ '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))

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

app.use(csrfProtection);
app.use(flash())

// Sử dụng 1 middleware user để gửi req.user sang middleware phía sau
app.use((req, res, next) => {
  // throw new Error('Sync DUMMY')

  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      if (!user) {
        return next()
      }
      req.user = user;
      next();
    })
    .catch(err => {
      next(new Error(err)) 
    });
});

// Truyền scrf cho các routes, view
app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn,
	res.locals.csrfToken = req.csrfToken()
	next()
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500)
app.use(errorController.get404);

app.use((error, req, res, next) => {
  // res.redirect('/500')
  res.status(500).render('500', {
    pageTitle: 'Error!',
    path: '/500',
    isAuthenticated: req.isLoggedIn
});
})
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
