const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
	try {
		await mongoose.connect(mongoURI, {
			// Added for DeprecationWarning
			useUnifiedTopology: true,
			useNewUrlParser: true
		});

		console.log('Connected to MongoDB Atlas!');
	} catch (error) {
		console.error(error);
	}
};

module.exports = connectDB;
