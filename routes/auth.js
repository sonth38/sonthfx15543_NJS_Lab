const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');

const router = express.Router();

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/signup', authController.getSignup);
router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email')
      .custom((value, { req }) => {
        if (value === 'test@test.com') {
          throw new Error('This email address if forbidden');
        }
        return true;
      }),
    body(
      'password',
      'Please enter a password with only number and text and at least 5 characters'
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
	body('confirmPassword').custom((value, { req }) => {
		if (value !== req.body.password) {
			throw new Error('Password have do match')
		}
		return true
	})
  ],
  authController.postSignup
);

router.get('/reset', authController.getReset);
router.post('/reset', authController.postReset);

module.exports = router;
