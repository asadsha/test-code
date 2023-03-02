import Model from '../Models/Model';

const addCar = (req, res, next) => {
	const { id } = req.user;
	const { categoryId, name, color, model, regNo } = req.body;
	const car = new Model.CarsModel({
		userId: id,
		categoryId,
		name,
		color,
		model,
		regNo,
	});
	car
		.save()
		.then(savedSpace => {
			res.status(200).send({
				message: 'Car Added Successfully',
				savedSpace,
			});
		})
		.catch(err => {
			res.status(500);
			next(new Error('Internal Server Error!'));
		});
};

const getCars = (req, res, next) => {
	const { category } = req.query;
	Model.CarsModel.find({ categoryId: category })
		.populate('categoryId')
		.then(cars => {
			res.status(200).send({ cars });
		})
		.catch(err => {
			res.status(500);
			next(new Error('Internal Server Error!'));
		});
};

const deleteCar = (req, res, next) => {
	const { id } = req.params;
	Model.CarsModel.findByIdAndRemove(id, (err, result) => {
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

export default { addCar, getCars, deleteCar };
