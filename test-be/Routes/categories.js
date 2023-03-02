import express from 'express';
import categoriesHandler from '../Controllers/categories';
import isLoggedInUser from '../Middlewares/loggedIn';

const categoriesRouter = express.Router();

categoriesRouter.get(
	'/',
	isLoggedInUser.isLoggedIn,
	categoriesHandler.getCategories,
);
categoriesRouter.post(
	'/',
	isLoggedInUser.isLoggedIn,
	categoriesHandler.addCategory,
);
categoriesRouter.delete(
	'/:id',
	isLoggedInUser.isLoggedIn,
	categoriesHandler.deleteCategory,
);

export default categoriesRouter;
