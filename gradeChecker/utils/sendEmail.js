const nodemailer = require('nodemailer');

const user = process.env.EMAIL_USERNAME;
const pass = process.env.EMAIL_PASSWORD;

const mailserver = {
	host: 'smtp.migadu.com',
	port: 587,
	secure: false,
	auth: {
		user,
		pass
	}
};

module.exports = sendMail = async mail => {
	const transporter = nodemailer.createTransport(mailserver);

	console.log('Sending email..');

	await transporter.sendMail(mail);

	console.log('Email sent!');
};
