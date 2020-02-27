const connect = require('./config/db');
const scraper = require('./utils/scraper');
const sendEmail = require('./utils/sendEmail');
const compareCoursesByGrade = require('./utils/compareCoursesByGrade');
const { getAllCourses, updateDatabase } = require('./utils/mongoDB');
const createHTMLFromCoursesArray = require('./utils/createHTMLFromCoursesArray');

(async () => {
	await connect();

	const vamkCourseData = await scraper();
	const coursesInDatabase = await getAllCourses();

	// Remove total credits from vamkCourseData array & save it in a variable.
	const totalCredits = vamkCourseData.shift().totalCr;

	const changedCourses = compareCoursesByGrade(
		vamkCourseData,
		coursesInDatabase
	);

	if (changedCourses.length !== 0) {
		console.log('There is an update!');

		await updateDatabase(changedCourses);

		const mail = {
			from: 'hello@youssef.fi',
			to: 'contact@youssef.fi',
			subject: 'Course update!',
			html: createHTMLFromCoursesArray(changedCourses)
		};

		await sendEmail(mail);
	} else {
		console.log(`No change in coures!
Current cr count: ${totalCredits}`);
	}

	process.exit();
})();
