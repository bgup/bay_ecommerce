import express from 'express';
import { registerUserCtrl, loginUserCtrl, getUserProfileCtrl } from '../controllers/userCtrl.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.post('/profile', getUserProfileCtrl);


export default userRoutes;