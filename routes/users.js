// users path
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { check } = require('express-validator');

// create user
// api/users
router.post(
	'/',
	[
		check('email', 'Add a valid email').isEmail(),
		check('name', 'Add a valid Name').not().isEmpty(),
		check('lastName', 'Add a valid last Name').not().isEmpty(),
		check('tel', 'Add a valid number phone').isNumeric().isLength({ max: 9 }),
		check('birthday', 'Add a valid date').isDate(),
		check('district', 'Add a valid date').not().isEmpty(),
		check('password', 'Add a minimum password of 6 characters').isLength({
			min: 6,
		}),
	],
	userController.createUser
);

module.exports = router;
