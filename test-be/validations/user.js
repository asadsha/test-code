const userSignIn = (req, res, next) => {
	const { password, email } = req.body;
	if (!email || !password) {
		res.status(400);
		next(new Error('email, password Must be Defined in request body'));
	} else {
		next();
	}
};

const registerUser = (req, res, next) => {
	const { email, username, address } = req.body;
	if (!email || !username || !address) {
		res.status(400);
		next(
			new Error('email, username and address Must be Defined in request body'),
		);
	} else {
		next();
	}
};

export default { userSignIn, registerUser };
