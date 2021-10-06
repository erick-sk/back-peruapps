const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

exports.createUser = async (req, res) => {
	// check for errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// extracting data register
	const {
		email,
		name,
		lastName,
		tel,
		birthday,
		district,
		password,
		confirmPassword,
	} = req.body;

	if (password !== confirmPassword) {
		return res.status(400).json({ msg: 'Password must match' });
	}

	try {
		// check if user registered be unique
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ msg: 'user already exists' });
		}

		// create new user
		user = new User(req.body);

		// hashing new user
		const salt = await bcryptjs.genSalt(10);
		user.password = await bcryptjs.hash(password, salt);

		// fill schema to db
		user.name = name;
		user.lastName = lastName;
		user.tel = parseInt(`51${tel}`);
		user.birthday = birthday;
		user.district = district;

		// save user
		await user.save();

		// create and tag JWT
		const payload = {
			user: {
				id: user.id,
			},
		};

		// tag JWT
		jwt.sign(
			payload,
			process.env.SECRET,
			{
				expiresIn: 3600, // 1h
			},
			(error, token) => {
				if (error) throw error;

				// confirmation message
				res.json({ token: token });
			}
		);
	} catch (error) {
		console.log(error);
		res.status(400).send('There was an error');
	}
};
