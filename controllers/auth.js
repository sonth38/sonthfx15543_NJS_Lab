const crypto = require('crypto');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const { validationResult } = require('express-validator')

// config mail server
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        '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',
    },
  })
);

exports.getLogin = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message;
  } else {
    message = null;
  }
  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    errorMessage: message,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/login');
      }
      bcrypt.compare(password, user.password).then(doMatch => {
        if (doMatch) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save(err => {
            console.log(err);
            res.redirect('/');
          });
        }
        req.flash('error', 'Invalid email or password.');
        res.redirect('/login');
      });
    })
    .catch(err => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getSignup = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message;
  } else {
    message = null;
  }
  res.render('auth/signup', {
    pageTitle: 'Signup',
    path: '/signup',
    isAuthenticated: false,
    errorMessage: message,
  });
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  const errors = validationResult(req)
  
  if (!errors.isEmpty()) {
    console.log(errors.array())
    return res.status(442).render('auth/signup', {
      pageTitle: 'Signup',
      path: '/signup',
      errorMessage: errors,
    });
  }
  User.findOne({ email: email })
    .then(userDoc => {
      if (userDoc) {
        req.flash(
          'error',
          'E-Mail exists already, please pick a different one.'
        );
        return res.redirect('/signup');
      }
      return bcrypt.hash(password, 12).then(hashPassword => {
        const user = new User({
          email: email,
          password: hashPassword,
          cart: { item: [] },
        });
        return user.save();
      });
    })

    .then(result => {
      res.redirect('/login');
        return transporter
          .sendMail({
            to: email,
            from: 'sontahvac@gmail.com',
            subject: 'Signup Succeeded',
            html: '<h1>You successfully signed up</h1>',
          })
          .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.getReset = (req, res, next) => {
  let message = req.flash('error');
  if (message.length > 0) {
    message = message;
  } else {
    message = null;
  }

  res.render('auth/reset', {
    pageTitle: 'Reset Password',
    path: '/reset',
    errorMessage: message,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          req.flash('error', 'No account with that email found!');
          return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save();
      })
      .then(result => {
		res.redirect('/')
        transporter.sendMail({
            to: req.body.email,
            from: 'sontahvac@gmail.com',
            subject: 'Password Reset',
            html: `
				<p>You requested a password reset </p>
				<p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set new password</p>
			`,
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });
};
