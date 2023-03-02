import express from 'express';
import carsHandler from '../Controllers/cars';
import isLoggedInUser from '../Middlewares/loggedIn';

const carRouter = express.Router();

carRouter.get('/', isLoggedInUser.isLoggedIn, carsHandler.getCars);
carRouter.post('/', isLoggedInUser.isLoggedIn, carsHandler.addCar);
// carRouter.delete('/:id', isLoggedInUser.isLoggedIn, spaceHandler.deleteSpace);

export default carRouter;
