const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	scope: {
		type: String,
		required: true
	},
	grade: {
		type: String
	}
});

// Export a new variable with a model that takes the name and the schema
module.exports = Course = mongoose.model('course', CourseSchema);
