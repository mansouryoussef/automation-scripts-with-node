const CronJob = require('cron').CronJob;

const checkGrades = require('./utils/checkGrades');

const job = new CronJob('0 8-19/2 * * 1-5', () => {
	// Will execute this code every 2 hoiurs between 8:00 - 19:00 and only on Monday to Friday
	try {
		checkGrades();
	} catch (error) {
		console.log(`There was an error! ${{ error }}`);
	}
});

job.start();
