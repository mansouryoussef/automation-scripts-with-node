const fs = require('fs');

const scraper = require('./utils/scraper');
const sendEmail = require('./utils/sendEmail');
const compareCoursesByGrade = require('./utils/compareCoursesByGrade');
const createHTMLFromCoursesArray = require('./utils/createHTMLFromCoursesArray');
const courseInfo = JSON.parse(fs.readFileSync('courseInfo.json', 'utf8'));
const createJSONFile = require('./utils/createJSONFile');

exports.gradeChecker = () =>
	scraper().then(async courseData => {
		const changedCourses = compareCoursesByGrade(courseData, courseInfo);

		if (changedCourses.length !== 0) {
			console.log('There is an update!');

			const mail = {
				from: 'hello@youssef.fi',
				to: 'contact@youssef.fi',
				subject: 'Course update!',
				html: createHTMLFromCoursesArray(changedCourses)
			};

			createJSONFile('courseInfo', courseData);

			await sendEmail(mail);
		}
		process.exit();
	});
