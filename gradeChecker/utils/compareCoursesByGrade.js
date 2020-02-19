module.exports = (courseArrayOne, courseArrayTwo) => {
	let changedCourses = [];

	courseArrayOne.forEach((el, index) => {
		if (index > 0) {
			if (el.grade !== courseArrayTwo[index].grade) {
				changedCourses.push(el);
			}
		}
	});

	return changedCourses;
};
