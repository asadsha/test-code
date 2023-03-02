import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Model from '../Models/Model';

const createToken = (user, res, next) => {
	const { _id, email, username, address } = user;
	const payload = {
		id: _id,
		email,
		username,
		address,
	};
	// create a token
	jwt.sign(
		payload,
		process.env.JwtSecret,
		{
			expiresIn: '365d',
		},
		(err, token) => {
			// Error Create the Token
			if (err) {
				res.status(500);
				next(new Error('Internal Server Error!'));
			} else {
				// Token Created
				res.status(200).send({ token });
			}
		},
	);
};

const userSignIn = (req, res, next) => {
	const { email, password } = req.body;
	console.log('signin');
	// Find user with the passed email
	Model.UserModel.findOne({ email })
		.then(user => {
			if (user) {
				console.log('user found', user);
				// if email found compare the password
				bcryptjs.compare(password, user.password).then(result => {
					// if password match create payload
					if (result) {
						createToken(user, res, next);
					} else {
						// Wrong Password.
						res.status(400);
						next(new Error('Invalid Password'));
					}
				});
			} else {
				res.status(400);
				next(new Error('No User Exist With This Email'));
			}
		})
		.catch(err => {
			res.status(500);
			next(new Error('Internal Server Error!'));
		});
};

const registerUser = (req, res, next) => {
	const { username, address, email } = req.body;
	// randomly generated password
	let password = Math.random()
		.toString(36)
		.slice(2, 10);
	//password hash
	console.log(password);
	bcryptjs
		.hash(password, 12)
		.then(hashedPassword => {
			const user = new Model.UserModel({
				address,
				username,
				email,
				password: hashedPassword,
			});
			user
				.save()
				.then(savedSpace => {
					res.status(200).send({
						message: 'User Created Successfully',
						savedSpace,
					});
				})
				.catch(err => {
					res.status(500);
					next(new Error('Internal Server Error!'));
				});
		})
		.catch(err => {
			res.status(500);
			next(new Error('Internal Server Error hash!'));
		});
};

// const sendResetPasswordEmail = (req, res, next) => {
// 	const { email } = req.body;
// 	Model.UserModel.findOne({ email })
// 		.select('_id name')
// 		.then(user => {
// 			if (user) {
// 				resetPasswordEmailHandler.emailToExec(
// 					res,
// 					next,
// 					user,
// 					'Contact From Test Service',
// 					email,
// 				);
// 			} else {
// 				res.status(404);
// 				next(new Error('Email Not Exists!'));
// 			}
// 		})
// 		.catch(err => {
// 			res.status(500);
// 			next(new Error('Internal Server Error!'));
// 		});
// };

export default { userSignIn, createToken, registerUser };
