#!/usr/bin/env node

const fs = require('fs');
var path = require('path');

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const createGithubRepo = require('./scrapers');

const [...args] = process.argv;

const projectName = args[2].toLowerCase();

const projectsFolder = path.join(__dirname, '../../../Projects');

const appFolder = path.join(projectsFolder, `./${projectName}`);

fs.mkdirSync(appFolder);

(async () => {
	try {
		console.log('Creating react app..');

		await exec(`npx create-react-app .`, {
			cwd: appFolder
		});

		console.log('React app created!');

		const addRemoteRepo = await createGithubRepo(projectName);
		const firstPush = 'git push -u origin master';

		await exec(addRemoteRepo, { cwd: appFolder });
		await exec(firstPush, { cwd: appFolder });

		console.log(`Remote repo added to project!`);

		await exec('code .', { cwd: appFolder });

		console.log('Editer opened, Enjoy!');
	} catch (error) {
		console.log(error);
	}
})();
