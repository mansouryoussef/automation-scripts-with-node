const fs = require('fs');

module.exports = (name, data) =>
	fs.writeFile(`${name}.json`, JSON.stringify(data), err => {
		if (err) {
			return console.log(err);
		}

		console.log('JSON file is updated!');
	});
