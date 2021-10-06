const moongose = require('mongoose');

const UserSchema = moongose.Schema({
	name: {
		type: String,
		require: true,
		trim: true,
	},
	lastName: {
		type: String,
		require: true,
		trim: true,
	},
	email: {
		type: String,
		require: true,
		trim: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	bio: {
		type: String,
		trim: true,
	},
	birthday: {
		type: Date,
		require: true,
	},
	tel: {
		type: Number,
		require: true,
		trim: true,
	},
	district: {
		type: String,
		enum: ['La Molina', 'San Isidro', 'Miraflores'],
		require: true,
	},
	program: {
		type: String,
		enum: ['Full Stack', 'Frontend', 'Backend'],
	},
	register: {
		type: Date,
		default: Date.now,
	},
});

module.exports = moongose.model('User', UserSchema);
