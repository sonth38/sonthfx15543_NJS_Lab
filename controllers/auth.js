exports.getLogin = (req, res, next) => {
//   const isLoggedIn = req.get('Cookie').trim('').split('=')[1] === 'true';

  res.render('auth/login', {
    pageTitle: 'Login',
    path: '/login',
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  res.setHeader('Set-cookie', 'loggedIn=true; Max-Age= 10');
  res.redirect('/');
};
