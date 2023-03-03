/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import path from 'path';

const nodemailer = require('nodemailer');

const SendEmail = (data, subject, to) => {
	return new Promise((resolve, reject) => {
		const transporter = nodemailer.createTransport({
			host: 'smtp.gmail.com.',
			secure: false,
			port: 587,
			auth: {
				user: '',
				pass: '',
			},
			tls: {
				rejectUnauthorized: false,
			},
		});
		const mailOptions = {
			from: '',
			to,
			subject,
			html: `
			<div style="padding: 50px 100px;">
			<div style="text-align: center; margin-top:50px;">
				<img style="width: auto; height: auto;" src="cid:realestate@kreata.ee" />
			</div>
			<p
				style="text-align: left; font-weight:bold; margin-top: 50px; margin-bottom: 15px; line-height: 22px;  color: #444444;  font-family: 'Roboto',arial,sans-serif;font-size: 20px;">
				Hi,
			</p>
			<p
				style="text-align: left; margin-top: 0px; margin-bottom: 30px; line-height: 22px;  color: #444444;  font-family: 'Roboto',arial,sans-serif;font-size: 14px;">
				You recently requested register your account, so here is your password ${data}.
			</p>
		</div>
     `,
		};
		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				reject(error);
			} else {
				resolve();
			}
		});
	});
};

const emailToExec = (res, next, data, subject, to) => {
	SendEmail(data, subject, to)
		.then(sent => {
			res.status(200).json({
				message: 'Email Sent!',
			});
		})
		.catch(err => {
			res.status(500);
			console.log(err);
			next(new Error('Email Not Sent!'));
		});
};

export default { emailToExec };
