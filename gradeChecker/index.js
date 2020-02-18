const fs = require('fs');

const scraper = require('./scraper');
const sendEmail = require('./sendEmail');
const courseInfo = JSON.parse(fs.readFileSync('courseInfo.json', 'utf8'));

const compareCourses = (arrayOne, arrayTwo) => {
	let changedCourses = [];

	arrayOne.forEach((el, index) => {
		if (index > 0) {
			if (el.grade !== arrayTwo[index].grade) {
				changedCourses.push(el);
			}
		}
	});

	return changedCourses;
};

scraper().then(courseData => {
	const changedCourses = compareCourses(courseData, courseInfo);

	if (changedCourses.length !== 0) {
		const mail = {
			from: 'hello@youssef.fi',
			to: 'contact@youssef.fi',
			subject: 'Course update!',
			html: `
            <h4>Course changes:</h4>
            <ul>
            ${changedCourses.map(course => {
							return `
                <li>
                <b>Name:</b> ${course.name} - <b>scope:</b> ${course.scope} - <b>Grade:</b> ${course.grade}
                </li>
                `;
						})}
                   
            </ul>
            `
		};

		sendEmail(mail);
	}
});
