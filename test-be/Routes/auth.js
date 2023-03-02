import express from 'express';
import authHandler from '../Controllers/auth';
import userValidator from '../validations/user';

const authRouter = express.Router();

// routes
authRouter.post('/signin', userValidator.userSignIn, authHandler.userSignIn);
authRouter.post(
	'/register',
	userValidator.registerUser,
	authHandler.registerUser,
);

export default authRouter;
