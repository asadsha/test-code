import Model from '../Models/Model';

const addCategory = (req, res, next) => {
	const { name } = req.body;
	const categ = new Model.CategoriesModel({
		name,
	});
	categ
		.save()
		.then(savedCat => {
			res.status(200).send({
				message: 'Category Added Successfully',
				savedCat,
			});
		})
		.catch(err => {
			res.status(500);
			next(new Error('Internal Server Error!'));
		});
};

const getCategories = (req, res, next) => {
	Model.CategoriesModel.find()
		.then(categories => {
			res.status(200).send({ categories });
		})
		.catch(err => {
			res.status(500);
			next(new Error('Internal Server Error!'));
		});
};

const deleteCategory = (req, res, next) => {
	const { id } = req.params;
	Model.CategoriesModel.findByIdAndRemove(id, (err, result) => {
		if (result) {
			res.status(200).send({
				message: 'Deleted Successfully.',
			});
		} else {
			res.status(500);
			next(new Error('Internal Server Error!'));
		}
	});
};

export default { addCategory, getCategories, deleteCategory };
