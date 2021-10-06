const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authUser = async (req, res) => {
	// check for errors
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	// extracting email and password
	const { email, password } = req.body;

	try {
		// Check if registered user
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ msg: 'User no exist!' });
		}

		// Check pass
		const validPass = await bcryptjs.compare(password, user.password);
		if (!validPass) {
			return res.status(400).json({ msg: 'Invalid password!' });
		}

		// All right
		// Create and tag JWT
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

				// Confirmed Message
				res.json({ token });
			}
		);
	} catch (error) {
		console.log(error);
	}
};
