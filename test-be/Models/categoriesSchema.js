import mongoose from 'mongoose';

const CategoriesSchema = new mongoose.Schema(
	{
		name: String,
	},
	{
		timestamps: true,
	},
);

export default mongoose.model('categories', CategoriesSchema);
