const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// mongodb connection
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useFindAndModify: false,
		});
		console.log('DB connected!');
	} catch (error) {
		console.log(error);
		process.exit(1); // stop app
	}
};

module.exports = connectDB;
