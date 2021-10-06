// auth router
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');

// Create user
// api/auth
router.post('/', [
	check('email', 'Add a valid email').isEmail(),
	check('password', 'Add a minimum password of 6 characters ').isLength({
		min: 6,
	}),
	authController.authUser,
]);

module.exports = router;
