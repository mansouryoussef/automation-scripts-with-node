const puppeteer = require('puppeteer');
const fs = require('fs');

module.exports = async () => {
	const browser = await puppeteer.launch({
		// headless: false
	});
	const page = await browser.newPage();

	const url =
		'https://opiskelija.peppi.vamk.fi/group/opiskelijan-tyopoyta/suoritusote';

	const username = process.env.PEPPI_USERNAME;
	const password = process.env.PEPPI_PASSWORD;

	console.log('Logging into peppi account..');

	await page.goto(url, { waitUntil: 'networkidle0' });

	await page.type('#username', username);

	await page.type('#password', password);

	await page.keyboard.press('Enter');

	await page.waitForSelector('button#yesbutton');

	await page.click('#yesbutton');

	await page.waitForNavigation();

	console.log('Logged in!');

	const data = await page.evaluate(() => {
		console.log('Scraping data..');

		const courseUnits = document.querySelectorAll('.course_unit');

		let data = [];

		const totalCr = document
			.querySelector('.transcript-entitlement-div h4 span.small')
			.textContent.split(' ')
			.slice(-1)
			.pop();

		data.push({ totalCr });

		courseUnits.forEach(course => {
			const name = course.getElementsByTagName('td')[2].textContent.trim();
			const scope = course.getElementsByTagName('td')[4].textContent;
			const grade = course.getElementsByTagName('td')[5].textContent;

			data.push({
				name,
				scope,
				grade
			});
		});
		return data;
	});

	// createJSONFile('courseInfo', data);

	console.log('Got the data!');

	await page.close();

	return data;
};

const createJSONFile = (name, data) =>
	fs.writeFile(`${name}.json`, JSON.stringify(data), err => {
		if (err) {
			return console.log(err);
		}

		console.log('JSON file created!');
	});
