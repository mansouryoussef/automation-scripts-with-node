const puppeteer = require('puppeteer');

const createGithubRepo = async projectName => {
	const username = process.env.GITHUB_USERNAME;
	const password = process.env.GITHUB_PASSWORD;

	const browser = await puppeteer
		.launch
		// { headless: false } uncomment if your want to see the browser run live
		();
	const page = await browser.newPage();

	await page.goto('https://github.com/login', { waitUntil: 'networkidle0' });

	await page.type('#login_field', username);

	await page.type('#password', password);

	await page.keyboard.press('Enter');

	await page.waitForNavigation();

	await page.goto('https://github.com/new');

	await page.type('[name="repository[name]"]', projectName);

	await page.waitFor(2000);

	await page.keyboard.press('Enter');

	await page.waitForNavigation();

	const addRemoteRepo = await page.evaluate(
		() =>
			document.querySelectorAll(
				'#empty-setup-new-repo-echo .user-select-contain'
			)[4].textContent
	);

	console.log(`Retrived command: ${addRemoteRepo}`);

	await browser.close();

	return addRemoteRepo;
};

module.exports = createGithubRepo;
