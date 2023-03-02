const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: String,
		password: String,
		email: String,
		address: String,
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('users', userSchema);
