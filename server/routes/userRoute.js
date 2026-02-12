import express from 'express';

import {login,logout,register,checkLogin} from '../controllers/UserController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/check-login',authUser, checkLogin);
userRouter.get('/logout',authUser,logout);


export default userRouter