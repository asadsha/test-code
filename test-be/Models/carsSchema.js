import mongoose from 'mongoose';

const CarsSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users',
			required: true,
		},
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'categories',
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		model: {
			type: String,
			required: true,
		},
		regNo: {
			type: String,
			required: true,
		},
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('cars', CarsSchema);
