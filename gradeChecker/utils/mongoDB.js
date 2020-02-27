const Course = require('../models/course');

const getAllCourses = async () => {
	try {
		const allCourses = await Course.find();

		return allCourses;
	} catch (error) {
		console.log(error);
	}
};

const updateCourseByName = async (name, update) => {
	await Course.updateOne({ name }, update);

	console.log(`${name} has been updated!`);
};

const updateDatabase = async changedCoursesArray => {
	try {
		console.log('Updating database..');

		changedCoursesArray.forEach(async changedCourse => {
			const { name } = changedCourse;

			await updateCourseByName(name, changedCourse);
		});
	} catch (error) {
		console.log(error);
	}
};

module.exports = { getAllCourses, updateDatabase };
